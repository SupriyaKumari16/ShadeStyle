import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

import Form from "./Form";

const STORAGE_KEY = "account_details_list";

const AddressPage = ({ onClose }) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // =========================
  // LOAD ADDRESSES
  // =========================

  const loadAddresses = () => {
    const saved =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    setAddresses(saved);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  // =========================
  // SAVE ADDRESS
  // =========================

  const handleSave = (data) => {
    let updated = [...addresses];

    if (editIndex !== null) {
      updated[editIndex] = data;
    } else {
      updated.push(data);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    // Address list reload signal

    localStorage.setItem(
      "reload_list",
      Date.now().toString()
    );

    setAddresses(updated);
    setShowForm(false);
    setEditIndex(null);
  };

  // =========================
  // REMOVE ADDRESS
  // =========================

  const handleRemove = (index) => {
    const updated = addresses.filter(
      (_, i) => i !== index
    );

    setAddresses(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    localStorage.setItem(
      "reload_list",
      Date.now().toString()
    );
  };

  // =========================
  // ADD
  // =========================

  const openAdd = () => {
    setEditIndex(null);
    setShowForm(true);
  };

  // =========================
  // EDIT
  // =========================

  const openEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  // =========================
  // CLOSE
  // =========================

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      window.history.back();
    }
  };

  return (
    <>
      {/* =========================
          WATERMARK BACKGROUND
      ========================= */}

      <Watermark>
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index}>shadestyle</span>
        ))}
      </Watermark>

      {/* =========================
          BACKDROP + MODAL
      ========================= */}

      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.35,
        }}
      >
        <Modal
          initial={{
            scale: 0.85,
            opacity: 0,
            y: 20,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.92,
            opacity: 0,
            y: 15,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* CLOSE */}

          <CloseButton
            onClick={handleClose}
            whileHover={{
              rotate: 90,
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.85,
            }}
          >
            ✕
          </CloseButton>

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
            Saved Addresses
          </Title>

          {/* ADD BUTTON */}

          <AddButton
            whileTap={{
              scale: 0.97,
            }}
            whileHover={{
              y: -2,
            }}
            onClick={openAdd}
          >
            + ADD NEW ADDRESS
          </AddButton>

          {/* EMPTY */}

          {addresses.length === 0 && (
            <EmptyText
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              No saved addresses yet.
            </EmptyText>
          )}

          {/* ADDRESS LIST */}

          <ListWrapper>
            <AnimatePresence mode="popLayout">
              {addresses.map((address, index) => (
                <AddressCard
                  key={`${index}-${address.mobile || ""}`}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -30,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                >
                  <AddressName>
                    {address.name}
                  </AddressName>

                  <AddressText>
                    {address.address}
                  </AddressText>

                  {address.mobile && (
                    <MobileText>
                      Mobile: {address.mobile}

                      {address.verified && (
                        <Verified>
                          ✔ Verified
                        </Verified>
                      )}
                    </MobileText>
                  )}

                  {/* BUTTONS */}

                  <CardButtons>
                    <EditButton
                      onClick={() =>
                        openEdit(index)
                      }
                      whileHover={{
                        scale: 1.04,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                    >
                      EDIT
                    </EditButton>

                    <RemoveButton
                      onClick={() =>
                        handleRemove(index)
                      }
                      whileHover={{
                        scale: 1.04,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                    >
                      REMOVE
                    </RemoveButton>
                  </CardButtons>
                </AddressCard>
              ))}
            </AnimatePresence>
          </ListWrapper>
        </Modal>
      </Overlay>

      {/* =========================
          FORM POPUP
      ========================= */}

      <AnimatePresence>
        {showForm && (
          <Form
            defaultValues={
              editIndex !== null
                ? addresses[editIndex]
                : null
            }
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditIndex(null);
            }}
            verified={
              editIndex !== null
                ? addresses[editIndex]?.verified
                : false
            }
            onChangeMobile={() => {}}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AddressPage;


/* =====================================================
   WATERMARK
===================================================== */

const Watermark = styled.div`
  position: fixed;

  inset: 0;

  z-index: 0;

  pointer-events: none;

  overflow: hidden;

  display: grid;

  grid-template-columns: repeat(4, 1fr);

  grid-auto-rows: 190px;

  align-items: center;

  justify-items: center;

  transform: rotate(-12deg) scale(1.15);

  span {
    font-family: Georgia, serif;

    font-size: 4.3rem;

    font-weight: 600;

    font-style: italic;

    letter-spacing: -3px;

    color: rgba(18, 51, 51, 0.07);

    white-space: nowrap;

    user-select: none;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);

    span {
      font-size: 3.4rem;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);

    grid-auto-rows: 150px;

    span {
      font-size: 2.7rem;
    }
  }
`;


/* =====================================================
   OVERLAY
===================================================== */

const Overlay = styled(motion.div)`
  position: fixed;

  inset: 0;

  width: 100vw;
  height: 100vh;

  /* FORM Jaisa light green */

  background: rgba(241, 245, 242, 0.28);

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  display: flex;

  justify-content: center;
  align-items: center;

  z-index: 9999;

  padding: 20px;

  box-sizing: border-box;
`;


/* =====================================================
   MODAL
===================================================== */

const Modal = styled(motion.div)`
  width: 95%;

  /* PEHLE 420px THA — AB BADA */

  max-width: 650px;

  min-height: 400px;

  background: ${({ theme }) =>
    theme.body || "#082C2C"};

  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border-radius: 26px;

  /* PEHLE 25px THA — AB THODA SPACIOUS */

  padding: 42px 45px;

  position: relative;

  box-shadow:
    0 15px 55px rgba(18, 51, 51, 0.25);

  max-height: 85vh;

  overflow-y: auto;

  box-sizing: border-box;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 700px) {
    width: 94%;

    max-width: 600px;

    min-height: 380px;

    padding: 38px 32px;
  }

  @media (max-width: 600px) {
    width: 95%;

    padding: 35px 23px;

    border-radius: 22px;

    min-height: 350px;
  }

  @media (max-width: 400px) {
    width: 94%;

    padding: 32px 17px;
  }
`;


/* =====================================================
   CLOSE
===================================================== */

const CloseButton = styled(motion.button)`
  position: absolute;

  top: 12px;
  right: 15px;

  width: 38px;
  height: 38px;

  display: flex;

  align-items: center;
  justify-content: center;

  background: ${({ theme }) =>
    theme.grey || "#123F3D"};

  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  border: none;

  font-size: 20px;

  border-radius: 10px;

  cursor: pointer;

  z-index: 5;
`;


/* =====================================================
   TITLE
===================================================== */

const Title = styled(motion.h2)`
  text-align: center;

  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  font-size: 26px;

  font-weight: 700;

  margin: 0 45px 25px;

  line-height: 1.3;

  @media (max-width: 600px) {
    font-size: 21px;

    margin-bottom: 22px;
  }
`;


/* =====================================================
   ADD BUTTON
===================================================== */

const AddButton = styled(motion.button)`
  width: 100%;

  padding: 15px;

  background: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  color: ${({ theme }) =>
    theme.body || "#082C2C"};

  border: none;

  border-radius: 13px;

  cursor: pointer;

  font-weight: 700;

  font-size: 15px;

  margin-bottom: 25px;

  transition: opacity 0.25s ease;

  &:hover {
    opacity: 0.9;
  }
`;


/* =====================================================
   EMPTY
===================================================== */

const EmptyText = styled(motion.p)`
  text-align: center;

  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  font-size: 15px;

  opacity: 0.7;

  margin: 30px 0;
`;


/* =====================================================
   LIST
===================================================== */

const ListWrapper = styled.div`
  display: flex;

  flex-direction: column;

  gap: 16px;
`;


/* =====================================================
   ADDRESS CARD
===================================================== */

const AddressCard = styled(motion.div)`
  background: ${({ theme }) =>
    theme.grey || "#123F3D"};

  padding: 18px;

  border-radius: 15px;

  box-shadow:
    0 4px 12px rgba(18, 51, 51, 0.15);

  border: 1px solid
    ${({ theme }) =>
      theme.textRgba
        ? `rgba(${theme.textRgba}, 0.08)`
        : "rgba(18, 51, 51, 0.08)"};

  box-sizing: border-box;
`;


/* =====================================================
   NAME
===================================================== */

const AddressName = styled.h3`
  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  font-size: 17px;

  font-weight: 700;

  margin: 0 0 7px;
`;


/* =====================================================
   ADDRESS
===================================================== */

const AddressText = styled.p`
  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  font-size: 14px;

  line-height: 1.5;

  margin: 0 0 8px;

  opacity: 0.9;

  word-break: break-word;
`;


/* =====================================================
   MOBILE
===================================================== */

const MobileText = styled.p`
  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  font-size: 13px;

  margin: 0;

  line-height: 1.4;
`;


/* =====================================================
   VERIFIED
===================================================== */

const Verified = styled.span`
  color: #27833f;

  font-weight: 700;

  margin-left: 7px;

  font-size: 12px;
`;


/* =====================================================
   BUTTONS
===================================================== */

const CardButtons = styled.div`
  display: flex;

  justify-content: space-between;

  gap: 10px;

  margin-top: 15px;
`;


/* =====================================================
   EDIT
===================================================== */

const EditButton = styled(motion.button)`
  background: ${({ theme }) =>
    theme.body || "#082C2C"};

  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  border: none;

  padding: 9px 16px;

  border-radius: 10px;

  cursor: pointer;

  font-size: 12px;

  font-weight: 600;

  flex: 1;
`;


/* =====================================================
   REMOVE
===================================================== */

const RemoveButton = styled(motion.button)`
  background: #ffd6d6;

  color: #d83a3a;

  border: none;

  padding: 9px 16px;

  border-radius: 10px;

  cursor: pointer;

  font-size: 12px;

  font-weight: 600;

  flex: 1;
`;