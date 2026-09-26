import { pool } from "../config/db.js";

export const createOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.user.id;

    const {
      items,
      paymentMethod,
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Payment method is required",
      });
    }

    const allowedPaymentMethods = [
      "upi",
      "card",
      "netbanking",
      "cod",
    ];

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    await client.query("BEGIN");

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const productId = item._id || item.id;
      const quantity = Number(item.quantity) || 1;
      const selectedSize = item.selectedSize || "";

      if (!productId) {
        throw new Error("Product ID is missing");
      }

      if (quantity <= 0) {
        throw new Error("Invalid product quantity");
      }

      const productResult = await client.query(
        `
        SELECT
          id,
          name,
          price,
          image,
          sizes
        FROM products
        WHERE id = $1
        `,
        [productId]
      );

      if (productResult.rows.length === 0) {
        throw new Error(`Product not found: ${productId}`);
      }

      const product = productResult.rows[0];

      if (
        Array.isArray(product.sizes) &&
        product.sizes.length > 0 &&
        selectedSize &&
        !product.sizes.includes(selectedSize)
      ) {
        throw new Error(
          `Selected size is not available for ${product.name}`
        );
      }

      const itemTotal = Number(product.price) * quantity;

      subtotal += itemTotal;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        price: product.price,
        quantity,
        selectedSize,
      });
    }

    const deliveryCharge = subtotal >= 999 ? 0 : 49;
    const totalAmount = subtotal + deliveryCharge;

    const orderResult = await client.query(
      `
      INSERT INTO orders (
        user_id,
        total_amount,
        delivery_charge,
        payment_method,
        status
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        user_id,
        total_amount,
        delivery_charge,
        payment_method,
        status,
        created_at
      `,
      [
        userId,
        totalAmount,
        deliveryCharge,
        paymentMethod,
        "PLACED",
      ]
    );

    const order = orderResult.rows[0];

    for (const item of orderItems) {
      await client.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          product_name,
          product_image,
          price,
          quantity,
          selected_size
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          order.id,
          item.productId,
          item.productName,
          item.productImage,
          item.price,
          item.quantity,
          item.selectedSize,
        ]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: {
        id: order.id,
        orderId: `SS${order.id}`,
        totalAmount: Number(order.total_amount),
        deliveryCharge: Number(order.delivery_charge),
        paymentMethod: order.payment_method,
        status: order.status,
        createdAt: order.created_at,
        items: orderItems,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to place order",
    });
  } finally {
    client.release();
  }
};