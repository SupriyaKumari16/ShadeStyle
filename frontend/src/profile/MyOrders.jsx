import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* =====================================================
   MY ORDERS
===================================================== */

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* =====================================================
     FETCH MY ORDERS
  ===================================================== */

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/auth");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            "Failed to fetch orders:",
            data.message
          );

          setOrders([]);
          return;
        }

        const formattedOrders = [];

        data.orders.forEach((order) => {
          order.items.forEach((item) => {
            let formattedStatus = "On the way";

            if (order.status === "DELIVERED") {
              formattedStatus = "Delivered";
            } else if (order.status === "CANCELLED") {
              formattedStatus = "Cancelled";
            } else if (order.status === "RETURNED") {
              formattedStatus = "Returned";
            }

            formattedOrders.push({
              id: order.orderId,
              orderDbId: order.id,
              itemId: item.id,

              product: item.productName,

              category: "",

              color: "—",

              size: item.selectedSize || "—",

              price: Number(item.price),

              quantity: Number(item.quantity),

              date: new Date(
                order.createdAt
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              }),

              status: formattedStatus,

              image: item.productImage,
            });
          });
        });

        setOrders(formattedOrders);
      } catch (error) {
        console.error(
          "Fetch orders error:",
          error
        );

        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOrders();
  }, [navigate]);

  /* =====================================================
     STATUS FILTER
  ===================================================== */

  const handleStatusChange = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(
        selectedStatus.filter(
          (item) => item !== status
        )
      );
    } else {
      setSelectedStatus([
        ...selectedStatus,
        status,
      ]);
    }
  };

  /* =====================================================
     FILTER ORDERS
  ===================================================== */

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      order.product
        .toLowerCase()
        .includes(searchText) ||
      order.id
        .toLowerCase()
        .includes(searchText);

    const statusMatch =
      selectedStatus.length === 0 ||
      selectedStatus.includes(order.status);

    return searchMatch && statusMatch;
  });

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <Page>
      <Main>

        {/* =================================================
            HEADER
        ================================================= */}

        <Header>
          <div>
            <Title>
              My Orders
            </Title>

            <Subtitle>
              View and manage your recent orders
            </Subtitle>
          </div>
        </Header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <Content>

          {/* =================================================
              LEFT FILTERS
          ================================================= */}

          <FilterBox>
            <FilterTitle>
              Filters
            </FilterTitle>

            {/* ORDER STATUS */}

            <FilterSection>
              <SectionTitle>
                ORDER STATUS
              </SectionTitle>

              <CheckItem>
                <Checkbox
                  type="checkbox"
                  checked={selectedStatus.includes(
                    "On the way"
                  )}
                  onChange={() =>
                    handleStatusChange(
                      "On the way"
                    )
                  }
                />

                <span>
                  On the way
                </span>
              </CheckItem>

              <CheckItem>
                <Checkbox
                  type="checkbox"
                  checked={selectedStatus.includes(
                    "Delivered"
                  )}
                  onChange={() =>
                    handleStatusChange(
                      "Delivered"
                    )
                  }
                />

                <span>
                  Delivered
                </span>
              </CheckItem>

              <CheckItem>
                <Checkbox
                  type="checkbox"
                  checked={selectedStatus.includes(
                    "Cancelled"
                  )}
                  onChange={() =>
                    handleStatusChange(
                      "Cancelled"
                    )
                  }
                />

                <span>
                  Cancelled
                </span>
              </CheckItem>

              <CheckItem>
                <Checkbox
                  type="checkbox"
                  checked={selectedStatus.includes(
                    "Returned"
                  )}
                  onChange={() =>
                    handleStatusChange(
                      "Returned"
                    )
                  }
                />

                <span>
                  Returned
                </span>
              </CheckItem>
            </FilterSection>

            {/* ORDER TIME */}

            <FilterSection>
              <SectionTitle>
                ORDER TIME
              </SectionTitle>

              <CheckItem>
                <Checkbox type="checkbox" />

                <span>
                  Last 30 days
                </span>
              </CheckItem>

              <CheckItem>
                <Checkbox type="checkbox" />

                <span>
                  2026
                </span>
              </CheckItem>

              <CheckItem>
                <Checkbox type="checkbox" />

                <span>
                  2025
                </span>
              </CheckItem>

              <CheckItem>
                <Checkbox type="checkbox" />

                <span>
                  Older
                </span>
              </CheckItem>
            </FilterSection>
          </FilterBox>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <OrdersArea>

            {/* SEARCH */}

            <SearchWrapper>
              <SearchInput
                type="text"
                placeholder="Search your orders here"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <SearchButton
                whileHover={{
                  opacity: 0.9,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                🔍 Search Orders
              </SearchButton>
            </SearchWrapper>

            {/* =================================================
                ORDER LIST
            ================================================= */}

            {isLoading ? (
              <NoOrders>
                <NoOrdersIcon>
                  🛍️
                </NoOrdersIcon>

                <NoOrdersTitle>
                  Loading orders...
                </NoOrdersTitle>

                <NoOrdersText>
                  Please wait while we fetch your orders.
                </NoOrdersText>
              </NoOrders>
            ) : filteredOrders.length === 0 ? (
              <NoOrders>
                <NoOrdersIcon>
                  🛍️
                </NoOrdersIcon>

                <NoOrdersTitle>
                  No orders found
                </NoOrdersTitle>

                <NoOrdersText>
                  Try changing your search or filters.
                </NoOrdersText>
              </NoOrders>
            ) : (
              <OrderList>
                {filteredOrders.map(
                  (order, index) => (
                    <OrderCard
                      key={`${order.id}-${order.itemId}`}
                      onClick={() =>
                        navigate(
                          `/orders/${order.id}`,
                          {
                            state: {
                              order,
                            },
                          }
                        )
                      }
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.07,
                      }}
                      whileHover={{
                        y: -2,
                      }}
                    >

                      {/* =================================================
                          PRODUCT
                      ================================================= */}

                      <ProductSection>
                        <ProductImageWrapper>
                          <ProductImage
                            src={order.image}
                            alt={order.product}
                          />
                        </ProductImageWrapper>

                        <ProductInfo>
                          <ProductName>
                            {order.product}
                          </ProductName>

                          <ProductMeta>
                            Color: {order.color}
                          </ProductMeta>

                          <ProductMeta>
                            Size: {order.size}
                          </ProductMeta>

                          <OrderId>
                            Order ID: {order.id}
                          </OrderId>
                        </ProductInfo>
                      </ProductSection>

                      {/* =================================================
                          PRICE
                      ================================================= */}

                      <PriceSection>
                        <Price>
                          ₹
                          {order.price.toLocaleString(
                            "en-IN"
                          )}
                        </Price>

                        <Quantity>
                          Qty: {order.quantity}
                        </Quantity>
                      </PriceSection>

                      {/* =================================================
                          STATUS
                      ================================================= */}

                      <StatusSection>
                        <StatusRow>
                          <StatusDot
                            $status={
                              order.status
                            }
                          />

                          <StatusText
                            $status={
                              order.status
                            }
                          >
                            {order.status}

                            {order.status ===
                              "Delivered" &&
                              ` on ${order.date}`}
                          </StatusText>
                        </StatusRow>

                        {/* DELIVERED */}

                        {order.status ===
                          "Delivered" && (
                          <>
                            <StatusMessage>
                              Your item has been
                              delivered
                            </StatusMessage>

                            <ReviewButton
                              whileHover={{
                                x: 3,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();

                                navigate(
                                  `/orders/${order.id}/review`
                                );
                              }}
                            >
                              ★ Rate & Review Product
                            </ReviewButton>
                          </>
                        )}

                        {/* ON THE WAY */}

                        {order.status ===
                          "On the way" && (
                          <>
                            <StatusMessage>
                              Your item is on the way
                            </StatusMessage>

                            <TrackButton
                              whileHover={{
                                x: 3,
                              }}
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >
                              → Track Order
                            </TrackButton>
                          </>
                        )}

                        {/* CANCELLED */}

                        {order.status ===
                          "Cancelled" && (
                          <StatusMessage>
                            Your order was cancelled
                          </StatusMessage>
                        )}

                        {/* RETURNED */}

                        {order.status ===
                          "Returned" && (
                          <StatusMessage>
                            Your item has been returned
                          </StatusMessage>
                        )}
                      </StatusSection>

                    </OrderCard>
                  )
                )}
              </OrderList>
            )}

          </OrdersArea>

        </Content>
      </Main>
    </Page>
  );
};

export default MyOrders;


/* =====================================================
   PAGE
===================================================== */

const Page = styled.div`
  min-height: 100vh;

  width: 100%;

  background: #f1f5f2;

  color: #123333;

  box-sizing: border-box;

  overflow-x: hidden;
`;


/* =====================================================
   MAIN
===================================================== */

const Main = styled.main`
  width: 100%;

  max-width: 1400px;

  margin: 0 auto;

  padding: 55px 35px 70px;

  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 45px 25px 60px;
  }

  @media (max-width: 600px) {
    padding: 35px 16px 50px;
  }
`;


/* =====================================================
   HEADER
===================================================== */

const Header = styled.div`
  margin-bottom: 30px;

  display: flex;

  align-items: center;

  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;

  color: #123333;

  font-size: 32px;

  font-weight: 700;

  letter-spacing: -0.5px;

  @media (max-width: 600px) {
    font-size: 26px;
  }
`;

const Subtitle = styled.p`
  margin: 7px 0 0;

  color: #123333;

  opacity: 0.6;

  font-size: 14px;
`;


/* =====================================================
   CONTENT
===================================================== */

const Content = styled.div`
  display: grid;

  grid-template-columns:
    235px minmax(0, 1fr);

  gap: 18px;

  align-items: start;

  @media (max-width: 850px) {
    grid-template-columns:
      205px minmax(0, 1fr);

    gap: 15px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;


/* =====================================================
   FILTER BOX
===================================================== */

const FilterBox = styled.aside`
  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.1);

  border-radius: 4px;

  overflow: hidden;

  box-shadow:
    0 3px 10px
    rgba(18, 51, 51, 0.08);

  position: sticky;

  top: 20px;

  @media (max-width: 700px) {
    position: static;
  }
`;

const FilterTitle = styled.h2`
  margin: 0;

  padding: 18px;

  color: #123333;

  font-size: 21px;

  font-weight: 700;

  border-bottom: 1px solid
    rgba(18, 51, 51, 0.1);
`;

const FilterSection = styled.div`
  padding: 18px;

  border-bottom: 1px solid
    rgba(18, 51, 51, 0.08);

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h4`
  margin: 0 0 17px;

  color: #123333;

  font-size: 13px;

  font-weight: 700;

  letter-spacing: 0.3px;
`;

const CheckItem = styled.label`
  display: flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 15px;

  color: #123333;

  font-size: 14px;

  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Checkbox = styled.input`
  width: 17px;

  height: 17px;

  margin: 0;

  accent-color: #123333;

  cursor: pointer;
`;


/* =====================================================
   ORDERS AREA
===================================================== */

const OrdersArea = styled.section`
  min-width: 0;
`;


/* =====================================================
   SEARCH
===================================================== */

const SearchWrapper = styled.div`
  width: 100%;

  display: flex;

  margin-bottom: 18px;

  border-radius: 4px;

  overflow: hidden;

  box-shadow:
    0 3px 10px
    rgba(18, 51, 51, 0.08);

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;

  min-width: 0;

  height: 52px;

  padding: 0 16px;

  border: 1px solid
    rgba(18, 51, 51, 0.12);

  border-right: none;

  outline: none;

  background: #ffffff;

  color: #123333;

  font-size: 14px;

  box-sizing: border-box;

  &::placeholder {
    color: #123333;

    opacity: 0.55;
  }

  &:focus {
    border-color:
      rgba(18, 51, 51, 0.25);
  }

  @media (max-width: 550px) {
    border-right: 1px solid
      rgba(18, 51, 51, 0.12);

    border-bottom: none;
  }
`;

const SearchButton = styled(motion.button)`
  height: 52px;

  padding: 0 22px;

  border: none;

  background: #e8e1d5;

  color: #123333;

  font-size: 14px;

  font-weight: 700;

  cursor: pointer;

  white-space: nowrap;

  @media (max-width: 550px) {
    width: 100%;
  }
`;


/* =====================================================
   ORDER LIST
===================================================== */

const OrderList = styled.div`
  display: flex;

  flex-direction: column;

  gap: 10px;
`;


/* =====================================================
   ORDER CARD
===================================================== */

const OrderCard = styled(motion.article)`
  width: 100%;

  min-height: 150px;

  padding: 22px;

  box-sizing: border-box;

  display: grid;

  grid-template-columns:
    minmax(270px, 1.5fr)
    minmax(100px, 0.5fr)
    minmax(220px, 1fr);

  align-items: center;

  gap: 25px;

  background: #ffffff;

  color: #123333;

  border: 1px solid
    rgba(18, 51, 51, 0.1);

  border-radius: 4px;

  box-shadow:
    0 3px 10px
    rgba(18, 51, 51, 0.07);

  cursor: pointer;

  transition:
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    border-color:
      rgba(18, 51, 51, 0.2);

    box-shadow:
      0 6px 18px
      rgba(18, 51, 51, 0.11);
  }

  @media (max-width: 1000px) {
    grid-template-columns:
      minmax(220px, 1.4fr)
      90px
      minmax(180px, 1fr);

    gap: 16px;

    padding: 18px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;

    gap: 18px;
  }
`;


/* =====================================================
   PRODUCT
===================================================== */

const ProductSection = styled.div`
  display: flex;

  align-items: center;

  gap: 20px;

  min-width: 0;
`;

const ProductImageWrapper = styled.div`
  width: 90px;

  height: 105px;

  flex-shrink: 0;

  border-radius: 3px;

  overflow: hidden;

  background: #d2e0dc;

  @media (max-width: 600px) {
    width: 75px;

    height: 90px;
  }
`;

const ProductImage = styled.img`
  width: 100%;

  height: 100%;

  object-fit: cover;

  display: block;
`;

const ProductInfo = styled.div`
  min-width: 0;
`;

const ProductName = styled.h3`
  margin: 0 0 9px;

  color: #123333;

  font-size: 15px;

  font-weight: 600;

  line-height: 1.4;
`;

const ProductMeta = styled.p`
  margin: 4px 0;

  color: #123333;

  opacity: 0.62;

  font-size: 12px;
`;

const OrderId = styled.p`
  margin: 9px 0 0;

  color: #123333;

  opacity: 0.45;

  font-size: 11px;
`;


/* =====================================================
   PRICE
===================================================== */

const PriceSection = styled.div`
  align-self: center;
`;

const Price = styled.div`
  color: #123333;

  font-size: 17px;

  font-weight: 700;
`;

const Quantity = styled.div`
  margin-top: 8px;

  color: #123333;

  opacity: 0.55;

  font-size: 12px;
`;


/* =====================================================
   STATUS
===================================================== */

const StatusSection = styled.div`
  align-self: center;
`;

const StatusRow = styled.div`
  display: flex;

  align-items: center;

  gap: 9px;
`;

const StatusDot = styled.span`
  width: 10px;

  height: 10px;

  flex-shrink: 0;

  border-radius: 50%;

  background: ${({ $status }) => {
    if ($status === "Delivered") {
      return "#4fa866";
    }

    if ($status === "Cancelled") {
      return "#e45c5c";
    }

    return "#d3a62d";
  }};
`;

const StatusText = styled.div`
  color: ${({ $status }) => {
    if ($status === "Delivered") {
      return "#4b9d61";
    }

    if ($status === "Cancelled") {
      return "#dc5555";
    }

    return "#123333";
  }};

  font-size: 14px;

  font-weight: 700;
`;

const StatusMessage = styled.p`
  margin: 9px 0 0;

  color: #123333;

  opacity: 0.6;

  font-size: 12px;

  line-height: 1.45;
`;

const ReviewButton = styled(motion.button)`
  border: none;

  background: transparent;

  padding: 0;

  margin-top: 14px;

  color: #123333;

  font-size: 13px;

  font-weight: 700;

  cursor: pointer;
`;

const TrackButton = styled(motion.button)`
  border: none;

  background: transparent;

  padding: 0;

  margin-top: 14px;

  color: #123333;

  font-size: 13px;

  font-weight: 700;

  cursor: pointer;
`;


/* =====================================================
   NO ORDERS
===================================================== */

const NoOrders = styled.div`
  min-height: 300px;

  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.1);

  border-radius: 4px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  color: #123333;

  box-shadow:
    0 3px 10px
    rgba(18, 51, 51, 0.07);
`;

const NoOrdersIcon = styled.div`
  font-size: 45px;

  margin-bottom: 15px;
`;

const NoOrdersTitle = styled.h3`
  margin: 0;

  color: #123333;

  font-size: 20px;
`;

const NoOrdersText = styled.p`
  margin: 8px 0 0;

  color: #123333;

  opacity: 0.6;

  font-size: 13px;
`;