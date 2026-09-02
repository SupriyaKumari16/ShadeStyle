import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const PAGE_BG = "#EAF2EC";
const IVORY = "#F8F5EC";
const SOFT_IVORY = "#F4F1E8";
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

  @media (max-width: 48em) {
    padding: 5rem 1.2rem 3rem;
  }
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 2.5rem;
  font-size: ${(props) => props.theme.fontsm};
  color: ${MUTED_TEAL};

  span:last-child {
    color: ${DARK_TEAL};
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxs};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 3rem;

  h1 {
    font-family: "Kaushan Script";
    font-size: ${(props) => props.theme.fontxxxl};
    font-weight: 400;
    line-height: 1;
  }

  .description {
    margin-top: 1rem;
    max-width: 32rem;
    color: ${MUTED_TEAL};
    font-size: ${(props) => props.theme.fontmd};
    line-height: 1.6;
  }

  @media (max-width: 64em) {
    h1 {
      font-size: ${(props) => props.theme.fontxxl};
    }
  }

  @media (max-width: 48em) {
    flex-direction: column;
    align-items: flex-start;

    h1 {
      font-size: ${(props) => props.theme.fontxl};
    }
  }
`;

const SortBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  white-space: nowrap;

  select {
    appearance: none;
    border: 1px solid ${BORDER};
    background: ${IVORY};
    color: ${DARK_TEAL};
    padding: 0.9rem 2.8rem 0.9rem 1rem;
    border-radius: 0.8rem;
    font-family: inherit;
    cursor: pointer;
    outline: none;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 64em) {
    grid-template-columns: 14rem 1fr;
  }

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
  }
`;

const FilterSidebar = styled.aside`
  background: ${IVORY};
  border: 1px solid ${BORDER};
  border-radius: 1rem;
  padding: 1.5rem;
  position: sticky;
  top: 6rem;
  box-shadow: 0 10px 30px rgba(18, 63, 61, 0.04);

  @media (max-width: 48em) {
    position: relative;
    top: 0;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 600;
  }

  button {
    border: none;
    background: transparent;
    color: ${MUTED_TEAL};
    font-family: inherit;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontxs};
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: ${(props) => props.theme.fontsm};
    margin-bottom: 1rem;
    font-weight: 600;
  }
`;

const RadioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: ${(props) => props.theme.fontsm};
  cursor: pointer;

  input {
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 1px solid ${MUTED_TEAL};
    border-radius: 50%;
    position: relative;
    cursor: pointer;

    &:checked {
      border-color: ${DARK_TEAL};
    }

    &:checked::after {
      content: "";
      position: absolute;
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      background: ${DARK_TEAL};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const PriceRange = styled.div`
  .range {
    position: relative;
    height: 2px;
    background: #b7c8c0;
    margin: 1.3rem 0;
  }

  .range::before,
  .range::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${ACCENT};
    transform: translateY(-50%);
  }

  .range::before {
    left: 0;
  }

  .range::after {
    right: 0;
  }

  .values {
    display: flex;
    justify-content: space-between;
    font-size: ${(props) => props.theme.fontxs};
    color: ${MUTED_TEAL};
  }
`;

const ColorList = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const ColorDot = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.$active ? DARK_TEAL : "transparent"};
  background: ${(props) => props.$color};
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  border: none;
  background: ${DARK_TEAL};
  color: ${IVORY};
  padding: 0.9rem;
  border-radius: 0.7rem;
  font-family: inherit;
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const ProductsArea = styled.div`
  min-width: 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;

  @media (max-width: 75em) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 56em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 30em) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.7rem;
  }
`;

const ProductCard = styled.article`
  background: ${IVORY};
  border-radius: 0.9rem;
  overflow: hidden;
  border: 1px solid ${BORDER};
  cursor: pointer;
  transition: 0.35s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(18, 63, 61, 0.1);
  }

  &:focus-visible {
    outline: 2px solid ${DARK_TEAL};
    outline-offset: 3px;
  }
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 0.78;
  background: ${SOFT_IVORY};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.04);
  }
`;

const Wishlist = styled.button`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  border: none;
  background: rgba(248, 245, 236, 0.95);
  color: ${DARK_TEAL};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.2s ease;
  z-index: 2;

  &:hover {
    transform: scale(1.08);
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;

  h3 {
    font-size: ${(props) => props.theme.fontsm};
    font-weight: 500;
    margin-bottom: 0.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  .price {
    font-size: ${(props) => props.theme.fontsm};
    font-weight: 600;
  }

  .rating {
    font-size: ${(props) => props.theme.fontxs};
    color: ${DARK_TEAL};
  }

  .star {
    color: ${ACCENT};
  }

  @media (max-width: 30em) {
    padding: 0.7rem;

    h3 {
      font-size: 0.7rem;
    }

    .price,
    .rating {
      font-size: 0.65rem;
    }
  }
`;

const CartButton = styled.button`
  width: 100%;
  margin-top: 0.8rem;
  border: none;
  background: ${DARK_TEAL};
  color: ${IVORY};
  padding: 0.7rem 0.8rem;
  border-radius: 0.6rem;
  font-family: inherit;
  font-size: ${(props) => props.theme.fontxs};
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const EmptyState = styled.div`
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${IVORY};
  border-radius: 1rem;
  padding: 2rem;
  color: ${MUTED_TEAL};

  h3 {
    color: ${DARK_TEAL};
    margin-bottom: 0.5rem;
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  color: ${MUTED_TEAL};
  font-size: ${(props) => props.theme.fontsm};

  @media (max-width: 48em) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const PageButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${BORDER};
  border-radius: 0.6rem;

  background: ${(props) =>
    props.$active ? DARK_TEAL : IVORY};

  color: ${(props) =>
    props.$active ? IVORY : DARK_TEAL};

  cursor: pointer;
  font-family: inherit;
  transition: 0.2s ease;

  &:hover {
    border-color: ${DARK_TEAL};
  }
`;

const JewelleryCollection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [category, setCategory] =
    useState("All");

  const [selectedColor, setSelectedColor] =
    useState("");

  const [sort, setSort] =
    useState("recommended");

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [wishlist, setWishlist] =
    useState([]);

  const categories = [
    "All",
    "Earrings",
    "Necklaces",
    "Bracelets",
    "Bangles",
  ];

  const colors = [
    {
      name: "Gold",
      value: "#D4AF37",
    },
    {
      name: "Silver",
      value: "#C5C5C5",
    },
    {
      name: "Pearl",
      value: "#F5F0E6",
    },
  ];

  useEffect(() => {
    const fetchJewellery = async () => {
      try {
        setLoading(true);
        setError("");

        const params =
          new URLSearchParams();

        params.set(
          "collection",
          "jewellery"
        );

        if (category !== "All") {
          params.set(
            "category",
            category
          );
        }

        if (selectedColor) {
          params.set(
            "color",
            selectedColor
          );
        }

        const response = await fetch(
          `http://localhost:5000/api/products?${params.toString()}`
        );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Failed to fetch jewellery"
          );
        }

        setProducts(
          data.products || []
        );

      } catch (err) {
        console.error(
          "Jewellery API error:",
          err
        );

        setProducts([]);

        setError(
          "Unable to load jewellery products."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchJewellery();
  }, [
    category,
    selectedColor,
  ]);

  const sortedProducts =
    useMemo(() => {
      const result = [
        ...products,
      ];

      if (sort === "low") {
        result.sort(
          (a, b) =>
            a.price - b.price
        );
      }

      if (sort === "high") {
        result.sort(
          (a, b) =>
            b.price - a.price
        );
      }

      if (sort === "rating") {
        result.sort(
          (a, b) =>
            b.rating - a.rating
        );
      }

      return result;
    }, [
      products,
      sort,
    ]);

  const toggleWishlist = (id) => {
    setWishlist(
      (previous) =>
        previous.includes(id)
          ? previous.filter(
              (item) =>
                item !== id
            )
          : [
              ...previous,
              id,
            ]
    );
  };

  const clearFilters = () => {
    setCategory("All");
    setSelectedColor("");
    setSort("recommended");
  };

  return (
    <Page>

      <Breadcrumb>
        <span>Home</span>
        <span>›</span>
        <span>Collections</span>
        <span>›</span>
        <span>
          Jewellery Collection
        </span>
      </Breadcrumb>

      <Header>
        <div>
          <h1>
            Jewellery Collection
          </h1>

          <p className="description">
            Elegant pieces to complete
            every look, from everyday
            minimal styles to statement
            jewellery ✨
          </p>
        </div>

        <SortBox>
          <span>
            Sort by
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value
              )
            }
          >
            <option value="recommended">
              Recommended
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="rating">
              Highest Rated
            </option>
          </select>
        </SortBox>
      </Header>

      <Content>

        <FilterSidebar>

          <FilterHeader>
            <h2>
              Filter
            </h2>

            <button
              type="button"
              onClick={
                clearFilters
              }
            >
              Clear All
            </button>
          </FilterHeader>

          <FilterGroup>
            <h3>
              Category
            </h3>

            <RadioList>
              {categories.map(
                (item) => (
                  <RadioLabel
                    key={item}
                  >
                    <input
                      type="radio"
                      name="jewellery-category"
                      checked={
                        category ===
                        item
                      }
                      onChange={() =>
                        setCategory(
                          item
                        )
                      }
                    />

                    {item}
                  </RadioLabel>
                )
              )}
            </RadioList>
          </FilterGroup>

          <FilterGroup>
            <h3>
              Price Range
            </h3>

            <PriceRange>
              <div className="range" />

              <div className="values">
                <span>
                  ₹0
                </span>

                <span>
                  ₹5000+
                </span>
              </div>
            </PriceRange>
          </FilterGroup>

          <FilterGroup>
            <h3>
              Material / Color
            </h3>

            <ColorList>
              {colors.map(
                (color) => (
                  <ColorDot
                    key={
                      color.name
                    }
                    type="button"
                    title={
                      color.name
                    }
                    aria-label={
                      color.name
                    }
                    $color={
                      color.value
                    }
                    $active={
                      selectedColor ===
                      color.name
                    }
                    onClick={() =>
                      setSelectedColor(
                        selectedColor ===
                        color.name
                          ? ""
                          : color.name
                      )
                    }
                  />
                )
              )}
            </ColorList>
          </FilterGroup>

          <ApplyButton
            type="button"
          >
            Apply Filters
          </ApplyButton>

        </FilterSidebar>

        <ProductsArea>

          {loading ? (
            <EmptyState>
              <h3>
                Loading jewellery...
              </h3>

              <p>
                Please wait a moment.
              </p>
            </EmptyState>

          ) : error ? (
            <EmptyState>
              <h3>
                {error}
              </h3>

              <p>
                Please try again.
              </p>
            </EmptyState>

          ) : sortedProducts.length >
            0 ? (

            <ProductGrid>

              {sortedProducts.map(
                (product) => (

                  <ProductCard
                    key={
                      product._id
                    }
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      navigate(
                        `/product/${product._id}`
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key ===
                          "Enter" ||
                        event.key ===
                          " "
                      ) {
                        event.preventDefault();

                        navigate(
                          `/product/${product._id}`
                        );
                      }
                    }}
                  >

                    <ProductImage>

                      <img
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                        loading="lazy"
                      />

                      <Wishlist
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          toggleWishlist(
                            product._id
                          );
                        }}
                        aria-label="Add to wishlist"
                      >
                        {wishlist.includes(
                          product._id
                        )
                          ? "♥"
                          : "♡"}
                      </Wishlist>

                    </ProductImage>

                    <ProductInfo>

                      <h3>
                        {
                          product.name
                        }
                      </h3>

                      <div className="bottom">

                        <span className="price">
                          ₹
                          {product.price.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span className="rating">

                          <span className="star">
                            ★
                          </span>

                          {" "}

                          {
                            product.rating
                          }

                        </span>

                      </div>

                    
                        <CartButton
  type="button"
  onClick={(event) => {
    event.stopPropagation();

    addToCart(
      product,
      1,
      product.sizes?.[0] || ""
    );

    alert("Product added to cart!");
  }}
>
  🛒 Add to Cart
</CartButton>
</ProductInfo>

                  </ProductCard>
                )
              )}

            </ProductGrid>

          ) : (

            <EmptyState>
              <h3>
                No jewellery found
              </h3>

              <p>
                Try changing your
                filters.
              </p>
            </EmptyState>

          )}

          <BottomBar>

            <span>
              Showing 1 –{" "}
              {
                sortedProducts.length
              }{" "}
              of{" "}
              {
                sortedProducts.length
              }{" "}
              results
            </span>

            <Pagination>

              <PageButton
                type="button"
              >
                ←
              </PageButton>

              <PageButton
                type="button"
                $active
              >
                1
              </PageButton>

              <PageButton
                type="button"
              >
                2
              </PageButton>

              <PageButton
                type="button"
              >
                3
              </PageButton>

              <PageButton
                type="button"
              >
                4
              </PageButton>

              <PageButton
                type="button"
              >
                5
              </PageButton>

              <PageButton
                type="button"
              >
                →
              </PageButton>

            </Pagination>

          </BottomBar>

        </ProductsArea>

      </Content>

    </Page>
  );
};

export default JewelleryCollection;