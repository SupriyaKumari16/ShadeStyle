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

  const handlePayment = (event) => {
    event.preventDefault();

    if (!cart.length) {
      alert("Your cart is empty");
      navigate("/cart");
      return;
    }

    if (paymentMethod === "upi" && !upiId.trim()) {
      alert("Please enter your UPI ID");
      return;
    }

    if (
      paymentMethod === "card" &&
      (!cardNumber || !cardName || !expiry || !cvv)
    ) {
      alert("Please fill all card details");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = {
        orderId: `SS${Date.now()}`,
        amount: finalTotal,
        paymentMethod,
        items: cart,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("shadestyle_order", JSON.stringify(order));

      clearCart();
      navigate("/order-success");
    }, 1800);
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
              onChange={(event) => setUpiId(event.target.value)}
            />
          )}

          {paymentMethod === "card" && (
            <>
              <Input
                type="text"
                placeholder="Card Number"
                maxLength="16"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
              />

              <Input
                type="text"
                placeholder="Name on Card"
                value={cardName}
                onChange={(event) => setCardName(event.target.value)}
              />

              <Input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={expiry}
                onChange={(event) => setExpiry(event.target.value)}
              />

              <Input
                type="password"
                placeholder="CVV"
                maxLength="3"
                value={cvv}
                onChange={(event) => setCvv(event.target.value)}
              />
            </>
          )}

          {paymentMethod === "netbanking" && (
            <p>Selecting a bank will be available in the live gateway.</p>
          )}

          {paymentMethod === "cod" && (
            <p>Pay in cash when your order is delivered.</p>
          )}

          <PayButton type="submit" onClick={handlePayment}>
            {isProcessing
              ? "PROCESSING PAYMENT..."
              : `PAY ₹${finalTotal.toFixed(2)}`}
          </PayButton>
        </Card>

        <Card>
          <Title>Order Details</Title>

          {cart.map((item) => (
            <Row key={`${item._id || item.id}-${item.selectedSize}`}>
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
            <strong>₹{finalTotal.toFixed(2)}</strong>
          </Row>
        </Card>
      </Layout>
    </PaymentWrapper>
  );
};

export default Payment;