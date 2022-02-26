let Account = require("../models/AccountModel")
let Wallet = require("../models/AccountWalletModel");
module.exports = {
    createAccount: async function (req, res) {
        try {
            let { body } = req;
            let { status, message, ...rest } = await Account.add(body);
            if (status) {
                return res.status(201).json({id: rest.data});
            } else {
                return res.status(400).json({ status, message, error: (rest || {}).error });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: "Unable to create account", error: error.message });
        }    
    }, 

    showAccount: async function (req, res) {
        try {
            let { id } = req.params;

            let { status, message, ...rest } = await Account.findById(id);
            if (status) {
                return res.json({ status, message, data: rest.data });
            } else {
                return res.status(400).json({ status, message, error: (rest || {}).error });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: "Unable to show account", error: error.message });
        }
    },

    fundWallet: async function (req, res) {
        try {
            let { amount } = req.body;
            let { id } = req.params;

            let { status, message, ...rest } = await Wallet.fundWallet(id, amount);
            if (status) {
                return res.json({status, message: "Wallet founding successful"})
            } else {
                return res.status(400).json({ status, message, error: (rest || {}).error });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: "Unable to fund wallet", error: error.message })
        }
    },

    transferFund: async function (req, res) {
        try {
            let { receiver_account, amount } = req.body;
            let { id } = req.params;

            let { status, message, ...rest } = await Wallet.transferFund(id, receiver_account, amount);
            if (status) {
                return res.json({ status, message: "Fund transfer successful." });
            } else {
                return res.status(400).json({ status, message, error: (rest || {}).error });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: "Unable to transfer funds", error: error.message });
        }
    },

    withdrawFund: async function (req, res) {
        try {
            let { amount } = req.body;
            let { id } = req.params;
            
            let { status, message, ...rest } = await Wallet.withdrawFund(id, amount);
            if (status) {
                return res.json({ status, message: "Withdraw successful" });
            } else {
                return res.status(400).json({ status: false, message, error: (rest || {}).error });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: "Unable to withdraw", error: error.message });
        }
    }
}