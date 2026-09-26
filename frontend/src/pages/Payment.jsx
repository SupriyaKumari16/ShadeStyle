import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const PaymentWrapper = styled.div`
  min-height: 100vh;
  background: #f8f5ec;
  color: #123f3d;
  padding: 3rem 6%;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #dce7df;
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(18, 63, 61, 0.06);
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

const Method = styled.button`
  width: 100%;
  text-align: left;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid
    ${(props) => (props.$selected ? "#123f3d" : "#dce7df")};
  background: ${(props) => (props.$selected ? "#eaf2ec" : "#ffffff")};
  color: #123f3d;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  margin-top: 0.7rem;
  border: 1px solid #dce7df;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;

  &:focus {
    border-color: #123f3d;
  }
`;

const PayButton = styled.button`
  width: 100%;
  border: none;
  background: #123f3d;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #1c5a56;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const Payment = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryCharge = cartTotal >= 999 ? 0 : 49;
  const finalTotal = cartTotal + deliveryCharge;

  const handlePayment = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    // Check login
    if (!token) {
      alert("Please login to place an order");
      return;
    }

    // Check cart
    if (!cart.length) {
      alert("Your cart is empty");
      navigate("/cart");
      return;
    }

    // UPI validation
    if (paymentMethod === "upi" && !upiId.trim()) {
      alert("Please enter your UPI ID");
      return;
    }

    // Card validation
    if (
      paymentMethod === "card" &&
      (!cardNumber.trim() ||
        !cardName.trim() ||
        !expiry.trim() ||
        !cvv.trim())
    ) {
      alert("Please fill all card details");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentMethod,
            items: cart,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      console.log("Order created successfully:", data);

      // Save latest order temporarily for OrderSuccess page
      localStorage.setItem(
        "shadestyle_order",
        JSON.stringify(data.order)
      );

      // Clear cart after successful order
      clearCart();

      // Go to success page
      navigate("/order-success");
    } catch (error) {
      console.error("Order creation error:", error);

      alert(
        error.message ||
          "Unable to place order. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PaymentWrapper>
      <Heading>Payment</Heading>

      <Layout>
        <Card>
          <Title>Select Payment Method</Title>

          <Method
            type="button"
            $selected={paymentMethod === "upi"}
            onClick={() => setPaymentMethod("upi")}
          >
            UPI Payment
          </Method>

          <Method
            type="button"
            $selected={paymentMethod === "card"}
            onClick={() => setPaymentMethod("card")}
          >
            Credit / Debit Card
          </Method>

          <Method
            type="button"
            $selected={paymentMethod === "netbanking"}
            onClick={() => setPaymentMethod("netbanking")}
          >
            Net Banking
          </Method>

          <Method
            type="button"
            $selected={paymentMethod === "cod"}
            onClick={() => setPaymentMethod("cod")}
          >
            Cash on Delivery
          </Method>

          {paymentMethod === "upi" && (
            <Input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(event) =>
                setUpiId(event.target.value)
              }
            />
          )}

          {paymentMethod === "card" && (
            <>
              <Input
                type="text"
                placeholder="Card Number"
                maxLength="16"
                value={cardNumber}
                onChange={(event) =>
                  setCardNumber(event.target.value)
                }
              />

              <Input
                type="text"
                placeholder="Name on Card"
                value={cardName}
                onChange={(event) =>
                  setCardName(event.target.value)
                }
              />

              <Input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={expiry}
                onChange={(event) =>
                  setExpiry(event.target.value)
                }
              />

              <Input
                type="password"
                placeholder="CVV"
                maxLength="3"
                value={cvv}
                onChange={(event) =>
                  setCvv(event.target.value)
                }
              />
            </>
          )}

          {paymentMethod === "netbanking" && (
            <p>
              Selecting a bank will be available in the
              live gateway.
            </p>
          )}

          {paymentMethod === "cod" && (
            <p>
              Pay in cash when your order is delivered.
            </p>
          )}

          <PayButton
            type="button"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing
              ? "PROCESSING PAYMENT..."
              : `PAY ₹${finalTotal.toFixed(2)}`}
          </PayButton>
        </Card>

        <Card>
          <Title>Order Details</Title>

          {cart.map((item) => (
            <Row
              key={`${item._id || item.id}-${item.selectedSize}`}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </Row>
          ))}

          <hr />

          <Row>
            <span>Subtotal</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </Row>

          <Row>
            <span>Delivery</span>

            <span>
              {deliveryCharge === 0
                ? "FREE"
                : `₹${deliveryCharge.toFixed(2)}`}
            </span>
          </Row>

          <Row>
            <strong>Total Amount</strong>

            <strong>
              ₹{finalTotal.toFixed(2)}
            </strong>
          </Row>
        </Card>
      </Layout>
    </PaymentWrapper>
  );
};

export default Payment;