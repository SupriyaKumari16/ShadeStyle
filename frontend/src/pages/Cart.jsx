import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const PAGE_BG = "#EAF2EC";
const IVORY = "#F8F5EC";
const DARK_TEAL = "#123F3D";
const MUTED_TEAL = "#55716D";
const BORDER = "rgba(18, 63, 61, 0.12)";
const ACCENT = "#D99A78";

const Page = styled.main`
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  background: ${PAGE_BG};
  color: ${DARK_TEAL};
  padding: 7rem 5vw 5rem;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-family: "Kaushan Script";
  font-size: ${(props) => props.theme.fontxxxl};
  font-weight: 400;
  margin-bottom: 2rem;
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
  }
`;

const CartCard = styled.section`
  background: ${IVORY};
  border: 1px solid ${BORDER};
  border-radius: 1rem;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.4rem;
  border-bottom: 1px solid ${BORDER};
`;

const CartItem = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 1.3rem 1.4rem;
  border-bottom: 1px solid ${BORDER};

  @media (max-width: 40em) {
    align-items: flex-start;
  }
`;

const ProductImage = styled.div`
  width: 130px;
  height: 160px;
  flex-shrink: 0;
  background: #f4f1e8;
  border-radius: 0.6rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 40em) {
    width: 95px;
    height: 120px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.h3`
  font-size: ${(props) => props.theme.fontmd};
  font-weight: 600;
  margin-bottom: 0.6rem;
`;

const ProductMeta = styled.p`
  font-size: ${(props) => props.theme.fontxs};
  color: ${MUTED_TEAL};
  margin-bottom: 0.8rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
`;

const Price = styled.span`
  font-weight: 700;
`;

const MRP = styled.span`
  color: #89918e;
  text-decoration: line-through;
  font-size: ${(props) => props.theme.fontxs};
`;

const Discount = styled.span`
  color: #218838;
  font-size: ${(props) => props.theme.fontxs};
  font-weight: 600;
`;

const DeliveryText = styled.p`
  font-size: ${(props) => props.theme.fontxs};
  color: #218838;
  margin: 0.8rem 0;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 0.8rem;
  flex-wrap: wrap;
`;

const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${BORDER};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background: ${IVORY};
  color: ${DARK_TEAL};
  cursor: pointer;
  font-size: 1.1rem;
`;

const QuantityValue = styled.span`
  width: 2rem;
  text-align: center;
  font-size: ${(props) => props.theme.fontxs};
`;

const ActionButton = styled.button`
  border: none;
  background: transparent;
  color: ${DARK_TEAL};
  font-size: ${(props) => props.theme.fontxs};
  font-weight: 600;
  cursor: pointer;
`;

const PriceDetails = styled.aside`
  background: ${IVORY};
  border: 1px solid ${BORDER};
  border-radius: 1rem;
  overflow: hidden;
  position: sticky;
  top: 6rem;

  @media (max-width: 48em) {
    position: relative;
    top: 0;
  }
`;

const PriceDetailsHeader = styled.div`
  padding: 1.2rem 1.4rem;
  border-bottom: 1px solid ${BORDER};
  font-size: ${(props) => props.theme.fontsm};
  font-weight: 600;
`;

const PriceBody = styled.div`
  padding: 1.4rem;
`;

const PriceLine = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: ${(props) => props.theme.fontsm};
`;

const TotalLine = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid ${BORDER};
  padding-top: 1.2rem;
  margin-top: 1.2rem;
  font-size: ${(props) => props.theme.fontmd};
`;

const Savings = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
  color: #218838;
  font-size: ${(props) => props.theme.fontxs};
  font-weight: 600;
`;

const PlaceOrder = styled.button`
  width: 100%;
  border: none;
  background: ${DARK_TEAL};
  color: ${IVORY};
  padding: 1rem;
  border-radius: 0.6rem;
  margin-top: 1.4rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.92;
  }
`;

const SecureText = styled.p`
  text-align: center;
  color: ${MUTED_TEAL};
  font-size: ${(props) => props.theme.fontxs};
  margin-top: 1rem;
`;

const EmptyCart = styled.div`
  background: ${IVORY};
  border: 1px solid ${BORDER};
  border-radius: 1rem;
  min-height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    margin-bottom: 0.6rem;
  }

  p {
    color: ${MUTED_TEAL};
    margin-bottom: 1.5rem;
  }
`;

const ContinueShopping = styled.button`
  border: none;
  background: ${DARK_TEAL};
  color: ${IVORY};
  padding: 0.9rem 1.5rem;
  border-radius: 0.6rem;
  font-family: inherit;
  cursor: pointer;
`;

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalMRP = cart.reduce(
    (total, item) =>
      total +
      Number(item.mrp || item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const totalDiscount = Math.max(0, totalMRP - cartTotal);
  const delivery = cartTotal >= 499 ? 0 : 40;
  const finalAmount = cartTotal + delivery;

  if (cart.length === 0) {
    return (
      <Page>
        <Container>
          <Heading>My Cart</Heading>

          <EmptyCart>
            <div className="icon">🛒</div>

            <h2>Your cart is empty</h2>

            <p>
              Add something you love to your cart and come back here.
            </p>

            <ContinueShopping
              type="button"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </ContinueShopping>
          </EmptyCart>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container>
        <Heading>My Cart</Heading>

        <CartLayout>
          <CartCard>
            <CardHeader>
              <strong>Cart Items</strong>

              <span>
                {cartCount} Item{cartCount > 1 ? "s" : ""}
              </span>
            </CardHeader>

            {cart.map((item) => {
              const productId = item._id || item.id;
              const itemMRP = Number(
                item.mrp || item.price || 0
              );
              const itemPrice = Number(item.price || 0);

              return (
                <CartItem
                  key={`${productId}-${item.selectedSize || "free"}`}
                >
                  <ProductImage>
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </ProductImage>

                  <ProductInfo>
                    <ProductName>{item.name}</ProductName>

                    <ProductMeta>
                      Size: {item.selectedSize || "Free Size"}
                      &nbsp; | &nbsp;
                      {item.color || "Colour available"}
                    </ProductMeta>

                    <PriceRow>
                      <Price>
                        ₹{itemPrice.toLocaleString("en-IN")}
                      </Price>

                      {itemMRP > itemPrice && (
                        <MRP>
                          ₹{itemMRP.toLocaleString("en-IN")}
                        </MRP>
                      )}

                      {itemMRP > itemPrice && (
                        <Discount>
                          {Math.round(
                            ((itemMRP - itemPrice) / itemMRP) * 100
                          )}
                          % off
                        </Discount>
                      )}
                    </PriceRow>

                    <DeliveryText>
                      🚚 Free delivery available
                    </DeliveryText>

                    <Actions>
                      <QuantityBox>
                        <QuantityButton
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              productId,
                              item.selectedSize || ""
                            )
                          }
                        >
                          −
                        </QuantityButton>

                        <QuantityValue>
                          {item.quantity}
                        </QuantityValue>

                        <QuantityButton
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              productId,
                              item.selectedSize || ""
                            )
                          }
                        >
                          +
                        </QuantityButton>
                      </QuantityBox>

                      <ActionButton
                        type="button"
                        onClick={() =>
                          removeFromCart(
                            productId,
                            item.selectedSize || ""
                          )
                        }
                      >
                        REMOVE
                      </ActionButton>
                    </Actions>
                  </ProductInfo>
                </CartItem>
              );
            })}
          </CartCard>

          <PriceDetails>
            <PriceDetailsHeader>
              PRICE DETAILS
            </PriceDetailsHeader>

            <PriceBody>
              <PriceLine>
                <span>Price ({cartCount} items)</span>

                <span>
                  ₹{totalMRP.toLocaleString("en-IN")}
                </span>
              </PriceLine>

              <PriceLine>
                <span>Discount</span>

                <span>
                  - ₹{totalDiscount.toLocaleString("en-IN")}
                </span>
              </PriceLine>

              <PriceLine>
                <span>Delivery Charges</span>

                <span>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </PriceLine>

              <TotalLine>
                <strong>Total Amount</strong>

                <strong>
                  ₹{finalAmount.toLocaleString("en-IN")}
                </strong>
              </TotalLine>

              <Savings>
                <span>You will save</span>

                <span>
                  ₹{totalDiscount.toLocaleString("en-IN")}
                </span>
              </Savings>

              <PlaceOrder
                type="button"
                onClick={() =>
                  alert("Checkout coming soon!")
                }
              >
                PLACE ORDER
              </PlaceOrder>

              <SecureText>
                🔒 Safe and secure payments
              </SecureText>
            </PriceBody>
          </PriceDetails>
        </CartLayout>
      </Container>
    </Page>
  );
};

export default Cart;