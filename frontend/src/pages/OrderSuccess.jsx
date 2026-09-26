import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const savedOrder = localStorage.getItem("shadestyle_order");
  const order = savedOrder ? JSON.parse(savedOrder) : null;

  if (!order) {
    return (
      <Page>
        <Card>
          <Icon>🛍️</Icon>

          <Title>No Order Found</Title>

          <Text>
            There is no recent order available.
          </Text>

          <Button onClick={() => navigate("/")}>
            CONTINUE SHOPPING
          </Button>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <Icon>✓</Icon>

        <Title>
          Order Placed Successfully!
        </Title>

        <Text>
          Thank you for shopping with ShadeStyle.
          Your order has been placed successfully.
        </Text>

        <OrderInfo>
          Order ID: {order.orderId}
        </OrderInfo>

        <Text>
          Payment Method:{" "}
          {order.paymentMethod === "cod"
            ? "Cash on Delivery"
            : order.paymentMethod}
        </Text>

        <Text>
          Total Amount: ₹
          {Number(order.totalAmount).toLocaleString("en-IN")}
        </Text>

        <Button onClick={() => navigate("/")}>
          CONTINUE SHOPPING
        </Button>
      </Card>
    </Page>
  );
};

const Page = styled.div`
  min-height: 100vh;
  background: #eaf2ec;
  color: #123f3d;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Card = styled.div`
  width: min(500px, 100%);
  padding: 3rem 2rem;
  background: #f8f5ec;
  border: 1px solid rgba(18, 63, 61, 0.1);
  text-align: center;
`;

const Icon = styled.div`
  width: 70px;
  height: 70px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: #123f3d;
  color: #f8f5ec;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const Text = styled.p`
  color: #5d7772;
  font-size: 0.9rem;
  line-height: 1.7;
`;

const OrderInfo = styled.p`
  margin: 1.5rem 0;
  font-weight: 800;
  color: #123f3d;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  border: none;
  background: #123f3d;
  color: #f8f5ec;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: #1c5753;
  }
`;

export default OrderSuccess;