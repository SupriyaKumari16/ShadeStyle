import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import loginImage from "../assets/login/Modern.png";

const Login = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Yaha apna login API lagana
    console.log("Login submitted");
  };

  return (
    <Page>
      {/* ================= IMAGE ================= */}

      <ImageSection>
        <Image
          src={loginImage}
          alt="ShadeStyle fashion"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />

        <ImageOverlay />

        <ImageContent
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
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
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shade<span>Style</span>
          </Logo>

          <Heading
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Welcome back
          </Heading>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Sign in to continue your style journey.
          </Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Email Address</Label>

              <Input
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="email"
                placeholder="Enter your email"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Password</Label>

              <PasswordWrapper>
                <Input
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />

                <ShowButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </ShowButton>
              </PasswordWrapper>
            </InputGroup>

            <ForgotPassword
              type="button"
              onClick={() => console.log("Forgot password")}
            >
              Forgot Password?
            </ForgotPassword>

            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
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
  gap: 20px;

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
    box-shadow: 0 0 0 3px rgba(18, 51, 51, 0.08);
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

const ForgotPassword = styled.button`
  align-self: flex-end;

  border: none;
  background: transparent;

  color: ${({ theme }) => theme.text};
  opacity: 0.7;

  font-size: 12px;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

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

  box-shadow: 0 8px 20px rgba(18, 51, 51, 0.15);
`;

const Arrow = styled.span`
  font-size: 18px;
`;

const SwitchText = styled.p`
  margin-top: 30px;

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