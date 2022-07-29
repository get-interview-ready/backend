const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createDreamCompany,
  deleteDreamCompany,
  getAllDreamCompanies,
  getDreamCompany,
  updateMdText,
  updateReferralMsg,
  createReferrer,
  deleteReferrer,
  getAllReferrers,
} = require("../controllers/dreamCompanyController");

router.route("/createDreamCompany/").post(auth, createDreamCompany);
router.route("/deleteDreamCompany/").delete(auth, deleteDreamCompany);
router.route("/getAllDreamCompanies/:id").get(auth, getAllDreamCompanies);
router.route("/getDreamCompany/:id").get(auth, getDreamCompany);
router.route("/updateMdText").patch(auth, updateMdText);
router.route("/updateReferralMsg").patch(auth, updateReferralMsg);
router.route("/createReferrer").post(auth, createReferrer);
router.route("/deleteReferrer").delete(auth, deleteReferrer);
router.route("/getAllReferrers").get(auth, getAllReferrers);

module.exports = router;
