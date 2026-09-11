import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyAccount = () => {
  const navigate = useNavigate();

  return (
    <Page>
      {/* Watermark Background */}
      <Watermark>
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index}>shadestyle</span>
        ))}
      </Watermark>

      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <AccountBox
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <CloseButton
            onClick={() => navigate(-1)}
            whileHover={{
              rotate: 90,
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.9,
            }}
          >
            ✕
          </CloseButton>

          <Title
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >
            Manage Your Account
          </Title>

          <BoxWrapper>
            <AccountOption
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => navigate("/account/details")}
            >
              <BoxIcon>👤</BoxIcon>

              <BoxTitle>Account Details</BoxTitle>

              <BoxText>
                Manage your personal information
              </BoxText>
            </AccountOption>

            <AccountOption
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => navigate("/account/addresses")}
            >
              <BoxIcon>📍</BoxIcon>

              <BoxTitle>Addresses</BoxTitle>

              <BoxText>
                Manage your saved delivery addresses
              </BoxText>
            </AccountOption>
          </BoxWrapper>
        </AccountBox>
      </Overlay>
    </Page>
  );
};

export default MyAccount;


/* =====================================================
   PAGE
===================================================== */

const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;

  background: #f1f5f2;

  display: flex;
  align-items: center;
  justify-content: center;
`;


/* =====================================================
   WATERMARK
===================================================== */

const Watermark = styled.div`
  position: fixed;
  inset: 0;

  z-index: 0;

  overflow: hidden;
  pointer-events: none;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 190px;

  align-items: center;
  justify-items: center;

  transform: rotate(-12deg) scale(1.15);

  span {
    font-family: Georgia, serif;
    font-size: 4.5rem;
    font-weight: 600;
    font-style: italic;
    letter-spacing: -3px;

    color: rgba(18, 51, 51, 0.075);

    white-space: nowrap;
    user-select: none;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);

    span {
      font-size: 3.5rem;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 150px;

    span {
      font-size: 2.8rem;
    }
  }
`;


/* =====================================================
   OVERLAY
===================================================== */

const Overlay = styled(motion.div)`
  position: relative;

  z-index: 2;

  min-height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px 20px;

  background: rgba(241, 245, 242, 0.35);

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  box-sizing: border-box;
`;


/* =====================================================
   ACCOUNT BOX
===================================================== */

const AccountBox = styled(motion.div)`
  position: relative;

  width: min(760px, 90vw);
  min-height: 430px;

  padding: 55px 60px 60px;

  box-sizing: border-box;

  border-radius: 28px;

  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};

  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 25px 70px rgba(0, 0, 0, 0.18),
    0 8px 25px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow: hidden;

  @media (max-width: 767px) {
    width: min(650px, 94vw);
    min-height: 420px;

    padding: 50px 35px;
  }

  @media (max-width: 600px) {
    width: 94vw;
    min-height: auto;

    padding: 48px 22px 35px;

    border-radius: 24px;
  }

  @media (max-width: 400px) {
    padding: 45px 17px 30px;
  }
`;


/* =====================================================
   CLOSE BUTTON
===================================================== */

const CloseButton = styled(motion.button)`
  position: absolute;

  top: 15px;
  right: 15px;

  width: 42px;
  height: 42px;

  border: none;
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.08);

  color: ${({ theme }) => theme.text};

  font-size: 20px;
  font-weight: 300;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(6px);

  transition: background 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
  }
`;


/* =====================================================
   TITLE
===================================================== */

const Title = styled(motion.h2)`
  margin: 0 0 45px;

  text-align: center;

  font-size: clamp(1.7rem, 3vw, 2.5rem);

  font-weight: 700;

  letter-spacing: -0.5px;

  color: ${({ theme }) => theme.text};

  @media (max-width: 600px) {
    margin-bottom: 32px;
    font-size: 1.7rem;
  }
`;


/* =====================================================
   BOX WRAPPER
===================================================== */

const BoxWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 30px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;

    gap: 18px;
  }
`;


/* =====================================================
   ACCOUNT OPTION
===================================================== */

const AccountOption = styled(motion.div)`
  min-height: 205px;

  padding: 35px 25px;

  box-sizing: border-box;

  border-radius: 22px;

  background: ${({ theme }) => theme.grey};

  border: 1px solid rgba(255, 255, 255, 0.06);

  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.12);

  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  transition:
    box-shadow 0.3s ease,
    background 0.3s ease;

  &:hover {
    box-shadow:
      0 18px 38px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 600px) {
    min-height: 160px;
    padding: 25px 20px;
  }
`;


/* =====================================================
   ICON
===================================================== */

const BoxIcon = styled.div`
  font-size: 3.3rem;

  margin-bottom: 15px;

  line-height: 1;

  @media (max-width: 600px) {
    font-size: 2.7rem;
  }
`;


/* =====================================================
   TITLE
===================================================== */

const BoxTitle = styled.div`
  font-size: 1.25rem;

  font-weight: 700;

  color: ${({ theme }) => theme.text};

  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;


/* =====================================================
   DESCRIPTION
===================================================== */

const BoxText = styled.div`
  max-width: 230px;

  font-size: 0.85rem;

  line-height: 1.5;

  color: ${({ theme }) => theme.text};

  opacity: 0.7;
`;