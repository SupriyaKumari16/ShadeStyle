import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const Payment = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryCharge = cartTotal >= 999 ? 0 : 49;
  const totalAmount = cartTotal + deliveryCharge;

  const handlePayment = (event) => {
    event.preventDefault();

    if (!cart.length) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    if (paymentMethod === "UPI" && !upiId.trim()) {
      alert("Please enter your UPI ID.");
      return;
    }

    if (
      paymentMethod === "CARD" &&
      (!cardNumber.trim() ||
        !cardName.trim() ||
        !expiry.trim() ||
        !cvv.trim())
    ) {
      alert("Please fill all card details.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = {
        orderId: `SS${Date.now()}`,
        amount: totalAmount,
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
    <Page>
      <TopBar>
        <Logo onClick={() => navigate("/")}>ShadeStyle</Logo>
        <SecureText>🔒 Secure Demo Payment</SecureText>
      </TopBar>

      <Main>
        <Heading>Complete Your Payment</Heading>

        <Layout>
          <PaymentCard>
            <CardTitle>Select Payment Method</CardTitle>

            <PaymentOption
              $selected={paymentMethod === "UPI"}
              onClick={() => setPaymentMethod("UPI")}
            >
              <Radio
                type="radio"
                checked={paymentMethod === "UPI"}
                onChange={() => setPaymentMethod("UPI")}
              />
              <PaymentContent>
                <PaymentTitle>UPI Payment</PaymentTitle>
                <PaymentDescription>
                  Pay using Google Pay, PhonePe or Paytm
                </PaymentDescription>
              </PaymentContent>
            </PaymentOption>

            <PaymentOption
              $selected={paymentMethod === "CARD"}
              onClick={() => setPaymentMethod("CARD")}
            >
              <Radio
                type="radio"
                checked={paymentMethod === "CARD"}
                onChange={() => setPaymentMethod("CARD")}
              />
              <PaymentContent>
                <PaymentTitle>Credit / Debit Card</PaymentTitle>
                <PaymentDescription>
                  Visa, Mastercard, RuPay and more
                </PaymentDescription>
              </PaymentContent>
            </PaymentOption>

            <PaymentOption
              $selected={paymentMethod === "NETBANKING"}
              onClick={() => setPaymentMethod("NETBANKING")}
            >
              <Radio
                type="radio"
                checked={paymentMethod === "NETBANKING"}
                onChange={() => setPaymentMethod("NETBANKING")}
              />
              <PaymentContent>
                <PaymentTitle>Net Banking</PaymentTitle>
                <PaymentDescription>
                  Pay securely through your bank
                </PaymentDescription>
              </PaymentContent>
            </PaymentOption>

            <PaymentOption
              $selected={paymentMethod === "COD"}
              onClick={() => setPaymentMethod("COD")}
            >
              <Radio
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <PaymentContent>
                <PaymentTitle>Cash on Delivery</PaymentTitle>
                <PaymentDescription>
                  Pay when your order is delivered
                </PaymentDescription>
              </PaymentContent>
            </PaymentOption>

            {paymentMethod === "UPI" && (
              <Input
                type="text"
                placeholder="Enter UPI ID"
                value={upiId}
                onChange={(event) => setUpiId(event.target.value)}
              />
            )}

            {paymentMethod === "CARD" && (
              <CardFields>
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
              </CardFields>
            )}

            {paymentMethod === "NETBANKING" && (
              <InfoText>
                Net banking demo payment will be processed securely.
              </InfoText>
            )}

            {paymentMethod === "COD" && (
              <InfoText>
                You will pay in cash when your order is delivered.
              </InfoText>
            )}

            <PayButton
              type="button"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing
                ? "PROCESSING PAYMENT..."
                : `PAY ₹${totalAmount.toLocaleString("en-IN")}`}
            </PayButton>
          </PaymentCard>

          <SummaryCard>
            <CardTitle>Order Summary</CardTitle>

            {cart.map((item) => (
              <SummaryRow
                key={`${item._id || item.id}-${item.selectedSize}`}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹
                  {(
                    Number(item.price || 0) * Number(item.quantity || 0)
                  ).toLocaleString("en-IN")}
                </span>
              </SummaryRow>
            ))}

            <Divider />

            <SummaryRow>
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString("en-IN")}</span>
            </SummaryRow>

            <SummaryRow>
              <span>Delivery Charges</span>
              <span>
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge.toLocaleString("en-IN")}`}
              </span>
            </SummaryRow>

            <Divider />

            <TotalRow>
              <span>Total Amount</span>
              <span>₹{totalAmount.toLocaleString("en-IN")}</span>
            </TotalRow>

            <DemoNote>
              This is a demo payment gateway. No real money will be deducted.
            </DemoNote>
          </SummaryCard>
        </Layout>
      </Main>
    </Page>
  );
};

const Page = styled.div`
  min-height: 100vh;
  background: #eaf2ec;
  color: #123f3d;
`;

const TopBar = styled.header`
  height: 76px;
  padding: 0 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f5ec;
  border-bottom: 1px solid rgba(18, 63, 61, 0.12);

  @media (max-width: 600px) {
    padding: 0 5%;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 1.35rem;
  }
`;

const SecureText = styled.div`
  color: #5d7772;
  font-size: 0.85rem;
  font-weight: 700;
`;

const Main = styled.main`
  width: min(1100px, 92%);
  margin: 2.5rem auto;
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 370px;
  gap: 1.2rem;
  align-items: start;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentCard = styled.div`
  background: #f8f5ec;
  border: 1px solid rgba(18, 63, 61, 0.1);
  padding: 1.5rem;
`;

const SummaryCard = styled.div`
  background: #f8f5ec;
  border: 1px solid rgba(18, 63, 61, 0.1);
  padding: 1.5rem;
`;

const CardTitle = styled.h2`
  margin: 0 0 1.2rem;
  font-size: 1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  padding: 1rem;
  margin-bottom: 0.7rem;
  border: 1px solid
    ${(props) => (props.$selected ? "#123f3d" : "#d0d8d3")};
  background: ${(props) => (props.$selected ? "#eaf2ec" : "#fffdf8")};
  cursor: pointer;
`;

const Radio = styled.input`
  margin-top: 0.2rem;
  accent-color: #123f3d;
`;

const PaymentContent = styled.div`
  flex: 1;
`;

const PaymentTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 800;
`;

const PaymentDescription = styled.div`
  margin-top: 0.25rem;
  color: #6b7873;
  font-size: 0.75rem;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.9rem;
  margin-top: 0.8rem;
  border: 1px solid #c8d2cd;
  background: #fffdf8;
  color: #123f3d;
  outline: none;
  font-size: 0.9rem;

  &:focus {
    border-color: #123f3d;
  }
`;

const CardFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;

  ${Input}:first-child,
  ${Input}:nth-child(2) {
    grid-column: span 2;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;

    ${Input} {
      grid-column: span 1 !important;
    }
  }
`;

const InfoText = styled.p`
  padding: 0.9rem;
  background: #eaf2ec;
  color: #5d7772;
  font-size: 0.8rem;
  line-height: 1.5;
`;

const PayButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem;
  border: none;
  background: #123f3d;
  color: #f8f5ec;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  cursor: pointer;

  &:hover {
    background: #1c5753;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #506762;
  font-size: 0.82rem;

  span:last-child {
    color: #123f3d;
    font-weight: 700;
    text-align: right;
  }
`;

const Divider = styled.div`
  height: 1px;
  margin: 1rem 0;
  background: rgba(18, 63, 61, 0.15);
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 800;
`;

const DemoNote = styled.div`
  margin-top: 1.5rem;
  padding: 0.8rem;
  background: #e0f1e7;
  color: #247349;
  font-size: 0.75rem;
  line-height: 1.5;
`;

export default Payment;