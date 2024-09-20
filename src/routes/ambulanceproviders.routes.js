const router = require("express").Router();
const {
  createAmbulanceProvider,
  validateAmbulanceProvider,
  getAllAmbulanceProviders,
  updateAmbulanceProvider,
  deleteAmbulanceProvider,
  getAmbulanceProviderById,
} = require("../controllers/ambulanceproviders.controller");
const { verifyAdminToken } = require("../middleware/token.middleware");

router.post("/register", verifyAdminToken, createAmbulanceProvider);
router.post("/login", validateAmbulanceProvider);
router.get("/all", verifyAdminToken, getAllAmbulanceProviders);
router.put("/update/:id", verifyAdminToken, updateAmbulanceProvider);
router.delete("/delete/:id", verifyAdminToken, deleteAmbulanceProvider);
router.get("/:id", verifyAdminToken, getAmbulanceProviderById);

module.exports = router;
