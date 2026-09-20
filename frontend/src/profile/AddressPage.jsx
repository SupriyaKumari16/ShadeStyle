import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Form from "./Form";

const API_URL = "http://localhost:5000/api/addresses";

const AddressPage = ({ onClose }) => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // =========================
  // MAP BACKEND DATA → FORM DATA
  // =========================

  const mapAddressForFrontend = (address) => ({
    id: address.id,
    name: address.name || "",
    mobile: address.mobile || "",
    pincode: address.pincode || "",
    locality: address.locality || "",
    address: address.address_line || "",
    city: address.city || "",
    state: address.state || "",
    landmark: address.landmark || "",
    altPhone: address.alt_phone || "",
    type:
      address.address_type?.toLowerCase() === "work"
        ? "Work"
        : "Home",
    verified: Boolean(address.verified),
    isAccountDetails: Boolean(address.is_account_details),
  });

  // =========================
  // GET AUTH TOKEN
  // =========================

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // =========================
  // LOAD ADDRESSES
  // =========================

  const loadAddresses = async () => {
    const token = getToken();

    if (!token) {
      navigate("/auth");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Your session has expired. Please login again.");
        navigate("/auth");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch addresses"
        );
      }

      const formattedAddresses = (data.addresses || []).map(
        mapAddressForFrontend
      );

      setAddresses(formattedAddresses);
    } catch (error) {
      console.error("Load addresses error:", error);
      alert("Unable to load your saved addresses.");
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  // =========================
  // SAVE / UPDATE ADDRESS
  // =========================

  const handleSave = async (formData) => {
    const token = getToken();

    if (!token) {
      navigate("/auth");
      return;
    }

    const existingAddress =
      editIndex !== null ? addresses[editIndex] : null;

    const mobileChanged =
      existingAddress &&
      existingAddress.mobile !== formData.mobile;

    const payload = {
      name: formData.name,
      mobile: formData.mobile,
      pincode: formData.pincode,
      locality: formData.locality,
      state: formData.state,
      city: formData.city,
      addressLine: formData.address,
      landmark: formData.landmark,
      altPhone: formData.altPhone,
      addressType: formData.type || "Home",

      // Keep verified status for an unchanged mobile.
      // If mobile is changed from Address Page, require
      // verification again instead of falsely keeping it verified.
      verified: mobileChanged
        ? false
        : Boolean(existingAddress?.verified),

      // Preserve the Account Details marker when editing
      // that same address. New addresses are normal addresses.
      isAccountDetails: Boolean(
        existingAddress?.isAccountDetails
      ),
    };

    try {
      let response;

      // EDIT EXISTING ADDRESS
      if (editIndex !== null) {
        const addressId = addresses[editIndex]?.id;

        if (!addressId) {
          alert("Address ID not found.");
          return;
        }

        response = await fetch(
          `${API_URL}/${addressId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        // ADD NEW ADDRESS
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Your session has expired. Please login again.");
        navigate("/auth");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save address"
        );
      }

      const savedAddress = mapAddressForFrontend(
        data.address
      );

      if (editIndex !== null) {
        const updated = [...addresses];
        updated[editIndex] = savedAddress;
        setAddresses(updated);
      } else {
        setAddresses((prev) => [savedAddress, ...prev]);
      }

      // Keep existing reload signal for other existing components.
      localStorage.setItem(
        "reload_list",
        Date.now().toString()
      );

      setShowForm(false);
      setEditIndex(null);

      alert(
        editIndex !== null
          ? "Address updated successfully!"
          : "Address added successfully!"
      );
    } catch (error) {
      console.error("Save address error:", error);
      alert(
        error.message || "Unable to save address."
      );
    }
  };

  // =========================
  // REMOVE ADDRESS
  // =========================

  const handleRemove = async (index) => {
    const token = getToken();

    if (!token) {
      navigate("/auth");
      return;
    }

    const addressId = addresses[index]?.id;

    if (!addressId) {
      alert("Address ID not found.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${addressId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Your session has expired. Please login again.");
        navigate("/auth");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete address"
        );
      }

      setAddresses((prev) =>
        prev.filter((_, i) => i !== index)
      );

      localStorage.setItem(
        "reload_list",
        Date.now().toString()
      );

      alert("Address removed successfully!");
    } catch (error) {
      console.error("Delete address error:", error);
      alert(
        error.message || "Unable to remove address."
      );
    }
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
                  key={
                    address.id ||
                    `${index}-${address.mobile || ""}`
                  }
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

const EmptyText = styled(motion.p)`
  text-align: center;

  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  font-size: 15px;

  opacity: 0.7;

  margin: 30px 0;
`;

const ListWrapper = styled.div`
  display: flex;

  flex-direction: column;

  gap: 16px;
`;

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

const AddressName = styled.h3`
  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  font-size: 17px;

  font-weight: 700;

  margin: 0 0 7px;
`;

const AddressText = styled.p`
  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  font-size: 14px;

  line-height: 1.5;

  margin: 0 0 8px;

  opacity: 0.9;

  word-break: break-word;
`;

const MobileText = styled.p`
  color: ${({ theme }) =>
    theme.text || "#E8E1D5"};

  font-size: 13px;

  margin: 0;

  line-height: 1.4;
`;

const Verified = styled.span`
  color: #27833f;

  font-weight: 700;

  margin-left: 7px;

  font-size: 12px;
`;

const CardButtons = styled.div`
  display: flex;

  justify-content: space-between;

  gap: 10px;

  margin-top: 15px;
`;

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