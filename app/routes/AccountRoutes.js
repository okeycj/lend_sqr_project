const express = require('express');
const router = express.Router();
const AccountController = require('../controller/AccountController');
const validate_account = require('../middleware/validate_account');
const validate_wallet = require('../middleware/validate_wallet');

router.post("/", validate_account.validate_create_account, AccountController.createAccount);

router.get("/:id", AccountController.showAccount);

router.post("/:id/transfer", validate_wallet.validate_transfer_fund, AccountController.transferFund);

router.post("/:id/withdraw", validate_wallet.validate_fund_wallet, AccountController.withdrawFund);

router.post("/:id/fund", validate_wallet.validate_fund_wallet, AccountController.fundWallet);


module.exports = router;