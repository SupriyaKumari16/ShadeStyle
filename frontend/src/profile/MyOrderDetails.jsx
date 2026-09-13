import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";


/* =====================================================
   ORDER DATA
===================================================== */

const orders = [
  {
    id: "SS10245",
    product: "Elegant Floral Kurti",
    category: "Women",
    color: "Green",
    size: "M",
    price: 899,
    quantity: 1,
    date: "Sep 10",
    status: "Delivered",
    seller: "ShadeStyle",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
    confirmedDate: "Sep 07",
    deliveredDate: "Sep 10",
    returnDate: "Sep 17",
  },

  {
    id: "SS10231",
    product: "Classic Ethnic Saree",
    category: "Women",
    color: "Maroon",
    size: "Free Size",
    price: 1299,
    quantity: 1,
    date: "Sep 05",
    status: "On the way",
    seller: "ShadeStyle",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
    confirmedDate: "Sep 03",
    deliveryDate: "Sep 05",
    returnDate: "Sep 12",
  },

  {
    id: "SS10198",
    product: "Minimal Gold Necklace",
    category: "Jewellery",
    color: "Gold",
    size: "One Size",
    price: 699,
    quantity: 1,
    date: "Aug 28",
    status: "Delivered",
    seller: "ShadeStyle",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
    confirmedDate: "Aug 26",
    deliveredDate: "Aug 28",
    returnDate: "Sep 04",
  },

  {
    id: "SS10172",
    product: "Printed Summer Dress",
    category: "Women",
    color: "Blue",
    size: "L",
    price: 1099,
    quantity: 1,
    date: "Aug 20",
    status: "Cancelled",
    seller: "ShadeStyle",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
    confirmedDate: "Aug 18",
    cancelledDate: "Aug 20",
  },
];


const MyOrderDetails = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const location = useLocation();

  const [deliveryOpen, setDeliveryOpen] =
    useState(true);

  const [priceOpen, setPriceOpen] =
    useState(true);


  /* =====================================================
     GET ORDER
  ===================================================== */

  const order =
    location.state?.order ||
    orders.find(
      (item) => item.id === id
    ) ||
    orders[0];


  const isDelivered =
    order.status === "Delivered";

  const isCancelled =
    order.status === "Cancelled";


  /* =====================================================
     PRICE CALCULATION
  ===================================================== */

  const listingPrice =
    Math.round(order.price * 1.25);

  const specialPrice = order.price;

  const fees = 0;

  const totalAmount =
    specialPrice + fees;


  return (
    <Page>

      <Main>


        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <Breadcrumb>

          <BreadcrumbItem
            onClick={() => navigate("/")}
          >
            Home
          </BreadcrumbItem>

          <Arrow>›</Arrow>

          <BreadcrumbItem
            onClick={() =>
              navigate("/account")
            }
          >
            My Account
          </BreadcrumbItem>

          <Arrow>›</Arrow>

          <BreadcrumbItem
            onClick={() =>
              navigate("/orders")
            }
          >
            My Orders
          </BreadcrumbItem>

          <Arrow>›</Arrow>

          <Current>
            {order.id}
          </Current>

        </Breadcrumb>


        {/* =================================================
            MAIN GRID
        ================================================= */}

        <MainGrid>


          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <LeftColumn>


            {/* =================================================
                PRODUCT + STATUS CARD
            ================================================= */}

            <ProductCard>


              {/* PRODUCT HEADER */}

              <ProductHeader>

                <ProductInformation>

                  <ProductName>
                    {order.product}
                  </ProductName>

                  <ProductColor>
                    {order.color}
                  </ProductColor>

                  <Seller>
                    Seller: {order.seller}
                  </Seller>

                  <ProductPrice>
                    ₹{order.price.toLocaleString("en-IN")}
                  </ProductPrice>

                </ProductInformation>


                <ProductImageWrapper>

                  <ProductImage
                    src={order.image}
                    alt={order.product}
                  />

                </ProductImageWrapper>

              </ProductHeader>


              {/* =================================================
                  ORDER TIMELINE
              ================================================= */}

              <TimelineSection>

                <TimelineItem
                  $active={!isCancelled}
                >

                  <TimelineDot
                    $active={!isCancelled}
                  >
                    ✓
                  </TimelineDot>

                  <TimelineContent>

                    <TimelineTitle>
                      Order Confirmed
                    </TimelineTitle>

                    <TimelineDate>
                      {order.confirmedDate}
                    </TimelineDate>

                  </TimelineContent>

                </TimelineItem>


                {!isCancelled && (
                  <TimelineLine />
                )}


                {isDelivered && (

                  <TimelineItem $active>

                    <TimelineDot $active>
                      ✓
                    </TimelineDot>

                    <TimelineContent>

                      <TimelineTitle>
                        Delivered
                      </TimelineTitle>

                      <TimelineDate>
                        {order.deliveredDate}
                      </TimelineDate>

                    </TimelineContent>

                  </TimelineItem>

                )}


                {order.status === "On the way" && (

                  <TimelineItem>

                    <TimelineDot>
                      •
                    </TimelineDot>

                    <TimelineContent>

                      <TimelineTitle>
                        On the way
                      </TimelineTitle>

                      <TimelineDate>
                        Expected soon
                      </TimelineDate>

                    </TimelineContent>

                  </TimelineItem>

                )}


                {isCancelled && (

                  <TimelineItem $cancelled>

                    <TimelineDot $cancelled>
                      ✕
                    </TimelineDot>

                    <TimelineContent>

                      <TimelineTitle>
                        Order Cancelled
                      </TimelineTitle>

                      <TimelineDate>
                        {order.cancelledDate}
                      </TimelineDate>

                    </TimelineContent>

                  </TimelineItem>

                )}

              </TimelineSection>


              {/* SEE ALL UPDATES */}

              <UpdatesButton
                whileHover={{
                  x: 4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  navigate(`/orders/${order.id}/updates`)
                }
              >
                See All Updates
                <span>›</span>
              </UpdatesButton>


              {/* RETURN POLICY */}

              {!isCancelled && (
                <ReturnPolicy>
                  Return policy ends on{" "}
                  <strong>
                    {order.returnDate}
                  </strong>
                </ReturnPolicy>
              )}


              {/* CHAT */}

              <ChatSection>

                <ChatButton
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  <ChatIcon>
                    ◯
                  </ChatIcon>

                  Chat with us
                </ChatButton>

              </ChatSection>

            </ProductCard>


            {/* =================================================
                RATE EXPERIENCE
            ================================================= */}

            {isDelivered && (

              <ReviewCard>

                <ReviewTitle>
                  Rate your experience
                </ReviewTitle>


                <ReviewBox>

                  <ReviewHeader>

                    <ReviewIcon>
                      ♧
                    </ReviewIcon>

                    <ReviewText>
                      Write a product review
                    </ReviewText>

                  </ReviewHeader>


                  <ReviewBottom>

                    <RatingText>
                      Terrible
                    </RatingText>

                    <Stars>

                      <Star $active>
                        ★
                      </Star>

                      <Star>★</Star>

                      <Star>★</Star>

                      <Star>★</Star>

                      <Star>★</Star>

                    </Stars>


                    <WriteReview
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() =>
                        navigate(`/orders/${order.id}/review`)
                      }
                    >
                      ✎ Write review
                    </WriteReview>

                  </ReviewBottom>

                </ReviewBox>

              </ReviewCard>

            )}


            {/* =================================================
                ORDER ID
            ================================================= */}

            <OrderIdBox>

              Order #{order.id}

              <CopyButton>
                ▣
              </CopyButton>

            </OrderIdBox>

          </LeftColumn>


          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <RightColumn>


            {/* =================================================
                DELIVERY DETAILS
            ================================================= */}

            <InfoCard>

              <InfoHeader
                onClick={() =>
                  setDeliveryOpen(
                    !deliveryOpen
                  )
                }
              >

                <div>

                  <InfoTitle>
                    Delivery details
                  </InfoTitle>

                  <InfoSubtitle>
                    {isDelivered
                      ? "Delivered to you"
                      : order.status ===
                        "On the way"
                      ? "Delivery in progress"
                      : "Order cancelled"}
                  </InfoSubtitle>

                </div>

                <Toggle>
                  {deliveryOpen
                    ? "⌃"
                    : "⌄"}
                </Toggle>

              </InfoHeader>


              {deliveryOpen && (
                <DeliveryContent>

                  <DeliveryRow>

                    <DeliveryIcon>
                      ⌂
                    </DeliveryIcon>

                    <DeliveryText>
                      <strong>
                        Delivery Address
                      </strong>

                      <span>
                        ShadeStyle Customer,
                        India
                      </span>
                    </DeliveryText>

                  </DeliveryRow>


                  <DeliveryRow>

                    <DeliveryIcon>
                      ♙
                    </DeliveryIcon>

                    <DeliveryText>
                      <strong>
                        Customer
                      </strong>

                      <span>
                        Your saved account details
                      </span>
                    </DeliveryText>

                  </DeliveryRow>

                </DeliveryContent>
              )}

            </InfoCard>


            {/* =================================================
                PRICE DETAILS
            ================================================= */}

            <InfoCard>

              <InfoHeader
                onClick={() =>
                  setPriceOpen(
                    !priceOpen
                  )
                }
              >

                <div>

                  <InfoTitle>
                    Price details
                  </InfoTitle>

                  <InfoSubtitle>
                    Paid by your selected payment method
                  </InfoSubtitle>

                </div>

                <Toggle>
                  {priceOpen
                    ? "⌃"
                    : "⌄"}
                </Toggle>

              </InfoHeader>


              {priceOpen && (

                <PriceContent>

                  <PriceRow>

                    <span>
                      Listing price
                    </span>

                    <span>
                      ₹
                      {listingPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </PriceRow>


                  <PriceRow>

                    <span>
                      Special price
                    </span>

                    <span>
                      ₹
                      {specialPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </PriceRow>


                  <PriceRow>

                    <span>
                      Total fees
                    </span>

                    <span>
                      ₹{fees}
                    </span>

                  </PriceRow>


                  <Divider />


                  <TotalRow>

                    <strong>
                      Total amount
                    </strong>

                    <strong>
                      ₹
                      {totalAmount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </TotalRow>


                  <PaidBox>

                    <span>
                      Paid By
                    </span>

                    <strong>
                      Cash on Delivery
                    </strong>

                  </PaidBox>


                  <InvoiceButton
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    ⇩ Download Invoice
                  </InvoiceButton>

                </PriceContent>

              )}

            </InfoCard>

          </RightColumn>

        </MainGrid>

      </Main>

    </Page>
  );
};

export default MyOrderDetails;


/* =====================================================
   PAGE
===================================================== */

const Page = styled.div`
  min-height: 100vh;

  width: 100%;

  background: #f1f5f2;

  color: #123333;

  overflow-x: hidden;
`;


/* =====================================================
   MAIN
===================================================== */

const Main = styled.main`
  width: 100%;

  max-width: 1250px;

  margin: 0 auto;

  padding: 30px 25px 70px;

  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 20px 15px 50px;
  }
`;


/* =====================================================
   BREADCRUMB
===================================================== */

const Breadcrumb = styled.div`
  display: flex;

  align-items: center;

  gap: 9px;

  margin-bottom: 18px;

  font-size: 12px;

  color: #123333;

  opacity: 0.65;

  flex-wrap: wrap;
`;

const BreadcrumbItem = styled.span`
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Arrow = styled.span`
  font-size: 17px;

  opacity: 0.5;
`;

const Current = styled.span`
  opacity: 0.55;
`;


/* =====================================================
   MAIN GRID
===================================================== */

const MainGrid = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    350px;

  gap: 25px;

  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;


const LeftColumn = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 10px;
`;

const RightColumn = styled.div`
  display: flex;

  flex-direction: column;

  gap: 15px;

  position: sticky;

  top: 20px;

  @media (max-width: 900px) {
    position: static;
  }
`;


/* =====================================================
   PRODUCT CARD
===================================================== */

const ProductCard = styled.div`
  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.09);

  box-shadow:
    0 3px 12px rgba(18, 51, 51, 0.06);
`;


/* =====================================================
   PRODUCT HEADER
===================================================== */

const ProductHeader = styled.div`
  min-height: 170px;

  padding: 25px;

  box-sizing: border-box;

  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: 25px;

  border-bottom: 1px solid
    rgba(18, 51, 51, 0.08);

  @media (max-width: 600px) {
    padding: 20px;

    min-height: 145px;

    gap: 15px;
  }
`;


const ProductInformation = styled.div`
  flex: 1;

  min-width: 0;
`;

const ProductName = styled.h1`
  margin: 0 0 10px;

  color: #123333;

  font-size: 20px;

  font-weight: 500;

  line-height: 1.4;

  @media (max-width: 600px) {
    font-size: 17px;
  }
`;

const ProductColor = styled.p`
  margin: 0 0 9px;

  color: #123333;

  opacity: 0.6;

  font-size: 13px;
`;

const Seller = styled.p`
  margin: 0 0 10px;

  color: #123333;

  opacity: 0.6;

  font-size: 13px;
`;

const ProductPrice = styled.div`
  color: #123333;

  font-size: 19px;

  font-weight: 700;
`;


/* =====================================================
   PRODUCT IMAGE
===================================================== */

const ProductImageWrapper = styled.div`
  width: 100px;

  height: 100px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;

  background: #f1f5f2;

  border-radius: 4px;

  @media (max-width: 600px) {
    width: 75px;

    height: 85px;
  }
`;

const ProductImage = styled.img`
  width: 100%;

  height: 100%;

  object-fit: cover;
`;


/* =====================================================
   TIMELINE
===================================================== */

const TimelineSection = styled.div`
  padding: 25px;

  @media (max-width: 600px) {
    padding: 22px 20px;
  }
`;

const TimelineItem = styled.div`
  display: flex;

  align-items: center;

  gap: 17px;
`;

const TimelineDot = styled.div`
  width: 20px;

  height: 20px;

  flex-shrink: 0;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background: ${({ $active, $cancelled }) => {
    if ($cancelled) return "#e45c5c";

    return $active
      ? "#159447"
      : "#d2e0dc";
  }};

  color: #ffffff;

  font-size: 12px;

  font-weight: 700;
`;

const TimelineLine = styled.div`
  width: 2px;

  height: 28px;

  background: #159447;

  margin-left: 9px;

  margin-top: 2px;

  margin-bottom: 2px;
`;

const TimelineContent = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  flex-wrap: wrap;
`;

const TimelineTitle = styled.span`
  color: #123333;

  font-size: 14px;

  font-weight: 500;
`;

const TimelineDate = styled.span`
  color: #123333;

  opacity: 0.55;

  font-size: 13px;
`;


/* =====================================================
   UPDATES
===================================================== */

const UpdatesButton = styled(motion.button)`
  border: none;

  background: transparent;

  color: #123333;

  font-size: 14px;

  font-weight: 700;

  cursor: pointer;

  padding: 0 25px 25px;

  display: flex;

  align-items: center;

  gap: 9px;

  text-align: left;

  span {
    font-size: 23px;

    line-height: 1;
  }
`;


/* =====================================================
   RETURN
===================================================== */

const ReturnPolicy = styled.div`
  padding: 20px 25px;

  border-top: 1px solid
    rgba(18, 51, 51, 0.08);

  color: #123333;

  opacity: 0.6;

  font-size: 13px;

  strong {
    font-weight: 600;
  }
`;


/* =====================================================
   CHAT
===================================================== */

const ChatSection = styled.div`
  border-top: 1px solid
    rgba(18, 51, 51, 0.08);

  display: flex;

  justify-content: center;

  padding: 18px;
`;

const ChatButton = styled(motion.button)`
  border: none;

  background: transparent;

  color: #123333;

  font-size: 14px;

  font-weight: 700;

  cursor: pointer;

  display: flex;

  align-items: center;

  gap: 9px;
`;

const ChatIcon = styled.span`
  font-size: 19px;
`;


/* =====================================================
   REVIEW
===================================================== */

const ReviewCard = styled.div`
  background: #ffffff;

  padding: 23px 18px;

  border: 1px solid
    rgba(18, 51, 51, 0.09);

  box-shadow:
    0 3px 12px rgba(18, 51, 51, 0.06);
`;

const ReviewTitle = styled.h2`
  margin: 0 0 18px;

  color: #123333;

  font-size: 18px;

  font-weight: 600;
`;

const ReviewBox = styled.div`
  background: #f8faf8;

  border-radius: 15px;

  padding: 13px;

  border: 1px solid
    rgba(18, 51, 51, 0.05);
`;

const ReviewHeader = styled.div`
  display: flex;

  align-items: center;

  gap: 13px;

  margin-bottom: 14px;
`;

const ReviewIcon = styled.span`
  color: #123333;

  font-size: 19px;
`;

const ReviewText = styled.span`
  color: #123333;

  font-size: 14px;
`;

const ReviewBottom = styled.div`
  min-height: 60px;

  padding: 10px;

  box-sizing: border-box;

  background: #ffffff;

  border-radius: 9px;

  display: flex;

  align-items: center;

  gap: 9px;

  @media (max-width: 550px) {
    flex-wrap: wrap;
  }
`;

const RatingText = styled.strong`
  color: #123333;

  font-size: 12px;
`;

const Stars = styled.div`
  display: flex;

  gap: 3px;
`;

const Star = styled.span`
  color: ${({ $active }) =>
    $active ? "#159447" : "#d9dddd"};

  font-size: 18px;
`;

const WriteReview = styled(motion.button)`
  margin-left: auto;

  padding: 9px 17px;

  border: 1px solid #123333;

  border-radius: 9px;

  background: #ffffff;

  color: #123333;

  font-size: 12px;

  font-weight: 600;

  cursor: pointer;

  @media (max-width: 550px) {
    margin-left: 0;
  }
`;


/* =====================================================
   ORDER ID
===================================================== */

const OrderIdBox = styled.div`
  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.09);

  padding: 18px;

  color: #123333;

  opacity: 0.65;

  font-size: 12px;
`;

const CopyButton = styled.button`
  border: none;

  background: transparent;

  color: #123333;

  cursor: pointer;

  margin-left: 5px;
`;


/* =====================================================
   RIGHT INFO CARDS
===================================================== */

const InfoCard = styled.div`
  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.09);

  box-shadow:
    0 3px 12px rgba(18, 51, 51, 0.06);
`;

const InfoHeader = styled.div`
  min-height: 82px;

  padding: 20px;

  box-sizing: border-box;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  cursor: pointer;
`;

const InfoTitle = styled.h3`
  margin: 0 0 5px;

  color: #123333;

  font-family: Georgia, serif;

  font-size: 18px;

  font-weight: 700;
`;

const InfoSubtitle = styled.p`
  margin: 0;

  color: #123333;

  opacity: 0.6;

  font-size: 13px;

  line-height: 1.4;
`;

const Toggle = styled.div`
  width: 35px;

  height: 35px;

  flex-shrink: 0;

  border-radius: 9px;

  background: #f1f3f1;

  display: flex;

  align-items: center;

  justify-content: center;

  color: #123333;

  font-size: 18px;
`;


/* =====================================================
   DELIVERY
===================================================== */

const DeliveryContent = styled.div`
  padding: 0 20px 20px;

  border-top: 1px solid
    rgba(18, 51, 51, 0.07);
`;

const DeliveryRow = styled.div`
  display: flex;

  gap: 13px;

  padding: 15px 0;

  border-bottom: 1px solid
    rgba(18, 51, 51, 0.06);

  &:last-child {
    border-bottom: none;
  }
`;

const DeliveryIcon = styled.div`
  width: 25px;

  flex-shrink: 0;

  color: #123333;

  font-size: 18px;
`;

const DeliveryText = styled.div`
  display: flex;

  flex-direction: column;

  gap: 5px;

  min-width: 0;

  strong {
    color: #123333;

    font-size: 13px;
  }

  span {
    color: #123333;

    opacity: 0.65;

    font-size: 12px;

    line-height: 1.4;
  }
`;


/* =====================================================
   PRICE
===================================================== */

const PriceContent = styled.div`
  padding: 0 20px 20px;

  border-top: 1px solid
    rgba(18, 51, 51, 0.07);
`;

const PriceRow = styled.div`
  display: flex;

  justify-content: space-between;

  gap: 20px;

  padding: 10px 0;

  color: #123333;

  font-size: 13px;

  span:last-child {
    font-weight: 500;
  }
`;

const Divider = styled.div`
  border-top: 1px dashed
    rgba(18, 51, 51, 0.25);

  margin: 10px 0;
`;

const TotalRow = styled.div`
  display: flex;

  justify-content: space-between;

  gap: 15px;

  padding: 8px 0 15px;

  color: #123333;

  font-size: 14px;
`;

const PaidBox = styled.div`
  padding: 13px;

  border: 1px solid
    rgba(18, 51, 51, 0.08);

  border-radius: 10px;

  display: flex;

  justify-content: space-between;

  gap: 15px;

  color: #123333;

  font-size: 12px;

  margin-bottom: 12px;

  span {
    opacity: 0.7;
  }

  strong {
    text-align: right;
  }
`;

const InvoiceButton = styled(motion.button)`
  width: 100%;

  height: 48px;

  border: 1px solid
    rgba(18, 51, 51, 0.12);

  border-radius: 11px;

  background: #ffffff;

  color: #123333;

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;
`;