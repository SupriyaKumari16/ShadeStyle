import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";


/* =====================================================
   DEMO ORDERS
===================================================== */

const orders = [
  {
    id: "SS10245",
    product: "Elegant Floral Kurti",
    color: "Green",
    size: "M",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300",
  },

  {
    id: "SS10231",
    product: "Classic Ethnic Saree",
    color: "Maroon",
    size: "Free Size",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300",
  },

  {
    id: "SS10198",
    product: "Minimal Gold Necklace",
    color: "Gold",
    size: "One Size",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300",
  },

  {
    id: "SS10172",
    product: "Printed Summer Dress",
    color: "Blue",
    size: "L",
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300",
  },
];


const WriteReview = () => {

  const navigate = useNavigate();

  const { id } = useParams();


  const order =
    orders.find(
      (item) => item.id === id
    ) || orders[0];


  const [rating, setRating] =
    useState(1);

  const [description, setDescription] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);


  /* =====================================================
     RATING TEXT
  ===================================================== */

  const ratingText = {
    1: "Very Bad",
    2: "Bad",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };


  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!description.trim()) {
      alert(
        "Please write your review first."
      );

      return;
    }

    setSubmitted(true);
  };


  if (submitted) {

    return (
      <Page>

        <SuccessBox>

          <SuccessIcon>
            ✓
          </SuccessIcon>

          <SuccessTitle>
            Review Submitted
          </SuccessTitle>

          <SuccessText>
            Thank you for sharing your
            experience with us.
          </SuccessText>

          <BackButton
            onClick={() =>
              navigate(
                `/orders/${order.id}`
              )
            }
          >
            Back to Order Details
          </BackButton>

        </SuccessBox>

      </Page>
    );
  }


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

        </TopBar>


        {/* =================================================
            HEADER
        ================================================= */}

        <Header>

          <Title>
            Ratings & Reviews
          </Title>


          <ProductMini>

            <ProductText>
              {order.product}
            </ProductText>

            <MiniImage
              src={order.image}
              alt={order.product}
            />

          </ProductMini>

        </Header>


        {/* =================================================
            REVIEW LAYOUT
        ================================================= */}

        <Content>


          {/* =================================================
              LEFT INFORMATION
          ================================================= */}

          <InfoPanel>

            <InfoTitle>
              What makes a good review
            </InfoTitle>


            <InfoSection>

              <InfoHeading>
                Have you used this product?
              </InfoHeading>

              <InfoText>
                Your review should be about
                your experience with the product.
              </InfoText>

            </InfoSection>


            <InfoSection>

              <InfoHeading>
                Why review a product?
              </InfoHeading>

              <InfoText>
                Your valuable feedback will
                help fellow shoppers decide!
              </InfoText>

            </InfoSection>


            <InfoSection>

              <InfoHeading>
                How to review a product?
              </InfoHeading>

              <InfoText>
                Your review should include
                facts. An honest opinion is
                always appreciated.
              </InfoText>

            </InfoSection>

          </InfoPanel>


          {/* =================================================
              FORM
          ================================================= */}

          <FormPanel>

            <SectionTitle>
              Rate this product
            </SectionTitle>


            {/* STARS */}

            <RatingRow>

              <Stars>

                {[1, 2, 3, 4, 5].map(
                  (star) => (

                    <StarButton
                      key={star}
                      type="button"
                      onClick={() =>
                        setRating(star)
                      }
                      aria-label={`Rate ${star} out of 5`}
                      whileHover={{
                        scale: 1.12,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                    >

                      <Star
                        $active={
                          star <= rating
                        }
                      >
                        ★
                      </Star>

                    </StarButton>

                  )
                )}

              </Stars>


              <RatingLabel>
                {ratingText[rating]}
              </RatingLabel>

            </RatingRow>


            {/* DIVIDER */}

            <Divider />


            {/* REVIEW */}

            <SectionTitle>
              Review this product
            </SectionTitle>


            <Form
              onSubmit={handleSubmit}
            >

              <FieldBox>

                <FieldLabel>
                  Description
                </FieldLabel>

                <ReviewTextarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  placeholder="Description..."
                />

              </FieldBox>


              <FieldBox>

                <FieldLabel>
                  Title (optional)
                </FieldLabel>

                <TitleInput
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  placeholder="Review title..."
                />

              </FieldBox>


              {/* IMAGE */}

              <ImageUpload>

                <ImageButton
                  type="button"
                  onClick={() =>
                    alert(
                      "Image upload can be connected later."
                    )
                  }
                >
                  📷
                </ImageButton>

              </ImageUpload>


              {/* SUBMIT */}

              <SubmitWrapper>

                <SubmitButton
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  SUBMIT
                </SubmitButton>

              </SubmitWrapper>

            </Form>

          </FormPanel>

        </Content>

      </Main>

    </Page>
  );
};


export default WriteReview;


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

  max-width: 1350px;

  margin: 0 auto;

  padding: 30px 20px 70px;

  box-sizing: border-box;
`;


/* =====================================================
   TOP
===================================================== */

const TopBar = styled.div`
  margin-bottom: 15px;
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


/* =====================================================
   HEADER
===================================================== */

const Header = styled.div`
  min-height: 80px;

  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.08);

  padding: 20px 25px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  box-sizing: border-box;

  @media (max-width: 600px) {
    flex-direction: column;

    align-items: flex-start;
  }
`;


const Title = styled.h1`
  margin: 0;

  color: #123333;

  font-size: 24px;

  font-weight: 600;
`;


const ProductMini = styled.div`
  display: flex;

  align-items: center;

  gap: 15px;
`;


const ProductText = styled.div`
  max-width: 230px;

  color: #123333;

  font-size: 14px;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
`;


const MiniImage = styled.img`
  width: 55px;

  height: 55px;

  object-fit: cover;

  border: 1px solid
    rgba(18, 51, 51, 0.1);
`;


/* =====================================================
   CONTENT
===================================================== */

const Content = styled.div`
  display: grid;

  grid-template-columns:
    300px minmax(0, 1fr);

  gap: 10px;

  margin-top: 10px;

  align-items: stretch;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;


/* =====================================================
   INFO
===================================================== */

const InfoPanel = styled.aside`
  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.09);

  min-height: 500px;
`;


const InfoTitle = styled.h2`
  margin: 0;

  padding: 25px 25px 20px;

  color: #123333;

  font-size: 18px;

  font-weight: 600;

  border-bottom: 1px solid
    rgba(18, 51, 51, 0.1);
`;


const InfoSection = styled.div`
  padding: 20px 25px;

  border-bottom: 1px solid
    rgba(18, 51, 51, 0.08);

  &:last-child {
    border-bottom: none;
  }
`;


const InfoHeading = styled.h3`
  margin: 0 0 12px;

  color: #123333;

  font-size: 16px;

  font-weight: 500;
`;


const InfoText = styled.p`
  margin: 0;

  color: #123333;

  opacity: 0.72;

  font-size: 13px;

  line-height: 1.6;
`;


/* =====================================================
   FORM PANEL
===================================================== */

const FormPanel = styled.section`
  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.09);

  min-width: 0;
`;


const SectionTitle = styled.h2`
  margin: 0;

  padding: 25px;

  color: #123333;

  font-size: 18px;

  font-weight: 600;
`;


/* =====================================================
   RATING
===================================================== */

const RatingRow = styled.div`
  padding: 0 25px 25px;

  display: flex;

  align-items: center;

  gap: 20px;

  flex-wrap: wrap;
`;


const Stars = styled.div`
  display: flex;

  align-items: center;

  gap: 4px;
`;


const StarButton = styled(motion.button)`
  border: none;

  background: transparent;

  padding: 0;

  width: 40px;

  height: 40px;

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;
`;


const Star = styled.span`
  color: ${({ $active }) =>
    $active ? "#159447" : "#d8dddd"};

  font-size: 32px;

  line-height: 1;

  transition:
    color 0.2s ease;
`;


const RatingLabel = styled.span`
  color: ${({ theme }) =>
    theme?.text || "#123333"};

  font-size: 15px;

  font-weight: 600;
`;


const Divider = styled.div`
  border-top: 1px solid
    rgba(18, 51, 51, 0.1);
`;


/* =====================================================
   FORM
===================================================== */

const Form = styled.form`
  width: 100%;
`;


const FieldBox = styled.div`
  margin: 0 25px;

  border: 1px solid
    rgba(18, 51, 51, 0.13);

  &:first-of-type {
    border-radius: 4px 4px 0 0;
  }

  &:nth-of-type(2) {
    border-top: none;

    border-radius: 0 0 4px 4px;
  }
`;


const FieldLabel = styled.label`
  display: block;

  padding: 15px 15px 3px;

  color: #123333;

  font-size: 12px;

  font-weight: 500;
`;


const ReviewTextarea = styled.textarea`
  width: 100%;

  min-height: 155px;

  padding: 3px 15px 15px;

  border: none;

  outline: none;

  resize: vertical;

  box-sizing: border-box;

  background: transparent;

  color: #123333;

  font-family: inherit;

  font-size: 14px;

  line-height: 1.5;

  &::placeholder {
    color: #123333;

    opacity: 0.55;
  }
`;


const TitleInput = styled.input`
  width: 100%;

  height: 48px;

  padding: 3px 15px 12px;

  border: none;

  outline: none;

  box-sizing: border-box;

  background: transparent;

  color: #123333;

  font-family: inherit;

  font-size: 14px;

  &::placeholder {
    color: #123333;

    opacity: 0.55;
  }
`;


/* =====================================================
   IMAGE
===================================================== */

const ImageUpload = styled.div`
  padding: 40px 25px 20px;
`;


const ImageButton = styled.button`
  width: 58px;

  height: 58px;

  border: none;

  background: #e8e8e8;

  color: #123333;

  font-size: 24px;

  cursor: pointer;
`;


/* =====================================================
   SUBMIT
===================================================== */

const SubmitWrapper = styled.div`
  display: flex;

  justify-content: flex-end;

  padding: 0 25px 25px;
`;


const SubmitButton = styled(motion.button)`
  min-width: 200px;

  height: 55px;

  border: none;

  border-radius: 2px;

  background: #123333;

  color: #e8e1d5;

  font-size: 14px;

  font-weight: 700;

  cursor: pointer;

  @media (max-width: 600px) {
    width: 100%;
  }
`;


/* =====================================================
   SUCCESS
===================================================== */

const SuccessBox = styled.div`
  width: min(500px, calc(100% - 30px));

  margin: 120px auto;

  padding: 50px 30px;

  background: #ffffff;

  border: 1px solid
    rgba(18, 51, 51, 0.1);

  text-align: center;

  box-sizing: border-box;
`;


const SuccessIcon = styled.div`
  width: 65px;

  height: 65px;

  margin: 0 auto 20px;

  border-radius: 50%;

  background: #159447;

  color: #ffffff;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 30px;

  font-weight: 700;
`;


const SuccessTitle = styled.h2`
  margin: 0;

  color: #123333;

  font-size: 24px;
`;


const SuccessText = styled.p`
  margin: 10px 0 25px;

  color: #123333;

  opacity: 0.65;

  font-size: 14px;
`;