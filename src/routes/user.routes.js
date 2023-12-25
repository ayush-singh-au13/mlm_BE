const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
const verifyUserToken = require("./../utils/token.utils");
const {
  checkIfUserExists,
  checkIfUserExistsOrNot,
} = require("./../middleware/index");


// register a new user
router.post("/register", checkIfUserExists, userCtrl.register);

// login a user
router.post("/login", checkIfUserExistsOrNot, userCtrl.login);

// upgrade a user api
// user will have to pay 260 trx or the same amount will be deducted from users account
router.post("/upgrade", verifyUserToken,userCtrl.upgrade);

// list of all robot income of all sponsers
router.get("/robotIncome", verifyUserToken,userCtrl.robotIncome);

router.get("/upgradedUsers", verifyUserToken,userCtrl.upgradedUsers);

router.get("/directTeam",userCtrl.directTeam);

// transfer tron from company wallet to user waller
router.post("/transferTRX",userCtrl.transferTRX);


// matrix levels

module.exports = router;
