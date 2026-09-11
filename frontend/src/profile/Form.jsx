import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Form = ({
  onSave,
  onCancel,
  defaultValues,
  verified,
  onChangeMobile,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    altPhone: "",
    type: "Home",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        name: defaultValues.name || "",
        mobile: defaultValues.mobile || "",
        pincode: defaultValues.pincode || "",
        locality: defaultValues.locality || "",
        address: defaultValues.address || "",
        city: defaultValues.city || "",
        state: defaultValues.state || "",
        landmark: defaultValues.landmark || "",
        altPhone: defaultValues.altPhone || "",
        type: defaultValues.type || "Home",
      });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.mobile.trim() ||
      !formData.address.trim()
    ) {
      alert("⚠ Please fill required fields!");
      return;
    }

    onSave(formData);
  };

  const title = defaultValues
    ? "Edit Details"
    : "Add Details";

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ModalBox
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.94,
          y: 15,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* BACK BUTTON */}

        <BackButton
          type="button"
          onClick={onCancel}
          whileHover={{
            x: -3,
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.85,
          }}
        >
          ←
        </BackButton>

        {/* TITLE */}

        <Title
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            delay: 0.1,
          }}
        >
          {title}
        </Title>

        <FormElement onSubmit={handleSubmit}>

          {/* NAME */}

          <InputGroup
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.15,
            }}
          >
            <Label>Name</Label>

            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </InputGroup>

          {/* MOBILE */}

          <InputGroup
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.2,
            }}
          >
            <Label>
              Mobile Number

              {verified && (
                <Verified>
                  ✔ Verified
                </Verified>
              )}
            </Label>

            <Input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              inputMode="numeric"
              autoComplete="tel"
            />

            {verified && (
              <ChangeButton
                type="button"
                onClick={onChangeMobile}
                whileTap={{
                  scale: 0.95,
                }}
              >
                Change
              </ChangeButton>
            )}
          </InputGroup>

          {/* PINCODE */}

          <InputGroup
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.25,
            }}
          >
            <Label>Pincode</Label>

            <Input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              inputMode="numeric"
            />
          </InputGroup>

          {/* LOCALITY */}

          <InputGroup
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.3,
            }}
          >
            <Label>Locality</Label>

            <Input
              name="locality"
              value={formData.locality}
              onChange={handleChange}
            />
          </InputGroup>

          {/* ADDRESS */}

          <InputGroup
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.35,
            }}
          >
            <Label>Address</Label>

            <Textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </InputGroup>

          {/* CITY + STATE */}

          <InputRow
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.4,
            }}
          >
            <InputGroup>
              <Label>City</Label>

              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label>State</Label>

              <Select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">--Select--</option>
                <option>Bihar</option>
                <option>Jharkhand</option>
                <option>UP</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
              </Select>
            </InputGroup>
          </InputRow>

          {/* SAVE */}

          <ButtonWrapper
            whileTap={{
              scale: 0.97,
            }}
          >
            <SaveButton type="submit">
              SAVE DETAILS
            </SaveButton>
          </ButtonWrapper>

        </FormElement>
      </ModalBox>
    </Overlay>
  );
};

export default Form;

/* =====================================================
   OVERLAY
===================================================== */

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(8, 44, 44, 0.35);

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;

  padding: 20px;
  box-sizing: border-box;

  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 15px;
    align-items: center;
  }
`;

/* =====================================================
   MODAL
===================================================== */

const ModalBox = styled(motion.div)`
  width: 95%;
  max-width: 420px;

  max-height: 92vh;
  overflow-y: auto;

  background: ${({ theme }) =>
    theme.body || "#F1F5F2"};

  color: ${({ theme }) =>
    theme.text || "#123333"};

  padding: 28px;

  border-radius: 18px;

  position: relative;

  box-shadow:
    0 8px 28px rgba(18, 51, 51, 0.2);

  box-sizing: border-box;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 600px) {
    width: 95%;
    padding: 26px 22px;
    border-radius: 17px;
    max-height: 90vh;
  }

  @media (max-width: 400px) {
    padding: 25px 18px;
  }
`;

/* =====================================================
   BACK BUTTON
===================================================== */

const BackButton = styled(motion.button)`
  position: absolute;

  left: 12px;
  top: 12px;

  background: transparent;

  border: none;

  color: ${({ theme }) =>
    theme.text || "#123333"};

  font-size: 26px;

  cursor: pointer;

  padding: 2px 6px;

  z-index: 2;
`;

/* =====================================================
   TITLE
===================================================== */

const Title = styled(motion.h2)`
  text-align: center;

  color: ${({ theme }) =>
    theme.text || "#123333"};

  font-size: 20px;

  font-weight: 600;

  margin: 0 30px 18px;

  line-height: 1.3;
`;

/* =====================================================
   FORM
===================================================== */

const FormElement = styled.form`
  width: 100%;
`;

/* =====================================================
   INPUT GROUP
===================================================== */

const InputGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;

  margin-bottom: 14px;

  min-width: 0;
`;

/* =====================================================
   LABEL
===================================================== */

const Label = styled.label`
  color: ${({ theme }) =>
    theme.text || "#123333"};

  font-size: 14px;

  margin-bottom: 5px;

  font-weight: 500;
`;

/* =====================================================
   INPUT
===================================================== */

const Input = styled.input`
  width: 100%;

  padding: 12px;

  border: 1px solid
    ${({ theme }) =>
      theme.grey || "#D2E0DC"};

  border-radius: 10px;

  font-size: 14px;

  color: ${({ theme }) =>
    theme.text || "#123333"};

  background: ${({ theme }) =>
    theme.body || "#F1F5F2"};

  outline: none;

  box-sizing: border-box;

  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:focus {
    border-color: ${({ theme }) =>
      theme.text || "#123333"};

    box-shadow:
      0 0 0 3px
      ${({ theme }) =>
        theme.textRgba
          ? `rgba(${theme.textRgba}, 0.08)`
          : "rgba(18, 51, 51, 0.08)"};
  }

  &::placeholder {
    color: ${({ theme }) =>
      theme.textRgba
        ? `rgba(${theme.textRgba}, 0.45)`
        : "rgba(18, 51, 51, 0.45)"};
  }
`;

/* =====================================================
   TEXTAREA
===================================================== */

const Textarea = styled.textarea`
  width: 100%;

  height: 80px;

  padding: 12px;

  border: 1px solid
    ${({ theme }) =>
      theme.grey || "#D2E0DC"};

  border-radius: 10px;

  font-size: 14px;

  color: ${({ theme }) =>
    theme.text || "#123333"};

  background: ${({ theme }) =>
    theme.body || "#F1F5F2"};

  outline: none;

  resize: none;

  box-sizing: border-box;

  font-family: inherit;

  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:focus {
    border-color: ${({ theme }) =>
      theme.text || "#123333"};

    box-shadow:
      0 0 0 3px
      ${({ theme }) =>
        theme.textRgba
          ? `rgba(${theme.textRgba}, 0.08)`
          : "rgba(18, 51, 51, 0.08)"};
  }
`;

/* =====================================================
   CITY + STATE ROW
===================================================== */

const InputRow = styled(motion.div)`
  display: flex;

  gap: 12px;

  width: 100%;

  .input-group {
    flex: 1;
  }

  @media (max-width: 420px) {
    flex-direction: column;
    gap: 0;
  }
`;

/* =====================================================
   SELECT
===================================================== */

const Select = styled.select`
  width: 100%;

  padding: 12px;

  border: 1px solid
    ${({ theme }) =>
      theme.grey || "#D2E0DC"};

  border-radius: 10px;

  font-size: 14px;

  color: ${({ theme }) =>
    theme.text || "#123333"};

  background: ${({ theme }) =>
    theme.body || "#F1F5F2"};

  outline: none;

  box-sizing: border-box;

  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) =>
      theme.text || "#123333"};
  }
`;

/* =====================================================
   VERIFIED
===================================================== */

const Verified = styled.span`
  color: #27833f;

  font-weight: 700;

  margin-left: 8px;

  font-size: 13px;
`;

/* =====================================================
   CHANGE MOBILE
===================================================== */

const ChangeButton = styled(motion.button)`
  align-self: flex-start;

  margin-top: 6px;

  padding: 6px 12px;

  font-size: 12px;

  color: ${({ theme }) =>
    theme.text || "#123333"};

  background: ${({ theme }) =>
    theme.grey || "#D2E0DC"};

  border: none;

  border-radius: 6px;

  cursor: pointer;
`;

/* =====================================================
   SAVE BUTTON WRAPPER
===================================================== */

const ButtonWrapper = styled(motion.div)`
  width: 100%;

  margin-top: 18px;
`;

/* =====================================================
   SAVE BUTTON
===================================================== */

const SaveButton = styled.button`
  width: 100%;

  background: ${({ theme }) =>
    theme.text || "#123333"};

  color: ${({ theme }) =>
    theme.body || "#F1F5F2"};

  padding: 14px;

  border-radius: 12px;

  border: none;

  font-size: 15px;

  cursor: pointer;

  font-weight: 600;

  transition:
    transform 0.25s ease,
    opacity 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    opacity: 0.92;

    box-shadow:
      0 6px 18px
      ${({ theme }) =>
        theme.textRgba
          ? `rgba(${theme.textRgba}, 0.18)`
          : "rgba(18, 51, 51, 0.18)"};
  }
`;