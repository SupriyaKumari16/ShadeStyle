import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import signupImage from "../assets/signup/simple.png";

const Signup = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Signup submitted");
  };

  return (
    <Page>

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
            Create your account
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
            Start your style journey with us.
          </Subtitle>

          <Form onSubmit={handleSubmit}>

            <InputGroup>
              <Label>Full Name</Label>

              <Input
                whileFocus={{
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.2,
                }}
                type="text"
                placeholder="Enter your full name"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Email Address</Label>

              <Input
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
                  placeholder="Create a password"
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

            <InputGroup>
              <Label>
                Confirm Password
              </Label>

              <PasswordWrapper>

                <Input
                  whileFocus={{
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  required
                />

                <ShowButton
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </ShowButton>

              </PasswordWrapper>
            </InputGroup>

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
              Create Account

              <Arrow>→</Arrow>
            </SubmitButton>

          </Form>

          <SwitchText>
            Already have an account?{" "}
            <SwitchButton onClick={onSwitch}>
              Login
            </SwitchButton>
          </SwitchText>

        </FormWrapper>
      </FormSection>

      {/* ================= IMAGE ================= */}

      <ImageSection>

        <Image
          src={signupImage}
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
          <SmallText>
            FIND YOUR STYLE
          </SmallText>

          <ImageTitle>
            Dress the
            <br />
            way you feel.
          </ImageTitle>

          <ImageDescription>
            Create an account and explore your style.
          </ImageDescription>
        </ImageContent>

      </ImageSection>

    </Page>
  );
};

export default Signup;

// ================= STYLES =================

const Page = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;

    height: auto;
  }
`;

const FormSection = styled.div`
  width: 50%;

  display: flex;

  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.body};

  padding: 45px;

  @media (max-width: 768px) {
    width: 100%;

    padding: 35px 25px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;

  max-width: 360px;

  text-align: center;
`;

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
`;

const Heading = styled(motion.h2)`
  font-size: 28px;

  font-weight: 600;

  color: ${({ theme }) => theme.text};

  margin: 0 0 10px;
`;

const Subtitle = styled(motion.p)`
  font-size: 14px;

  color: ${({ theme }) => theme.text};

  opacity: 0.6;

  margin: 0 0 30px;
`;

const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: 16px;

  text-align: left;
`;

const InputGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;

  font-weight: 500;

  color: ${({ theme }) => theme.text};
`;

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
`;

const PasswordWrapper = styled.div`
  position: relative;

  input {
    padding-right: 60px;
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
`;

const SubmitButton = styled(motion.button)`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 15px;

  width: 100%;

  padding: 15px;

  margin-top: 5px;

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
`;

const Arrow = styled.span`
  font-size: 18px;
`;

const SwitchText = styled.p`
  margin-top: 25px;

  font-size: 13px;

  color: ${({ theme }) => theme.text};

  opacity: 0.7;
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

const ImageSection = styled.div`
  position: relative;

  width: 50%;

  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;

    height: 260px;
  }
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;

  object-fit: cover;
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

  @media (max-width: 768px) {
    bottom: 25px;

    left: 25px;
  }
`;

const SmallText = styled.p`
  font-size: 11px;

  letter-spacing: 4px;

  margin-bottom: 15px;

  opacity: 0.8;
`;

const ImageTitle = styled.h2`
  font-family: Georgia, serif;

  font-size: 38px;

  line-height: 1.15;

  font-weight: 400;

  margin: 0 0 15px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ImageDescription = styled.p`
  font-size: 14px;

  opacity: 0.85;

  margin: 0;
`;