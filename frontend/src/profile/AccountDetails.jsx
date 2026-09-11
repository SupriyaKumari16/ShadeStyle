import React, { useEffect, useState } from "react";
import Form from "./Form";
import OTPPopup from "./OTPPopup";

const STORAGE_KEY = "account_details_list";

const AccountDetails = ({ onClose }) => {
  const [formData, setFormData] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // =========================
  // LOAD SAVED DATA
  // =========================

  useEffect(() => {
    const savedList =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const index = localStorage.getItem("edit_index");

    if (index !== null) {
      const selectedIndex = Number(index);

      setEditIndex(selectedIndex);
      setFormData(savedList[selectedIndex] || null);

      localStorage.removeItem("edit_index");
    } else if (savedList.length > 0) {
      setFormData(savedList[savedList.length - 1]);
    }
  }, []);

  // =========================
  // SAVE DATA
  // =========================

  const saveData = (data) => {
    let list =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (editIndex !== null) {
      list[editIndex] = data;
      setEditIndex(null);
    } else {
      list.push(data);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(list)
    );

    // AddressPage ko reload/update signal
    localStorage.setItem(
      "reload_list",
      Date.now().toString()
    );

    setFormData(data);
  };

  // =========================
  // FORM → OTP
  // =========================

  const handleFormSave = (data) => {
    const newData =
      formData && formData.mobile !== data.mobile
        ? {
            ...data,
            verified: false,
          }
        : {
            ...data,
            verified: formData?.verified || false,
          };

    setFormData(newData);

    setShowForm(false);
    setShowOtp(true);
  };

  // =========================
  // OTP VERIFIED
  // =========================

  const handleOtpVerified = () => {
    const verifiedData = {
      ...formData,
      verified: true,
    };

    saveData(verifiedData);

    setShowOtp(false);
    setShowForm(true);
  };

  // =========================
  // CHANGE MOBILE
  // =========================

  const handleChangeMobile = () => {
    setFormData({
      ...formData,
      verified: false,
    });

    setShowForm(false);
    setShowOtp(true);
  };

  // =========================
  // CANCEL
  // =========================

  const handleFormCancel = () => {
    if (onClose) {
      onClose();
    } else {
      window.history.back();
    }
  };

  return (
    <>
      {/* FORM */}
      {showForm && (
        <Form
          onSave={handleFormSave}
          onCancel={handleFormCancel}
          defaultValues={formData}
          verified={formData?.verified}
          onChangeMobile={handleChangeMobile}
        />
      )}

      {/* OTP */}
      {showOtp && (
        <OTPPopup
          phone={formData?.mobile}
          onClose={() => setShowOtp(false)}
          onVerified={handleOtpVerified}
        />
      )}
    </>
  );
};

export default AccountDetails;