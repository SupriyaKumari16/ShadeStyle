import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
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
const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
const ProductLayout = styled.section`
  display: grid;
  grid-template-columns:
    minmax(0, 1.05fr)
    minmax(350px, 0.95fr);
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;
const Gallery = styled.div`
  display: grid;
  grid-template-columns: 82px 1fr;
  gap: 1rem;
  align-items: start;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;
const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  @media (max-width: 600px) {
    order: 2;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.3rem;
  }
`;
const Thumbnail = styled.button`
  width: 78px;
  height: 94px;
  padding: 0;
  border-radius: 0.55rem;
  border: 1px solid
    ${(props) =>
      props.$active
        ? PEACH
        : BORDER};
  background: ${IVORY};
  overflow: hidden;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  &:hover {
    border-color: ${PEACH};
    transform: translateY(-2px);
  }
  @media (max-width: 600px) {
    flex: 0 0 auto;
    width: 65px;
    height: 78px;
  }
`;
const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 0.78;
  background: ${IVORY};
  border-radius: 0.8rem;
  border: 1px solid ${BORDER};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor:
    ${(props) =>
      props.$zoomed
        ? "zoom-out"
        : "zoom-in"};
  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition:
      transform 0.15s ease;
    user-select: none;
    pointer-events: none;
  }
  @media (max-width: 600px) {
    aspect-ratio: 0.85;
  }
`;
const ZoomHint = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 3;
  padding: 0.45rem 0.7rem;
  border-radius: 0.4rem;
  background:
    rgba(248, 245, 236, 0.92);
  color: ${TEAL};
  font-size: 0.68rem;
  pointer-events: none;
  opacity:
    ${(props) =>
      props.$visible ? 1 : 0};
  transition:
    opacity 0.2s ease;
  @media (max-width: 600px) {
    display: none;
  }
`;
const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${BORDER};
  background:
    rgba(248, 245, 236, 0.95);
  color: ${TEAL};
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition:
    transform 0.2s ease;
  &:hover {
    transform: scale(1.06);
  }
`;
const ProductInfo = styled.div`
  background: ${IVORY};
  border: 1px solid ${BORDER};
  border-radius: 0.8rem;
  padding: 1.8rem;
  height: fit-content;
  @media (max-width: 600px) {
    padding: 1.2rem;
  }
`;
const ProductTitle = styled.h1`
  font-size: 1.7rem;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 0.8rem;
  color: ${TEAL};
  @media (max-width: 600px) {
    font-size: 1.35rem;
  }
`;
const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.4rem;
`;
const RatingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.65rem;
  border-radius: 0.4rem;
  background: ${TEAL};
  color: ${IVORY};
  font-size: 0.8rem;
  font-weight: 600;
`;
const ReviewText = styled.span`
  color: ${MUTED};
  font-size: 0.82rem;
`;
const PriceSection = styled.div`
  padding: 1.2rem 0;
  border-top: 1px solid ${BORDER};
  border-bottom: 1px solid ${BORDER};
  margin-bottom: 1.3rem;
`;
const Price = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${TEAL};
  margin-right: 0.7rem;
`;
const MRP = styled.span`
  font-size: 0.95rem;
  color: ${MUTED};
  text-decoration: line-through;
  margin-right: 0.7rem;
`;
const Discount = styled.span`
  color: #52816f;
  font-size: 0.9rem;
  font-weight: 600;
`;
const OffersBox = styled.div`
  padding: 1rem;
  border-radius: 0.6rem;
  background: #eef4ee;
  border: 1px solid
    rgba(18, 63, 61, 0.08);
  margin-bottom: 1.5rem;
`;
const OfferTitle = styled.h3`
  font-size: 0.9rem;
  margin-bottom: 0.7rem;
  font-weight: 600;
`;
const Offer = styled.div`
  display: flex;
  gap: 0.55rem;
  margin-bottom: 0.5rem;
  font-size: 0.78rem;
  color: ${MUTED};
  &:last-child {
    margin-bottom: 0;
  }
  strong {
    color: ${TEAL};
  }
`;
const OptionSection = styled.div`
  margin-bottom: 1.5rem;
`;
const OptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  strong {
    font-size: 0.9rem;
  }
  span {
    font-size: 0.78rem;
    color: ${MUTED};
  }
`;
const ColorOptions = styled.div`
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
`;
const ColorCircle = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background:
    ${(props) =>
      props.$color};
  border: 3px solid
    ${(props) =>
      props.$active
        ? IVORY
        : "transparent"};
  outline: 1px solid
    ${(props) =>
      props.$active
        ? TEAL
        : BORDER};
  cursor: pointer;
  transition:
    transform 0.2s ease;
  &:hover {
    transform: scale(1.08);
  }
`;
const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;
const SizeButton = styled.button`
  min-width: 52px;
  padding: 0.65rem 0.9rem;
  border-radius: 0.45rem;
  border: 1px solid
    ${(props) =>
      props.$active
        ? TEAL
        : BORDER};
  background:
    ${(props) =>
      props.$active
        ? TEAL
        : "transparent"};
  color:
    ${(props) =>
      props.$active
        ? IVORY
        : TEAL};
  cursor: pointer;
  font-family: inherit;
  transition: 0.2s ease;
  &:hover {
    border-color: ${TEAL};
  }
`;
const QuantityBox = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${BORDER};
  border-radius: 0.45rem;
  overflow: hidden;
  background: ${SOFT_IVORY};
`;
const QuantityButton = styled.button`
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  color: ${TEAL};
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: ${IVORY};
  }
`;
const QuantityValue = styled.span`
  width: 38px;
  text-align: center;
  font-size: 0.85rem;
`;
const ActionButtons = styled.div`
  display: grid;
  grid-template-columns:
    1fr 1fr;
  gap: 0.8rem;
  margin-top: 1.5rem;
  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;
const AddToCart = styled.button`
  height: 52px;
  border-radius: 0.55rem;
  border: 1px solid ${PEACH};
  background: #f2c3a7;
  color: ${TEAL};
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;
const BuyNow = styled.button`
  height: 52px;
  border-radius: 0.55rem;
  border: none;
  background: ${TEAL};
  color: ${IVORY};
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    opacity: 0.92;
  }
`;
const DeliveryBox = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.3rem;
  border-top: 1px solid ${BORDER};
`;
const DeliveryTitle = styled.h3`
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
`;
const DeliveryInput = styled.div`
  display: flex;
  max-width: 330px;
  border: 1px solid ${BORDER};
  border-radius: 0.5rem;
  overflow: hidden;
  background: ${WHITE};
  input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    padding: 0.75rem;
    font-family: inherit;
    color: ${TEAL};
  }
  button {
    border: none;
    border-left: 1px solid ${BORDER};
    background: transparent;
    color: ${TEAL};
    padding: 0 1rem;
    font-weight: 600;
    cursor: pointer;
  }
`;
const ServiceFeatures = styled.div`
  display: grid;
  grid-template-columns:
    repeat(3, 1fr);
  gap: 0.8rem;
  margin-top: 1.5rem;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
const Service = styled.div`
  padding: 0.8rem;
  border: 1px solid ${BORDER};
  border-radius: 0.5rem;
  background: ${SOFT_IVORY};
  font-size: 0.7rem;
  text-align: center;
  color: ${MUTED};
  strong {
    display: block;
    color: ${TEAL};
    margin-bottom: 0.25rem;
  }
`;
const DetailsSection = styled.section`
  max-width: 1400px;
  margin: 2rem auto 0;
  display: grid;
  grid-template-columns:
    1fr 1fr;
  gap: 1.5rem;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
const DetailCard = styled.div`
  background: ${IVORY};
  border: 1px solid ${BORDER};
  border-radius: 0.8rem;
  padding: 1.5rem;
`;
const DetailTitle = styled.h2`
  font-size: 1.15rem;
  margin-bottom: 1.2rem;
  font-weight: 600;
`;
const Description = styled.p`
  color: ${MUTED};
  font-size: 0.86rem;
  line-height: 1.8;
`;
const Highlights = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.7rem;
  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: ${MUTED};
    font-size: 0.82rem;
    &::before {
      content: "✓";
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #dfece3;
      color: ${TEAL};
      font-size: 0.7rem;
      flex-shrink: 0;
    }
  }
`;
const Specifications = styled.section`
  max-width: 1400px;
  margin: 1.5rem auto 0;
  background: ${IVORY};
  border: 1px solid ${BORDER};
  border-radius: 0.8rem;
  padding: 1.5rem;
`;
const SpecGrid = styled.div`
  display: grid;
  grid-template-columns:
    repeat(2, 1fr);
  border: 1px solid ${BORDER};
  border-radius: 0.5rem;
  overflow: hidden;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
const SpecRow = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  padding: 0.9rem;
  border-bottom: 1px solid ${BORDER};
  font-size: 0.8rem;
  &:nth-child(odd) {
    background:
      rgba(234, 242, 236, 0.35);
  }
  .label {
    color: ${MUTED};
  }
  .value {
    color: ${TEAL};
    font-weight: 500;
  }
  @media (max-width: 500px) {
    grid-template-columns:
      110px 1fr;
  }
`;
const ReviewsSection = styled.section`
  max-width: 1400px;
  margin: 1.5rem auto 0;
  background: ${IVORY};
  border: 1px solid ${BORDER};
  border-radius: 0.8rem;
  padding: 1.5rem;
`;
const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  h2 {
    font-size: 1.15rem;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7rem;
  }
`;
const ReviewSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const BigRating = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${TEAL};
`;
const Stars = styled.div`
  color: ${PEACH};
  letter-spacing: 2px;
  font-size: 0.9rem;
`;
const PRODUCT_COLORS = {
  lavender: "#B8A5D6",
  "sky blue": "#9DB8D9",
  ivory: "#F4E9D5",
  peach: "#F5B58F",
  "mint green": "#AFC8B8",
  "light pink": "#E8B9C0",
  beige: "#DCC5A7",
  olive: "#7D8060",
  rust: "#A94F32",
  mustard: "#D1A33A",
  emerald: "#287A62",
  "deep teal": "#236B6B",
  burgundy: "#6D2638",
  "royal blue": "#3155A5",
  plum: "#704263",
  chocolate: "#70452F",
  "cobalt blue": "#3158B7",
  gold: "#D5A83A",
  silver: "#BFC4C8",
  pearl: "#F2EEE4",
  "forest green": "#315A45",
  teal: "#287C78",
  cream: "#F2E3C4",
  coral: "#D87567",
};
const StateMessage = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${MUTED};
  font-size: 1rem;
`;
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Product not found"
          );
        }
        setProduct(data.product);
      } catch (fetchError) {
        console.error(
          "Product fetch error:",
          fetchError
        );
        setProduct(null);
        setError(
          "Unable to load this product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);
  const images = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length) {
      return product.images;
    }
    // Backend currently stores one image per product.
    // Show it in 3 thumbnail slots for now; later these can
    // be replaced automatically when multiple images are added.
    return product.image
      ? [product.image, product.image, product.image]
      : [];
  }, [product]);
  const colors = useMemo(() => {
    if (!product?.color) return [];
    const key = product.color.toLowerCase();
    return [PRODUCT_COLORS[key] || "#C7C7C7"];
  }, [product]);
  const mrp = product?.mrp || product?.price || 0;
  const discount = product?.discount || 0;
  const reviews = product?.reviews || 0;
  const description =
    product?.description ||
    `A stylish ${product?.category || "fashion"} piece in ${product?.color || "a beautiful shade"}, designed for effortless everyday styling.`;
  const highlights =
    Array.isArray(product?.highlights) && product.highlights.length
      ? product.highlights
      : [
          `${product?.color || "Premium"} colour`,
          `${product?.category || "Fashion"} collection`,
          "Comfortable everyday styling",
          "Easy to style",
          "Quality fashion finish",
        ];
  const specifications =
    Array.isArray(product?.specifications) && product.specifications.length
      ? product.specifications
      : [
          ["Category", product?.category || "Fashion"],
          ["Collection", product?.collectionType || "Fashion"],
          ["Color", product?.color || "—"],
          ["Available Sizes", product?.sizes?.join(", ") || "Free Size"],
          ["Country of Origin", "India"],
        ];
  const [selectedImage, setSelectedImage] =
    useState(0);
  const [selectedColor, setSelectedColor] =
    useState(0);
  const [selectedSize, setSelectedSize] =
    useState("");
  const [quantity, setQuantity] =
    useState(1);
  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist();

  const wishlist = product ? isInWishlist(product._id) : false;
  const [pincode, setPincode] =
    useState("");
  /* ZOOM */
  const [isZoomed, setIsZoomed] =
    useState(false);
  const [zoomPosition, setZoomPosition] =
    useState({
      x: 50,
      y: 50,
    });
  const increaseQuantity = () => {
    setQuantity(
      (previous) =>
        previous + 1
    );
  };
  const decreaseQuantity = () => {
    setQuantity(
      (previous) =>
        Math.max(
          1,
          previous - 1
        )
    );
  };
  const changeImage = (index) => {
    setSelectedImage(index);
    setIsZoomed(false);
    setZoomPosition({
      x: 50,
      y: 50,
    });
  };
  const handleMouseMove = (event) => {
    if (!isZoomed) {
      return;
    }
    const rect =
      event.currentTarget.getBoundingClientRect();
    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;
    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;
    setZoomPosition({
      x,
      y,
    });
  };
  const resetZoom = () => {
    setIsZoomed(false);
    setZoomPosition({
      x: 50,
      y: 50,
    });
  };
  if (loading) {
    return (
      <Page>
        <StateMessage>
          Loading product...
        </StateMessage>
      </Page>
    );
  }
  if (error || !product) {
    return (
      <Page>
        <StateMessage>
          {error || "Product not found."}
        </StateMessage>
      </Page>
    );
  }
  return (
    <Page>
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}
      <Breadcrumb>
        <span>
          Home
        </span>
        <span>
          ›
        </span>
        <span>
          Collections
        </span>
        <span>
          ›
        </span>
        <span>
          {product.collectionType || "Collection"}
        </span>
        <span>
          ›
        </span>
        <span>
          {product.name}
        </span>
      </Breadcrumb>
      {/* =====================================================
          PRODUCT
      ===================================================== */}
      <ProductLayout>
        {/* ===================================================
            GALLERY
        =================================================== */}
        <Gallery>
          {/* THUMBNAILS */}
          <ThumbnailList>
            {images.map(
              (image, index) => (
                <Thumbnail
                  key={image}
                  type="button"
                  $active={
                    selectedImage ===
                    index
                  }
                  onClick={() =>
                    changeImage(index)
                  }
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                  />
                </Thumbnail>
              )
            )}
          </ThumbnailList>
          {/* MAIN IMAGE */}
          <MainImageWrapper
            $zoomed={isZoomed}
            onMouseEnter={() =>
              setIsZoomed(true)
            }
            onMouseLeave={
              resetZoom
            }
            onMouseMove={
              handleMouseMove
            }
            onClick={() =>
              setIsZoomed(
                (previous) =>
                  !previous
              )
            }
          >
            <img
              className="main-image"
              src={
                images[
                  selectedImage
                ]
              }
              alt={
                product.name
              }
              style={{
                transform:
                  isZoomed
                    ? "scale(2)"
                    : "scale(1)",
                transformOrigin:
                  `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
            {/* ZOOM HINT */}
            <ZoomHint
              $visible={
                !isZoomed
              }
            >
              Hover to zoom
            </ZoomHint>
            {/* WISHLIST */}
            <WishlistButton
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                toggleWishlist(product);
              }}
              aria-label="Wishlist"
            >
              {wishlist
                ? "♥"
                : "♡"}
            </WishlistButton>
          </MainImageWrapper>
        </Gallery>
        {/* ===================================================
            PRODUCT INFORMATION
        =================================================== */}
        <ProductInfo>
          {/* TITLE */}
          <ProductTitle>
            {product.name}
          </ProductTitle>
          {/* RATING */}
          <RatingRow>
            <RatingBadge>
              {product.rating} ★
            </RatingBadge>
            <ReviewText>
              {reviews} Ratings &
              Reviews
            </ReviewText>
          </RatingRow>
          {/* PRICE */}
          <PriceSection>
            <Price>
              ₹
              {product.price.toLocaleString(
                "en-IN"
              )}
            </Price>
            {discount > 0 && (
              <>
                <MRP>
                  ₹
                  {mrp.toLocaleString(
                    "en-IN"
                  )}
                </MRP>
                <Discount>
                  {discount}% off
                </Discount>
              </>
            )}
          </PriceSection>
          {/* OFFERS */}
          <OffersBox>
            <OfferTitle>
              Available Offers
            </OfferTitle>
            <Offer>
              <strong>
                ✓
              </strong>
              <span>
                <strong>
                  Bank Offer:
                </strong>{" "}
                10% instant discount on
                selected cards
              </span>
            </Offer>
            <Offer>
              <strong>
                ✓
              </strong>
              <span>
                <strong>
                  Special Price:
                </strong>{" "}
                Get extra savings on this
                product
              </span>
            </Offer>
            <Offer>
              <strong>
                ✓
              </strong>
              <span>
                Free delivery available
              </span>
            </Offer>
          </OffersBox>
          {/* COLOR */}
          <OptionSection>
            <OptionHeader>
              <strong>
                Color: {product.color}
              </strong>
            </OptionHeader>
            <ColorOptions>
              {colors.map(
                (color, index) => (
                  <ColorCircle
                    key={color}
                    type="button"
                    $color={color}
                    $active={
                      selectedColor ===
                      index
                    }
                    onClick={() =>
                      setSelectedColor(
                        index
                      )
                    }
                    aria-label={`Color ${index + 1}`}
                  />
                )
              )}
            </ColorOptions>
          </OptionSection>
          {/* SIZE */}
          <OptionSection>
            <OptionHeader>
              <strong>
                Select Size
              </strong>
              <span>
                Size Guide
              </span>
            </OptionHeader>
            <SizeOptions>
              {product.sizes.map(
                (size) => (
                  <SizeButton
                    key={size}
                    type="button"
                    $active={
                      selectedSize ===
                      size
                    }
                    onClick={() =>
                      setSelectedSize(
                        size
                      )
                    }
                  >
                    {size}
                  </SizeButton>
                )
              )}
            </SizeOptions>
          </OptionSection>
          {/* QUANTITY */}
          <OptionSection>
            <OptionHeader>
              <strong>
                Quantity
              </strong>
            </OptionHeader>
            <QuantityBox>
              <QuantityButton
                type="button"
                onClick={
                  decreaseQuantity
                }
              >
                −
              </QuantityButton>
              <QuantityValue>
                {quantity}
              </QuantityValue>
              <QuantityButton
                type="button"
                onClick={
                  increaseQuantity
                }
              >
                +
              </QuantityButton>
            </QuantityBox>
          </OptionSection>
          {/* ACTION BUTTONS */}
          <ActionButtons>
            <AddToCart
              type="button"
            >
              🛒 Add to Cart
            </AddToCart>
            <BuyNow
              type="button"
            >
              Buy Now
            </BuyNow>
          </ActionButtons>
          {/* DELIVERY */}
          <DeliveryBox>
            <DeliveryTitle>
              Delivery
            </DeliveryTitle>
            <DeliveryInput>
              <input
                type="text"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(event) =>
                  setPincode(
                    event.target.value
                  )
                }
                maxLength={6}
              />
              <button
                type="button"
              >
                Check
              </button>
            </DeliveryInput>
          </DeliveryBox>
          {/* SERVICES */}
          <ServiceFeatures>
            <Service>
              <strong>
                🚚 Fast Delivery
              </strong>
              Easy doorstep delivery
            </Service>
            <Service>
              <strong>
                ↩ Easy Returns
              </strong>
              Hassle-free returns
            </Service>
            <Service>
              <strong>
                ✓ Secure
              </strong>
              Safe & secure shopping
            </Service>
          </ServiceFeatures>
        </ProductInfo>
      </ProductLayout>
      {/* =====================================================
          DESCRIPTION + HIGHLIGHTS
      ===================================================== */}
      <DetailsSection>
        <DetailCard>
          <DetailTitle>
            Product Description
          </DetailTitle>
          <Description>
            {description}
          </Description>
        </DetailCard>
        <DetailCard>
          <DetailTitle>
            Highlights
          </DetailTitle>
          <Highlights>
            {highlights.map(
              (item) => (
                <li key={item}>
                  {item}
                </li>
              )
            )}
          </Highlights>
        </DetailCard>
      </DetailsSection>
      {/* =====================================================
          SPECIFICATIONS
      ===================================================== */}
      <Specifications>
        <DetailTitle>
          Specifications
        </DetailTitle>
        <SpecGrid>
          {specifications.map(
            ([label, value]) => (
              <SpecRow
                key={label}
              >
                <span className="label">
                  {label}
                </span>
                <span className="value">
                  {value}
                </span>
              </SpecRow>
            )
          )}
        </SpecGrid>
      </Specifications>
      {/* =====================================================
          REVIEWS
      ===================================================== */}
      <ReviewsSection>
        <ReviewsHeader>
          <h2>
            Ratings & Reviews
          </h2>
          <ReviewSummary>
            <BigRating>
              {product.rating}
            </BigRating>
            <div>
              <Stars>
                ★★★★★
              </Stars>
              <ReviewText>
                {reviews} Ratings &
                Reviews
              </ReviewText>
            </div>
          </ReviewSummary>
        </ReviewsHeader>
        <Description>
          Customers have rated this product
          based on quality, fit and overall
          experience.
        </Description>
      </ReviewsSection>
    </Page>
  );
};
export default ProductDetail;