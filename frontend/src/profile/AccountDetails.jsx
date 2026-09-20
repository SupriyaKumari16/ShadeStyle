import React, { useEffect, useState } from "react";
import Form from "./Form";

const API_BASE = "http://localhost:5000/api";

const AccountDetails = ({ onClose }) => {
  const [formData, setFormData] = useState(null);
  const [savedAddress, setSavedAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // GET TOKEN
  // =========================

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // =========================
  // LOAD ACCOUNT DETAILS
  // =========================

  useEffect(() => {
    const loadAccountDetails = async () => {
      try {
        const token = getToken();

        if (!token) {
          alert("Please login first");

          if (onClose) {
            onClose();
          }

          return;
        }

        const [accountResponse, addressResponse] =
          await Promise.all([
            fetch(`${API_BASE}/account`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),

            fetch(`${API_BASE}/addresses`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        const accountData = await accountResponse.json();
        const addressData = await addressResponse.json();

        if (!accountResponse.ok) {
          throw new Error(
            accountData.message || "Failed to load account"
          );
        }

        if (!addressResponse.ok) {
          throw new Error(
            addressData.message || "Failed to load addresses"
          );
        }

        // =========================
        // FIND ACCOUNT DETAILS ADDRESS
        // =========================

        const accountAddress =
          addressData.addresses?.find(
            (address) =>
              address.is_account_details === true
          ) || null;

        setSavedAddress(accountAddress);

        // =========================
        // EXISTING ACCOUNT DETAILS
        // =========================

        if (accountAddress) {
          setFormData({
            name: accountAddress.name || "",
            mobile: accountAddress.mobile || "",
            pincode: accountAddress.pincode || "",
            locality: accountAddress.locality || "",
            address: accountAddress.address_line || "",
            city: accountAddress.city || "",
            state: accountAddress.state || "",
            landmark: accountAddress.landmark || "",
            altPhone: accountAddress.alt_phone || "",
            type: accountAddress.address_type || "Home",
            verified: accountAddress.verified || false,
          });
        }

        // =========================
        // FIRST TIME ACCOUNT DETAILS
        // =========================

        else {
          setFormData({
            name: accountData.user?.name || "",
            mobile: accountData.user?.mobile || "",
            pincode: "",
            locality: "",
            address: "",
            city: "",
            state: "",
            landmark: "",
            altPhone: "",
            type: "Home",
            verified: false,
          });
        }
      } catch (error) {
        console.error(
          "Load account details error:",
          error
        );

        alert(
          error.message ||
            "Failed to load account details"
        );
      } finally {
        setLoading(false);
      }
    };

    loadAccountDetails();
  }, [onClose]);

  // =========================
  // FORM SAVE
  // =========================

  const handleFormSave = (data) => {
    /*
      OTP has been removed.

      If the existing mobile number is already verified
      and the user has not changed it, keep it verified.

      If this is a new mobile number or first-time save,
      save it as unverified.
    */

    const sameMobile =
      savedAddress &&
      savedAddress.mobile === data.mobile;

    const verified =
      sameMobile &&
      savedAddress?.verified === true;

    saveDetailsToBackend(data, verified);
  };

  // =========================
  // SAVE DETAILS TO BACKEND
  // =========================

  const saveDetailsToBackend = async (
    data,
    verified = false
  ) => {
    try {
      const token = getToken();

      if (!token) {
        alert("Please login first");
        return;
      }

      // =========================
      // ADDRESS PAYLOAD
      // =========================

      const addressPayload = {
        name: data.name,
        mobile: data.mobile,
        pincode: data.pincode,
        locality: data.locality,
        state: data.state,
        city: data.city,
        addressLine: data.address,
        landmark: data.landmark,
        altPhone: data.altPhone,
        addressType: data.type || "Home",

        verified,
        isAccountDetails: true,
      };

      let addressResponse;

      // =========================
      // UPDATE EXISTING ADDRESS
      // =========================

      if (savedAddress?.id) {
        addressResponse = await fetch(
          `${API_BASE}/addresses/${savedAddress.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(addressPayload),
          }
        );
      }

      // =========================
      // CREATE NEW ADDRESS
      // =========================

      else {
        addressResponse = await fetch(
          `${API_BASE}/addresses`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(addressPayload),
          }
        );
      }

      const addressResult =
        await addressResponse.json();

      if (!addressResponse.ok) {
        throw new Error(
          addressResult.message ||
            "Failed to save address"
        );
      }

      // =========================
      // UPDATE USER ACCOUNT
      // =========================

      const accountResponse = await fetch(
        `${API_BASE}/account`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: data.name,
            mobile: data.mobile,
          }),
        }
      );

      const accountResult =
        await accountResponse.json();

      if (!accountResponse.ok) {
        throw new Error(
          accountResult.message ||
            "Failed to update account"
        );
      }

      // =========================
      // UPDATE LOCAL USER
      // =========================

      const existingUser =
        JSON.parse(
          localStorage.getItem("user")
        ) || {};

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...existingUser,
          name: data.name,
          mobile: data.mobile,
        })
      );

      // Notify Navbar / other components
      window.dispatchEvent(
        new Event("authChange")
      );

      // =========================
      // UPDATE STATE
      // =========================

      const updatedAddress =
        addressResult.address;

      setSavedAddress(updatedAddress);

      setFormData({
        ...data,
        verified,
      });

      alert(
        "Account details saved successfully!"
      );
    } catch (error) {
      console.error(
        "Save account details error:",
        error
      );

      alert(
        error.message ||
          "Failed to save account details"
      );
    }
  };

  // =========================
  // CHANGE MOBILE
  // =========================

  const handleChangeMobile = () => {
    /*
      OTP is no longer required.

      Changing the mobile number simply marks
      the address as unverified.
    */

    setFormData((previous) => ({
      ...previous,
      verified: false,
    }));
  };

  // =========================
  // FORM CANCEL
  // =========================

  const handleFormCancel = () => {
    if (onClose) {
      onClose();
    } else {
      window.history.back();
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return null;
  }

  // =========================
  // RENDER
  // =========================

  return (
    <Form
      onSave={handleFormSave}
      onCancel={handleFormCancel}
      defaultValues={formData}
      verified={
        savedAddress?.verified === true &&
        savedAddress?.mobile ===
          formData?.mobile
      }
      onChangeMobile={handleChangeMobile}
    />
  );
};

export default AccountDetails;