import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";


/* =====================================================
   DEMO ORDER DATA
===================================================== */

const orders = [
  {
    id: "SS10245",
    product: "Elegant Floral Kurti",
    color: "Green",
    size: "M",
    price: 899,
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300",
  },

  {
    id: "SS10231",
    product: "Classic Ethnic Saree",
    color: "Maroon",
    size: "Free Size",
    price: 1299,
    status: "On the way",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300",
  },

  {
    id: "SS10198",
    product: "Minimal Gold Necklace",
    color: "Gold",
    size: "One Size",
    price: 699,
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300",
  },

  {
    id: "SS10172",
    product: "Printed Summer Dress",
    color: "Blue",
    size: "L",
    price: 1099,
    status: "Cancelled",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300",
  },
];


const OrderUpdates = () => {

  const navigate = useNavigate();

  const { id } = useParams();


  const order =
    orders.find(
      (item) => item.id === id
    ) || orders[0];


  const isCancelled =
    order.status === "Cancelled";


  /* =====================================================
     TIMELINE DATA
  ===================================================== */

  const updates = isCancelled
    ? [
        {
          title: "Order Confirmed",
          date: "Wed, 20th Aug '26",
          time: "8:32 AM",
          description:
            "Your order has been placed.",
        },
        {
          title: "Order Cancelled",
          date: "Wed, 20th Aug '26",
          time: "10:15 AM",
          description:
            "Your order was cancelled as requested.",
        },
      ]
    : [
        {
          title: "Order Confirmed",
          date: "Tue, 4th Aug '26",
          time: "8:32 AM",
          description:
            "Your order has been placed.",
          extra:
            "Seller has processed your order.",
        },

        {
          title: "Shipped",
          date: "Tue, 4th Aug '26",
          time: "9:40 AM",
          description:
            "Your item has been shipped.",
          extra:
            "Ekart Logistics - FMP C6362843309",
        },

        {
          title: "Out For Delivery",
          date: "Fri, 7th Aug '26",
          time: "9:13 AM",
          description:
            "Your item is out for delivery.",
        },

        {
          title: "Delivered",
          date: "Fri, 7th Aug '26",
          time: "7:26 PM",
          description:
            "Your item has been delivered.",
        },
      ];


  return (
    <Page>

      <Main>

        {/* =================================================
            TOP
        ================================================= */}

        <TopBar>

          <BackButton
            onClick={() =>
              navigate(
                `/orders/${order.id}`
              )
            }
          >
            ← Back to Order Details
          </BackButton>

          <CloseButton
            onClick={() =>
              navigate(
                `/orders/${order.id}`
              )
            }
            whileHover={{
              rotate: 90,
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
          >
            ✕
          </CloseButton>

        </TopBar>


        {/* =================================================
            HEADER
        ================================================= */}

        <Header>

          <div>

            <PageTitle>
              Order Updates
            </PageTitle>

            <PageSubtitle>
              Order ID: {order.id}
            </PageSubtitle>

          </div>


          <ProductMini>

            <MiniImage
              src={order.image}
              alt={order.product}
            />

            <div>

              <MiniProductName>
                {order.product}
              </MiniProductName>

              <MiniProductMeta>
                {order.color} • {order.size}
              </MiniProductMeta>

            </div>

          </ProductMini>

        </Header>


        {/* =================================================
            TIMELINE
        ================================================= */}

        <TimelineCard>

          <Timeline>

            {updates.map(
              (update, index) => {

                const last =
                  index ===
                  updates.length - 1;

                return (
                  <TimelineItem
                    key={update.title}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        index * 0.12,
                    }}
                  >

                    <TimelineLeft>

                      <TimelineDot
                        $cancelled={
                          update.title ===
                          "Order Cancelled"
                        }
                      >
                        {update.title ===
                        "Order Cancelled"
                          ? "×"
                          : "✓"}
                      </TimelineDot>

                      {!last && (
                        <TimelineLine
                          $cancelled={
                            update.title ===
                            "Order Cancelled"
                          }
                        />
                      )}

                    </TimelineLeft>


                    <TimelineContent>

                      <UpdateHeading>

                        <UpdateTitle
                          $cancelled={
                            update.title ===
                            "Order Cancelled"
                          }
                        >
                          {update.title}
                        </UpdateTitle>

                        <UpdateDate>
                          {update.date}
                        </UpdateDate>

                      </UpdateHeading>


                      <UpdateDescription>
                        {update.description}
                      </UpdateDescription>


                      <UpdateTime>
                        {update.date} -{" "}
                        {update.time}
                      </UpdateTime>


                      {update.extra && (
                        <ExtraInfo>
                          {update.extra}
                        </ExtraInfo>
                      )}

                    </TimelineContent>

                  </TimelineItem>
                );
              }
            )}

          </Timeline>

        </TimelineCard>


        {/* =================================================
            PRODUCT SUMMARY
        ================================================= */}

        <SummaryCard>

          <SummaryTitle>
            Order Summary
          </SummaryTitle>

          <SummaryContent>

            <SummaryImage
              src={order.image}
              alt={order.product}
            />

            <SummaryInfo>

              <SummaryProduct>
                {order.product}
              </SummaryProduct>

              <SummaryMeta>
                Color: {order.color}
              </SummaryMeta>

              <SummaryMeta>
                Size: {order.size}
              </SummaryMeta>

              <SummaryPrice>
                ₹{order.price}
              </SummaryPrice>

            </SummaryInfo>

          </SummaryContent>

        </SummaryCard>


      </Main>

    </Page>
  );
};


export default OrderUpdates;


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


const Main = styled.main`
  width: 100%;

  max-width: 1000px;

  margin: 0 auto;

  padding: 30px 25px 70px;

  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 20px 15px 50px;
  }
`;


/* =====================================================
   TOP
===================================================== */

const TopBar = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 25px;
`;


const BackButton = styled.button`
  border: none;

  background: transparent;

  color: #123333;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  padding: 8px 0;
`;


const CloseButton = styled(motion.button)`
  width: 42px;

  height: 42px;

  border: none;

  border-radius: 50%;

  background: #123333;

  color: #e8e1d5;

  font-size: 18px;

  cursor: pointer;
`;


/* =====================================================
   HEADER
===================================================== */

const Header = styled.div`
  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.09);

  padding: 25px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  margin-bottom: 15px;

  @media (max-width: 600px) {
    flex-direction: column;

    align-items: flex-start;
  }
`;


const PageTitle = styled.h1`
  margin: 0;

  color: #123333;

  font-size: 27px;

  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 23px;
  }
`;


const PageSubtitle = styled.p`
  margin: 7px 0 0;

  color: #123333;

  opacity: 0.55;

  font-size: 13px;
`;


const ProductMini = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  max-width: 320px;
`;


const MiniImage = styled.img`
  width: 58px;

  height: 58px;

  object-fit: cover;

  border-radius: 4px;

  background: #d2e0dc;
`;


const MiniProductName = styled.div`
  color: #123333;

  font-size: 13px;

  font-weight: 600;

  line-height: 1.4;
`;


const MiniProductMeta = styled.div`
  margin-top: 4px;

  color: #123333;

  opacity: 0.55;

  font-size: 11px;
`;


/* =====================================================
   TIMELINE CARD
===================================================== */

const TimelineCard = styled.div`
  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.09);

  padding: 30px 35px;

  @media (max-width: 600px) {
    padding: 25px 20px;
  }
`;


const Timeline = styled.div`
  width: 100%;
`;


const TimelineItem = styled(motion.div)`
  display: flex;

  gap: 18px;
`;


const TimelineLeft = styled.div`
  width: 22px;

  flex-shrink: 0;

  display: flex;

  flex-direction: column;

  align-items: center;
`;


const TimelineDot = styled.div`
  width: 20px;

  height: 20px;

  flex-shrink: 0;

  border-radius: 50%;

  background: ${({ $cancelled }) =>
    $cancelled
      ? "#dc5555"
      : "#159447"};

  color: #ffffff;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 12px;

  font-weight: 700;

  z-index: 2;
`;


const TimelineLine = styled.div`
  width: 2px;

  flex: 1;

  min-height: 55px;

  background: ${({ $cancelled }) =>
    $cancelled
      ? "#dc5555"
      : "#159447"};
`;


const TimelineContent = styled.div`
  padding-bottom: 35px;

  flex: 1;

  min-width: 0;
`;


const UpdateHeading = styled.div`
  display: flex;

  align-items: baseline;

  gap: 8px;

  flex-wrap: wrap;

  margin-bottom: 10px;
`;


const UpdateTitle = styled.h3`
  margin: 0;

  color: ${({ $cancelled }) =>
    $cancelled
      ? "#dc5555"
      : "#123333"};

  font-size: 16px;

  font-weight: 600;
`;


const UpdateDate = styled.span`
  color: #123333;

  opacity: 0.6;

  font-size: 13px;
`;


const UpdateDescription = styled.p`
  margin: 0 0 5px;

  color: #123333;

  font-size: 14px;

  line-height: 1.5;
`;


const UpdateTime = styled.p`
  margin: 0;

  color: #123333;

  opacity: 0.5;

  font-size: 12px;
`;


const ExtraInfo = styled.div`
  margin-top: 12px;

  padding: 12px 15px;

  background: #f1f5f2;

  border-left: 3px solid #159447;

  color: #123333;

  font-size: 13px;
`;


/* =====================================================
   SUMMARY
===================================================== */

const SummaryCard = styled.div`
  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.09);

  padding: 22px 25px;

  margin-top: 15px;
`;


const SummaryTitle = styled.h2`
  margin: 0 0 18px;

  color: #123333;

  font-size: 18px;
`;


const SummaryContent = styled.div`
  display: flex;

  gap: 18px;

  align-items: center;
`;


const SummaryImage = styled.img`
  width: 80px;

  height: 90px;

  object-fit: cover;

  border-radius: 4px;

  background: #d2e0dc;
`;


const SummaryInfo = styled.div`
  min-width: 0;
`;


const SummaryProduct = styled.h3`
  margin: 0 0 8px;

  color: #123333;

  font-size: 15px;
`;


const SummaryMeta = styled.p`
  margin: 4px 0;

  color: #123333;

  opacity: 0.55;

  font-size: 12px;
`;


const SummaryPrice = styled.div`
  margin-top: 8px;

  color: #123333;

  font-size: 17px;

  font-weight: 700;
`;