const db = require("../../utils/dbConfig");
const Wallet = require("../models/AccountWalletModel");

async function add(payload) {
    try {
        const [ id ] = await db("accounts").insert(payload);
        if (id) {
            const { status, message, ...rest } = await Wallet.createWallet({account_id: id});
            if (status) {
                return { status, message, data: id }
            } else {
                return { status, message, error: (rest || {}).error };
            }
        } else {
            return { status: false, message: "Unable to create account" };
        }
    } catch (error) {
        return {status: false, message: "Unable to create account", error: error.sqlMessage};
    }
}

async function findById(id) {
    try {
        let data = await db("accounts")
            .join('wallets', 'accounts.id', 'wallets.account_id')
            .select("accounts.id", "accounts.accountname", "accounts.accountnumber", "wallets.accountbalance")
            .where({ "accounts.id": id })
            .first();
        if (data) {            
            return { status: true, message: "Success", data };
        } else {
            return { status: false, message: "Account not found" };
        }
    } catch (error) {
        return { status: false, message: "Unable to show account", error: error.message };
    }
}

module.exports = {
    add,
    findById
}