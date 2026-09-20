import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import loginImage from "../assets/login/Modern.png";

const Login = ({ onSwitch }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // FORM STATES
  // =========================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // LOGIN
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // =========================
      // SAVE AUTH DATA
      // =========================

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      console.log("Login successful:", data);

      alert("Login successful!");

      // =========================
      // GO TO HOME
      // =========================

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      alert("Unable to connect to server");
    }
  };

  return (
    <Page>
      {/* ================= IMAGE ================= */}

      <ImageSection>
        <Image
          src={loginImage}
          alt="ShadeStyle fashion"
          initial={{
            scale: 1.08,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <ImageOverlay />

        <ImageContent
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <SmallText>WELCOME BACK</SmallText>

          <ImageTitle>
            Your style.
            <br />
            Your story.
          </ImageTitle>

          <ImageDescription>
            Discover looks that feel like you.
          </ImageDescription>
        </ImageContent>
      </ImageSection>

      {/* ================= FORM ================= */}

      <FormSection>
        <FormWrapper>
          <Logo
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
          >
            Shade<span>Style</span>
          </Logo>

          <Heading
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.5,
            }}
          >
            Welcome back
          </Heading>

          <Subtitle
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.5,
            }}
          >
            Sign in to continue your style journey.
          </Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Email Address</Label>

              <Input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                whileFocus={{
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.2,
                }}
                type="email"
                placeholder="Enter your email"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Password</Label>

              <PasswordWrapper>
                <Input
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  whileFocus={{
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  required
                />

                <ShowButton
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </ShowButton>
              </PasswordWrapper>
            </InputGroup>

            <ForgotPassword
              type="button"
              onClick={() =>
                console.log("Forgot password")
              }
            >
              Forgot Password?
            </ForgotPassword>

            <SubmitButton
              type="submit"
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              Login
              <Arrow>→</Arrow>
            </SubmitButton>
          </Form>

          <SwitchText>
            Don't have an account?{" "}
            <SwitchButton onClick={onSwitch}>
              Sign Up
            </SwitchButton>
          </SwitchText>
        </FormWrapper>
      </FormSection>
    </Page>
  );
};

export default Login;

// =====================================================
// STYLES
// =====================================================

const Page = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  /* =====================================================
     TABLET — 768px TO 1024px
     KEEP SIDE-BY-SIDE
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: row;

    height: 100%;
  }

  /* =====================================================
     MOBILE — BELOW 768px
  ===================================================== */

  @media (max-width: 767px) {
    flex-direction: column;

    height: auto;

    min-height: 100%;
  }
`;

// =====================================================
// IMAGE SECTION
// =====================================================

const ImageSection = styled.div`
  position: relative;

  width: 50%;

  overflow: hidden;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 42%;

    height: 100%;

    flex-shrink: 0;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    width: 100%;

    height: 280px;

    flex-shrink: 0;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    height: 230px;
  }
`;

const Image = styled(motion.img)`
  width: 100%;

  height: 100%;

  object-fit: cover;

  display: block;
`;

const ImageOverlay = styled.div`
  position: absolute;

  inset: 0;

  background: linear-gradient(
    to top,
    rgba(8, 44, 44, 0.75),
    rgba(8, 44, 44, 0.05)
  );
`;

const ImageContent = styled(motion.div)`
  position: absolute;

  bottom: 45px;

  left: 45px;

  right: 30px;

  color: #f1f5f2;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    bottom: 30px;

    left: 28px;

    right: 20px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    bottom: 25px;

    left: 25px;

    right: 20px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    bottom: 20px;

    left: 18px;

    right: 15px;
  }
`;

const SmallText = styled.p`
  font-size: 11px;

  letter-spacing: 4px;

  margin-bottom: 15px;

  opacity: 0.8;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 9px;

    letter-spacing: 3px;

    margin-bottom: 12px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    font-size: 9px;

    letter-spacing: 3px;

    margin-bottom: 10px;
  }
`;

const ImageTitle = styled.h2`
  font-family: Georgia, serif;

  font-size: 38px;

  line-height: 1.15;

  font-weight: 400;

  margin: 0 0 15px;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 28px;

    margin-bottom: 12px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    font-size: 28px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    font-size: 24px;

    margin-bottom: 10px;
  }
`;

const ImageDescription = styled.p`
  font-size: 14px;

  opacity: 0.85;

  margin: 0;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 12px;

    line-height: 1.4;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// =====================================================
// FORM SECTION
// =====================================================

const FormSection = styled.div`
  width: 50%;

  display: flex;

  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.body};

  padding: 45px;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 58%;

    height: 100%;

    padding: 28px 30px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    width: 100%;

    padding: 40px 30px 45px;

    box-sizing: border-box;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    padding: 32px 18px 35px;
  }
`;

// =====================================================
// FORM WRAPPER
// =====================================================

const FormWrapper = styled.div`
  width: 100%;

  max-width: 360px;

  text-align: center;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 310px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    max-width: 430px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

// =====================================================
// LOGO
// =====================================================

const Logo = styled(motion.h1)`
  font-family: Georgia, serif;

  font-size: 30px;

  font-weight: 600;

  color: ${({ theme }) => theme.text};

  margin: 0 0 35px;

  span {
    font-style: italic;

    font-weight: 400;
  }

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 25px;

    margin-bottom: 20px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    font-size: 27px;

    margin-bottom: 28px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    font-size: 24px;

    margin-bottom: 24px;
  }
`;

// =====================================================
// HEADING
// =====================================================

const Heading = styled(motion.h2)`
  font-size: 28px;

  font-weight: 600;

  color: ${({ theme }) => theme.text};

  margin: 0 0 10px;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 24px;

    margin-bottom: 7px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    font-size: 25px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

// =====================================================
// SUBTITLE
// =====================================================

const Subtitle = styled(motion.p)`
  font-size: 14px;

  color: ${({ theme }) => theme.text};

  opacity: 0.6;

  margin: 0 0 30px;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 12px;

    line-height: 1.4;

    margin-bottom: 20px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    font-size: 13px;

    margin-bottom: 25px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    font-size: 12px;

    line-height: 1.5;

    margin-bottom: 22px;
  }
`;

// =====================================================
// FORM
// =====================================================

const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: 20px;

  text-align: left;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 12px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    gap: 17px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

// =====================================================
// INPUT GROUP
// =====================================================

const InputGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 8px;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 5px;
  }
`;

// =====================================================
// LABEL
// =====================================================

const Label = styled.label`
  font-size: 13px;

  font-weight: 500;

  color: ${({ theme }) => theme.text};

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 11px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// =====================================================
// INPUT
// =====================================================

const Input = styled(motion.input)`
  width: 100%;

  box-sizing: border-box;

  padding: 14px 16px;

  border: 1px solid ${({ theme }) => theme.grey};

  border-radius: 10px;

  background: ${({ theme }) => theme.body};

  color: ${({ theme }) => theme.text};

  font-size: 14px;

  outline: none;

  transition: 0.3s;

  &::placeholder {
    color: ${({ theme }) => theme.text};

    opacity: 0.4;
  }

  &:focus {
    border-color: ${({ theme }) => theme.text};

    box-shadow:
      0 0 0 3px
      rgba(18, 51, 51, 0.08);
  }

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 11px 13px;

    font-size: 12px;

    border-radius: 8px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    padding: 13px 14px;

    font-size: 13px;
  }
`;

// =====================================================
// PASSWORD
// =====================================================

const PasswordWrapper = styled.div`
  position: relative;

  width: 100%;

  input {
    padding-right: 60px;
  }

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    input {
      padding-right: 52px;
    }
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    input {
      padding-right: 55px;
    }
  }
`;

const ShowButton = styled.button`
  position: absolute;

  right: 12px;

  top: 50%;

  transform: translateY(-50%);

  border: none;

  background: transparent;

  color: ${({ theme }) => theme.text};

  opacity: 0.6;

  font-size: 12px;

  cursor: pointer;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    right: 9px;

    font-size: 10px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    right: 10px;

    font-size: 11px;
  }
`;

// =====================================================
// FORGOT PASSWORD
// =====================================================

const ForgotPassword = styled.button`
  align-self: flex-end;

  border: none;

  background: transparent;

  color: ${({ theme }) => theme.text};

  opacity: 0.7;

  font-size: 12px;

  cursor: pointer;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 10px;
  }

  &:hover {
    opacity: 1;
  }
`;

// =====================================================
// SUBMIT BUTTON
// =====================================================

const SubmitButton = styled(motion.button)`
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 15px;

  width: 100%;

  padding: 15px;

  border: none;

  border-radius: 10px;

  background: ${({ theme }) => theme.text};

  color: ${({ theme }) => theme.body};

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;

  box-shadow:
    0 8px 20px
    rgba(18, 51, 51, 0.15);

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 11px;

    border-radius: 8px;

    font-size: 12px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    padding: 14px;

    font-size: 13px;
  }
`;

const Arrow = styled.span`
  font-size: 18px;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
`;

// =====================================================
// SWITCH TEXT
// =====================================================

const SwitchText = styled.p`
  margin-top: 30px;

  font-size: 13px;

  color: ${({ theme }) => theme.text};

  opacity: 0.7;

  /* =====================================================
     TABLET
  ===================================================== */

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-top: 16px;

    font-size: 11px;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 767px) {
    margin-top: 25px;
  }

  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 480px) {
    margin-top: 22px;

    font-size: 12px;
  }
`;

const SwitchButton = styled.button`
  border: none;

  background: transparent;

  color: ${({ theme }) => theme.text};

  font-weight: 600;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;