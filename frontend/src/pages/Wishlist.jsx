import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BG = "#EAF2EC";
const IVORY = "#F8F5EC";
const SOFT_IVORY = "#F3F0E7";
const TEAL = "#123F3D";
const MUTED = "#5D7772";
const PEACH = "#D99A78";
const BORDER = "rgba(18, 63, 61, 0.13)";
const WHITE = "#FFFFFF";

const Page = styled.main`
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  background: ${BG};
  color: ${TEAL};
  padding: 6rem 5vw 5rem;

  @media (max-width: 768px) {
    padding: 5rem 1rem 3rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 1.5rem;
  color: ${MUTED};
  font-size: 0.82rem;

  span:last-child {
    color: ${TEAL};
    font-weight: 500;
  }

  @media (max-width: 600px) {
    font-size: 0.72rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;

  h1 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0.45rem 0 0;
    color: ${MUTED};
    font-size: 0.85rem;
  }

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const CountBadge = styled.div`
  padding: 0.55rem 0.9rem;
  border: 1px solid ${BORDER};
  border-radius: 999px;
  background: ${IVORY};
  color: ${TEAL};
  font-size: 0.78rem;
  white-space: nowrap;
`;

const WishlistGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.2rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.article`
  position: relative;
  overflow: hidden;
  background: ${IVORY};
  border: 1px solid ${BORDER};
  border-radius: 0.8rem;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 35px rgba(18, 63, 61, 0.1);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 0.82;
  overflow: hidden;
  background: ${SOFT_IVORY};

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.035);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 2;
  width: 38px;
  height: 38px;
  border: 1px solid ${BORDER};
  border-radius: 50%;
  background: rgba(248, 245, 236, 0.94);
  color: ${TEAL};
  font-size: 1.15rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: scale(1.06);
    background: ${WHITE};
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h2`
  margin: 0 0 0.55rem;
  color: ${TEAL};
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.35;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.7rem;
`;

const Rating = styled.span`
  padding: 0.25rem 0.48rem;
  border-radius: 0.35rem;
  background: ${TEAL};
  color: ${IVORY};
  font-size: 0.68rem;
  font-weight: 600;
`;

const Reviews = styled.span`
  color: ${MUTED};
  font-size: 0.7rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 0.9rem;
`;

const Price = styled.span`
  color: ${TEAL};
  font-size: 1.15rem;
  font-weight: 700;
`;

const MRP = styled.span`
  color: ${MUTED};
  font-size: 0.75rem;
  text-decoration: line-through;
`;

const Discount = styled.span`
  color: #52816f;
  font-size: 0.72rem;
  font-weight: 600;
`;

const AddToCartButton = styled.button`
  width: 100%;
  height: 44px;
  border: 1px solid ${PEACH};
  border-radius: 0.5rem;
  background: #f2c3a7;
  color: ${TEAL};
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.92;
  }
`;

const EmptyState = styled.section`
  min-height: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
`;

const EmptyCard = styled.div`
  width: min(520px, 100%);
  padding: 3rem 2rem;
  text-align: center;
  background: ${IVORY};
  border: 1px solid ${BORDER};
  border-radius: 1rem;
  box-shadow: 0 12px 30px rgba(18, 63, 61, 0.06);

  .heart {
    width: 68px;
    height: 68px;
    margin: 0 auto 1.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${SOFT_IVORY};
    color: ${PEACH};
    font-size: 2rem;
  }

  h2 {
    margin: 0 0 0.6rem;
    font-size: 1.35rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${MUTED};
    font-size: 0.82rem;
    line-height: 1.7;
  }
`;

const Wishlist = () => {
  const navigate = useNavigate();

  // UI-only sample products for now.
  // Cart/wishlist functionality will be connected in the next step.
  const wishlistProducts = [
    {
      id: "sample-1",
      name: "Lavender Anarkali",
      price: 1899,
      mrp: 2499,
      discount: 24,
      rating: 4.7,
      reviews: 128,
      image: "/images/products/traditional/lavender-anarkali.jpg",
    },
    {
      id: "sample-2",
      name: "Ivory Co-ord Set",
      price: 1399,
      mrp: 1999,
      discount: 30,
      rating: 4.6,
      reviews: 94,
      image: "/images/products/trendy/ivory-coord-set.jpg",
    },
    {
      id: "sample-3",
      name: "Gold Layered Necklace",
      price: 1299,
      mrp: 1799,
      discount: 28,
      rating: 4.8,
      reviews: 156,
      image: "/images/products/jewellery/gold-layered-necklace.jpg",
    },
    {
      id: "sample-4",
      name: "Peach Ethnic Set",
      price: 1699,
      mrp: 2299,
      discount: 26,
      rating: 4.6,
      reviews: 87,
      image: "/images/products/traditional/peach-ethnic-set.jpg",
    },
  ];

  return (
    <Page>
      <Container>
        <Breadcrumb>
          <span>Home</span>
          <span>›</span>
          <span>My Wishlist</span>
        </Breadcrumb>

        <Header>
          <div>
            <h1>My Wishlist ♡</h1>
            <p>Save your favourite styles for later.</p>
          </div>
          <CountBadge>{wishlistProducts.length} Items</CountBadge>
        </Header>

        {wishlistProducts.length > 0 ? (
          <WishlistGrid>
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id}>
                <ImageWrapper>
                  <img src={product.image} alt={product.name} />
                  <RemoveButton
                    type="button"
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    ♥
                  </RemoveButton>
                </ImageWrapper>

                <ProductInfo>
                  <ProductName>{product.name}</ProductName>

                  <RatingRow>
                    <Rating>{product.rating} ★</Rating>
                    <Reviews>{product.reviews} Ratings</Reviews>
                  </RatingRow>

                  <PriceRow>
                    <Price>₹{product.price.toLocaleString("en-IN")}</Price>
                    <MRP>₹{product.mrp.toLocaleString("en-IN")}</MRP>
                    <Discount>{product.discount}% off</Discount>
                  </PriceRow>

                  <AddToCartButton
                    type="button"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    🛒 Add to Cart
                  </AddToCartButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </WishlistGrid>
        ) : (
          <EmptyState>
            <EmptyCard>
              <div className="heart">♡</div>
              <h2>Your wishlist is empty</h2>
              <p>
                Save products you love and come back to them whenever you want.
              </p>
            </EmptyCard>
          </EmptyState>
        )}
      </Container>
    </Page>
  );
};

export default Wishlist;