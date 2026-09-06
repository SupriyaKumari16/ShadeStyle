import React, { useState } from "react";
import styled from "styled-components";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

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

const SizeSelect = styled.select`
  width: 100%;
  height: 42px;
  margin-bottom: 0.7rem;
  padding: 0 0.75rem;
  border: 1px solid ${BORDER};
  border-radius: 0.5rem;
  background: ${WHITE};
  color: ${TEAL};
  font-family: inherit;
  font-size: 0.78rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${PEACH};
  }
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
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [selectedSizes, setSelectedSizes] = useState({});

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

          <CountBadge>{wishlist.length} Items</CountBadge>
        </Header>

        {wishlist.length > 0 ? (
          <WishlistGrid>
            {wishlist.map((product) => {
              const productId = product._id || product.id;
              const price = Number(product.price) || 0;
              const mrp = Number(product.mrp) || 0;

              const discount =
                product.discount ||
                (mrp > price
                  ? Math.round(((mrp - price) / mrp) * 100)
                  : 0);

              const hasSizes =
                Array.isArray(product.sizes) && product.sizes.length > 0;

              const selectedSize = selectedSizes[productId] || "";

              const handleAddToCart = () => {
                if (hasSizes && !selectedSize) {
                  alert("Please select a size first.");
                  return;
                }

                addToCart(product, 1, selectedSize);
                removeFromWishlist(productId);
              };

              return (
                <ProductCard key={productId}>
                  <ImageWrapper>
                    <img src={product.image} alt={product.name} />

                    <RemoveButton
                      type="button"
                      aria-label={`Remove ${product.name} from wishlist`}
                      onClick={() => removeFromWishlist(productId)}
                    >
                      ♥
                    </RemoveButton>
                  </ImageWrapper>

                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>

                    <RatingRow>
                      <Rating>{product.rating || 0} ★</Rating>
                      <Reviews>
                        {product.reviews || 0} Ratings
                      </Reviews>
                    </RatingRow>

                    <PriceRow>
                      <Price>
                        ₹{price.toLocaleString("en-IN")}
                      </Price>

                      {mrp > price && (
                        <MRP>₹{mrp.toLocaleString("en-IN")}</MRP>
                      )}

                      {discount > 0 && (
                        <Discount>{discount}% off</Discount>
                      )}
                    </PriceRow>

                    {hasSizes && (
                      <SizeSelect
                        value={selectedSize}
                        onChange={(event) =>
                          setSelectedSizes((previous) => ({
                            ...previous,
                            [productId]: event.target.value,
                          }))
                        }
                      >
                        <option value="">Select Size</option>

                        {product.sizes.map((size) => (
                          <option key={size} value={size}>
                            Size {size}
                          </option>
                        ))}
                      </SizeSelect>
                    )}

                    <AddToCartButton
                      type="button"
                      onClick={handleAddToCart}
                    >
                      🛒 Add to Cart
                    </AddToCartButton>
                  </ProductInfo>
                </ProductCard>
              );
            })}
          </WishlistGrid>
        ) : (
          <EmptyState>
            <EmptyCard>
              <div className="heart">♡</div>
              <h2>Your wishlist is empty</h2>
              <p>
                Save products you love and come back to them whenever you
                want.
              </p>
            </EmptyCard>
          </EmptyState>
        )}
      </Container>
    </Page>
  );
};

export default Wishlist;