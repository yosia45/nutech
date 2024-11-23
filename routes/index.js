const express = require('express');
const router = express.Router();
const authn = require('../middleware/authn');
const UserControllers = require('../controllers/authn');
const ServiceController = require('../controllers/service');
const UserMoneyController = require('../controllers/userMoney');
const UserTransactionController = require('../controllers/userTransaction');
const UserProfileController = require('../controllers/userProfile');
const BannerController = require('../controllers/banner');

router.post("/registration", UserControllers.register);
router.post("/login", UserControllers.login);
router.get("/profile", authn, UserProfileController.getUserProfile)
router.put("/profile/update", authn, UserProfileController.updateUserProfile)
router.get("/service", ServiceController.getAllServices)
router.get("/banner", BannerController.getBanner)
router.get("/balance", authn, UserMoneyController.getUserMoney)
router.post("/topup", authn, UserTransactionController.topUp)
router.post("/transaction", authn, UserTransactionController.buyService)