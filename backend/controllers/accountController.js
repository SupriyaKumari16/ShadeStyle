import { pool } from "../config/db.js";

// GET LOGGED-IN USER ACCOUNT DETAILS
export const getAccountDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT
        id,
        name,
        email,
        mobile,
        created_at,
        updated_at
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Get account details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch account details",
    });
  }
};


// UPDATE LOGGED-IN USER ACCOUNT DETAILS
export const updateAccountDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      mobile,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const result = await pool.query(
      `UPDATE users
       SET
         name = $1,
         mobile = $2,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING
         id,
         name,
         email,
         mobile,
         created_at,
         updated_at`,
      [
        name.trim(),
        mobile || null,
        userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account details updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Update account details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update account details",
    });
  }
};