const express = require("express");
const router = express.Router();
const {
  verifyAdminToken,
  verifyDriverToken,
} = require("../middleware/token.middleware");
const {
  createDriverAccount,
  validateDriverAccount,
  logoutDriverAccount,
  getAllDriverAccounts,
  updateDriverAccount,
  deleteDriverAccount,
  getDriverAccountById,
} = require("../controllers/driveraccounts.controller");

router.post("/register", verifyAdminToken, createDriverAccount);
router.post("/login", validateDriverAccount);
router.put("/logout", verifyDriverToken, logoutDriverAccount);
router.get("/all", verifyAdminToken, getAllDriverAccounts);
router.put("/update/:id", verifyAdminToken, updateDriverAccount);
router.delete("/delete/:id", verifyAdminToken, deleteDriverAccount);
router.get("/:id", verifyAdminToken, getDriverAccountById);

module.exports = router;
