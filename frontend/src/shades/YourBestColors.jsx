import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const skinToneData = {
  Fair: {
    title: "Fair Skin Tone",
    colors: [
      { name: "Lavender", color: "#B8A5D6" },
      { name: "Sky Blue", color: "#9DB8D9" },
      { name: "Ivory", color: "#F5F0E6" },
      { name: "Peach", color: "#F5B58F" },
      { name: "Mint Green", color: "#AFC8B8" },
      { name: "Light Pink", color: "#E8B9C0" },
      { name: "Beige", color: "#DCC5A7" },
      { name: "Champagne", color: "#E7CBA9" },
    ],
  },

  Light: {
    title: "Light Skin Tone",
    colors: [
      { name: "Rose", color: "#D88C9A" },
      { name: "Dusty Blue", color: "#91A9C7" },
      { name: "Ivory", color: "#F5F0E6" },
      { name: "Peach", color: "#F3AE87" },
      { name: "Sage", color: "#AABCA6" },
      { name: "Mauve", color: "#B8899D" },
      { name: "Camel", color: "#C19A6B" },
      { name: "Soft Coral", color: "#E88979" },
    ],
  },

  Medium: {
    title: "Medium Skin Tone",
    colors: [
      { name: "Terracotta", color: "#C56B4A" },
      { name: "Olive", color: "#7D8060" },
      { name: "Mustard", color: "#D1A33A" },
      { name: "Teal", color: "#287C78" },
      { name: "Cream", color: "#F2E3C4" },
      { name: "Rust", color: "#A94F32" },
      { name: "Coral", color: "#D87567" },
      { name: "Chocolate", color: "#70452F" },
    ],
  },

  Olive: {
    title: "Olive Skin Tone",
    colors: [
      { name: "Emerald", color: "#287A62" },
      { name: "Burgundy", color: "#6D2638" },
      { name: "Cream", color: "#F3E7CF" },
      { name: "Forest Green", color: "#315A45" },
      { name: "Rust", color: "#A95135" },
      { name: "Plum", color: "#704263" },
      { name: "Camel", color: "#B88A5A" },
      { name: "Deep Teal", color: "#236B6B" },
    ],
  },

  Tan: {
    title: "Tan Skin Tone",
    colors: [
      { name: "Rust", color: "#A94F32" },
      { name: "Camel", color: "#B88A5A" },
      { name: "Teal", color: "#287C78" },
      { name: "Olive", color: "#777B4D" },
      { name: "Mustard", color: "#D2A42D" },
      { name: "Cream", color: "#F3E4C8" },
      { name: "Chocolate", color: "#6F402D" },
      { name: "Coral", color: "#D87567" },
    ],
  },

  Dusky: {
    title: "Dusky Skin Tone",
    colors: [
      { name: "Royal Blue", color: "#3155A5" },
      { name: "Wine", color: "#722F45" },
      { name: "Mustard", color: "#D5A52A" },
      { name: "Emerald", color: "#087A5B" },
      { name: "Terracotta", color: "#B85C3A" },
      { name: "Ivory", color: "#F4E9D5" },
      { name: "Plum", color: "#713B70" },
      { name: "Teal", color: "#267A78" },
    ],
  },

  Deep: {
    title: "Deep Skin Tone",
    colors: [
      { name: "Emerald", color: "#087A5B" },
      { name: "Cobalt Blue", color: "#3158B7" },
      { name: "Orange", color: "#D96B32" },
      { name: "Fuchsia", color: "#A92E6A" },
      { name: "Mustard", color: "#D5A52A" },
      { name: "Ivory", color: "#F4E9D5" },
      { name: "Turquoise", color: "#258B91" },
      { name: "Burgundy", color: "#76283E" },
    ],
  },

  RichDeep: {
    title: "Rich Deep Skin Tone",
    colors: [
      { name: "Magenta", color: "#A72F68" },
      { name: "Royal Purple", color: "#61358F" },
      { name: "Gold", color: "#D5A83A" },
      { name: "Cobalt", color: "#3158B7" },
      { name: "Emerald", color: "#087A5B" },
      { name: "Orange", color: "#D96B32" },
      { name: "Ivory", color: "#F5E9D2" },
      { name: "Deep Teal", color: "#176B70" },
    ],
  },
};

/* =========================
   SECTION
========================= */

const Section = styled.section`
  min-height: 100vh;
  width: 100%;

  padding: 7rem 5vw 6rem;

  box-sizing: border-box;

  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  position: relative;
`;

/* =========================
   HEADER
========================= */

const Header = styled.div`
  text-align: center;

  margin-bottom: 4rem;

  h1 {
    font-family: "Kaushan Script";
    font-size: ${(props) => props.theme.fontxxxl};
    font-weight: 400;

    margin-bottom: 1rem;
  }

  p {
    font-size: ${(props) => props.theme.fontmd};
    opacity: 0.8;
  }

  @media (max-width: 64em) {
    h1 {
      font-size: ${(props) => props.theme.fontxxl};
    }
  }

  @media (max-width: 48em) {
    h1 {
      font-size: ${(props) => props.theme.fontxl};
    }

    p {
      font-size: ${(props) => props.theme.fontsm};
    }
  }
`;

/* =========================
   SKIN INFO
========================= */

const SkinInfo = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  gap: 0.7rem;

  margin-bottom: 1rem;

  .dot {
    width: 11px;
    height: 11px;

    border-radius: 50%;

    background-color: #c58b68;
  }

  span:last-child {
    font-size: ${(props) => props.theme.fontmd};
    font-weight: 600;
  }
`;

/* =========================
   COLORS
========================= */

const ColorsTitle = styled.h2`
  text-align: center;

  font-size: ${(props) => props.theme.fontxl};
  font-weight: 500;

  margin-bottom: 2rem;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;

const Colors = styled.div`
  display: flex;

  justify-content: center;
  align-items: flex-start;

  gap: 2.2rem;

  flex-wrap: wrap;

  margin-bottom: 6rem;
`;

const Color = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 0.7rem;

  .circle {
    width: 5rem;
    height: 5rem;

    border-radius: 50%;

    background-color: ${(props) => props.$color};

    border: 1px solid rgba(0, 0, 0, 0.08);

    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.08);

    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  &:hover .circle {
    transform: translateY(-6px) scale(1.05);

    box-shadow:
      0 12px 25px rgba(0, 0, 0, 0.14);
  }

  span {
    font-size: ${(props) => props.theme.fontxs};

    text-align: center;
  }

  @media (max-width: 48em) {
    .circle {
      width: 3.8rem;
      height: 3.8rem;
    }
  }
`;

/* =========================
   COLLECTION TITLE
========================= */

const CollectionsTitle = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 2rem;

  h2 {
    font-size: ${(props) => props.theme.fontxl};

    font-weight: 500;
  }

  button {
    border: none;

    background: transparent;

    color: ${(props) => props.theme.text};

    font-family: inherit;

    cursor: pointer;

    font-size: ${(props) => props.theme.fontsm};

    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.6;
    }
  }

  @media (max-width: 48em) {
    h2 {
      font-size: ${(props) => props.theme.fontlg};
    }
  }
`;

/* =========================
   COLLECTIONS
========================= */

const Collections = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 2rem;

  @media (max-width: 64em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
  }
`;

/* =========================
   COLLECTION CARD
========================= */

const CollectionCard = styled.div`
  position: relative;

  height: 28rem;

  overflow: hidden;

  border-radius: 1rem;

  background-color: ${(props) => props.theme.grey};

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;

    display: block;

    transition:
      transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.06);
  }

  .overlay {
    position: absolute;

    inset: 0;

    display: flex;

    flex-direction: column;

    justify-content: flex-end;

    padding: 2rem;

    color: #ffffff;

    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.05) 70%
    );
  }

  h3 {
    font-size: ${(props) => props.theme.fontxl};

    margin-bottom: 0.5rem;
  }

  p {
    font-size: ${(props) => props.theme.fontsm};

    opacity: 0.9;
  }

  @media (max-width: 48em) {
    height: 24rem;

    h3 {
      font-size: ${(props) => props.theme.fontlg};
    }
  }
`;

/* =========================
   COMPONENT
========================= */

const YourBestColors = () => {
  const { tone } = useParams();

  const toneMap = {
    fair: "Fair",
    light: "Light",
    medium: "Medium",
    olive: "Olive",
    tan: "Tan",
    dusky: "Dusky",
    deep: "Deep",
    "deep-dark": "RichDeep",
  };

  const selectedTone = toneMap[tone] || "Fair";

  const currentTone =
    skinToneData[selectedTone] || skinToneData.Fair;

  return (
    <Section id="best-colors">

      {/* HEADER */}

      <Header>
        <SkinInfo>
          <span className="dot" />

          <span>
            {currentTone.title}
          </span>
        </SkinInfo>

        <h1>
          Your Best Colors
        </h1>

        <p>
          Discover the shades that complement
          your natural skin tone.
        </p>
      </Header>

      {/* COLOR PALETTE */}

      <ColorsTitle>
        Recommended Shades
      </ColorsTitle>

      <Colors>
        {currentTone.colors.map((item) => (
          <Color
            key={item.name}
            $color={item.color}
          >
            <div className="circle" />

            <span>
              {item.name}
            </span>
          </Color>
        ))}
      </Colors>

      {/* COLLECTIONS */}

      <CollectionsTitle>
        <h2>
          Shop By Category
        </h2>

        <button>
          See All →
        </button>
      </CollectionsTitle>

      <Collections>

        {/* TRENDY */}

        <CollectionCard>
          <img
            src="/images/trendy-collection.jpg"
            alt="Trendy Collection"
          />

          <div className="overlay">
            <h3>
              Trendy Collection
            </h3>

            <p>
              Latest styles curated for you
            </p>
          </div>
        </CollectionCard>

        {/* TRADITIONAL */}

        <CollectionCard>
          <img
            src="/images/traditional-collection.jpg"
            alt="Traditional Collection"
          />

          <div className="overlay">
            <h3>
              Traditional Collection
            </h3>

            <p>
              Elegant and timeless ethnic wear
            </p>
          </div>
        </CollectionCard>

        {/* JEWELLERY */}

        <CollectionCard>
          <img
            src="/images/jewelry-collection.jpg"
            alt="Jewellery Collection"
          />

          <div className="overlay">
            <h3>
              Jewellery Collection
            </h3>

            <p>
              Elegant accessories for your look
            </p>
          </div>
        </CollectionCard>

      </Collections>

    </Section>
  );
};

export default YourBestColors;