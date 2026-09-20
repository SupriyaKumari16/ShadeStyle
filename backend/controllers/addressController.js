import { pool } from "../config/db.js";

// =========================
// GET ALL ADDRESSES
// =========================

export const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT
        id,
        user_id,
        name,
        mobile,
        pincode,
        locality,
        state,
        city,
        address_line,
        landmark,
        alt_phone,
        address_type,
        verified,
        is_account_details,
        created_at,
        updated_at
       FROM addresses
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.status(200).json({
      success: true,
      addresses: result.rows,
    });
  } catch (error) {
    console.error("Get addresses error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
    });
  }
};


// =========================
// CREATE ADDRESS
// =========================

export const createAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      mobile,
      pincode,
      locality,
      state,
      city,
      addressLine,
      landmark,
      altPhone,
      addressType,
      verified,
      isAccountDetails,
    } = req.body;

    if (
      !name ||
      !mobile ||
      !pincode ||
      !state ||
      !city ||
      !addressLine
    ) {
      return res.status(400).json({
        success: false,
        message: "All required address fields are required",
      });
    }

    /*
      Only one address should be marked as
      Account Details for a particular user.
    */

    if (isAccountDetails === true) {
      await pool.query(
        `UPDATE addresses
         SET is_account_details = false
         WHERE user_id = $1`,
        [userId]
      );
    }

    const result = await pool.query(
      `INSERT INTO addresses
        (
          user_id,
          name,
          mobile,
          pincode,
          locality,
          state,
          city,
          address_line,
          landmark,
          alt_phone,
          address_type,
          verified,
          is_account_details
        )
       VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        userId,
        name,
        mobile,
        pincode,
        locality || null,
        state,
        city,
        addressLine,
        landmark || null,
        altPhone || null,
        addressType || "Home",
        verified === true,
        isAccountDetails === true,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: result.rows[0],
    });
  } catch (error) {
    console.error("Create address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add address",
    });
  }
};


// =========================
// UPDATE ADDRESS
// =========================

export const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const {
      name,
      mobile,
      pincode,
      locality,
      state,
      city,
      addressLine,
      landmark,
      altPhone,
      addressType,
      verified,
      isAccountDetails,
    } = req.body;

    if (
      !name ||
      !mobile ||
      !pincode ||
      !state ||
      !city ||
      !addressLine
    ) {
      return res.status(400).json({
        success: false,
        message: "All required address fields are required",
      });
    }

    /*
      If this address becomes the Account Details
      address, remove the flag from any other
      address belonging to the same user.
    */

    if (isAccountDetails === true) {
      await pool.query(
        `UPDATE addresses
         SET is_account_details = false
         WHERE user_id = $1
         AND id != $2`,
        [userId, id]
      );
    }

    const result = await pool.query(
      `UPDATE addresses
       SET
         name = $1,
         mobile = $2,
         pincode = $3,
         locality = $4,
         state = $5,
         city = $6,
         address_line = $7,
         landmark = $8,
         alt_phone = $9,
         address_type = $10,
         verified = $11,
         is_account_details = $12,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $13
       AND user_id = $14
       RETURNING *`,
      [
        name,
        mobile,
        pincode,
        locality || null,
        state,
        city,
        addressLine,
        landmark || null,
        altPhone || null,
        addressType || "Home",
        verified === true,
        isAccountDetails === true,
        id,
        userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address: result.rows[0],
    });
  } catch (error) {
    console.error("Update address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update address",
    });
  }
};


// =========================
// DELETE ADDRESS
// =========================

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM addresses
       WHERE id = $1
       AND user_id = $2
       RETURNING id`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete address",
    });
  }
};