const express = require('express');
const router = express.Router();
const authn = require('../middlewares/authn');
const UserControllers = require('../controllers/authn');
const ServiceController = require('../controllers/service');
const UserMoneyController = require('../controllers/userMoney');
const UserTransactionController = require('../controllers/userTransaction');
const UserProfileController = require('../controllers/userProfile');
const BannerController = require('../controllers/banner');
const upload = require("../middlewares/multer")

router.post("/registration", UserControllers.register);
router.post("/login", UserControllers.login);
router.get("/profile", authn, UserProfileController.getUserProfile)
router.get("/services", ServiceController.getAllServices)
router.get("/banner", BannerController.getBanner)
router.get("/balance", authn, UserMoneyController.getUserMoney)
router.post("/topup", authn, UserTransactionController.topUp)
router.post("/transaction", authn, UserTransactionController.buyService)
router.put("/profile/update", authn, UserProfileController.updateUserProfile)
router.put("/profile/image", authn, upload.single("file", 1), UserProfileController.updateUserProfileImage)
router.get("/transaction/history", authn,  UserTransactionController.getAllTransaction)

module.exports = router;