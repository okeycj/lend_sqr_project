const db = require("../../utils/dbConfig");

async function createWallet(data) {
    try {
        const [ id ] = await db('wallets').insert(data);
        if (id) return {status: true, message: "Successful", data: id}; 
    } catch (error) {
        return { status: false, message: "Unable to create wallet", error: error.message };
    }
}

async function fundWallet(account_id, amount) {
    try {
        let wallet = await db('wallets').where({ account_id }).increment('accountbalance', Number(amount));
        if (wallet) {
            return { status: true, message: "Success", data: account_id};  
        } else {
            return { status: false, message: "Account not found"};  
        }
    } catch (error) {
        return { status: false, message: "Unable to fund wallet", error: error.message };
    }
}

async function transferFund(source_account, receiver_account, amount) {
    try {
        let balance = await db('wallets').where({ account_id: source_account }).select("accountbalance").first();
        if (balance) { 
            if (balance.accountbalance < amount) return { status: false, message: "Insufficent balance" };
        } else {
            return { status: false, message: "Sender account not found" };
        }

        let checkRecieverAccount = await db('wallets').where({ account_id: receiver_account }).first();
        if (!checkRecieverAccount) return { status: false, message: "Receiver account not found" };

        if (receiver_account == Number(source_account)) return res.status(402).json({ status: false, message: "You can't transfer to yourself" });

        let source_wallet = await db('wallets').where({ account_id: source_account }).decrement('accountbalance', Number(amount));
        if (source_wallet) {
            receiver_wallet = await db('wallets').where({ account_id: receiver_account }).increment('accountbalance', Number(amount));
            if (receiver_wallet) {
                return { status: true, message: "Successful", data: source_account};
            } else {
                return { status: false, message: "Unable to transafer fund" };
            }
        } else {
            return { status: false, message: "Unable to transafer fund" };
        }
    } catch (error) {
        return {status: false, message: "Unable to transfer fund", error: error.message };
    }
}

async function withdrawFund(account, amount) {
    try {
        let balance = await db('wallets').where({ account_id: account }).select("accountbalance").first();
        if (balance) {
            if (balance.accountbalance < amount) return { status: false, message: "Insufficent balance" };
        } else {
            return { status: false, message: "Account not found" };
        }
    
        let wallet = await db('wallets').where({ account_id: account }).decrement('accountbalance', Number(amount));
        if (wallet) {
            return { status: true, message: "Success", data: account};
        } else {
            return { status: false, message: "Uabale to withdraw" };
        }
    } catch (error) {
        return { status: false, message: "Unable to withdraw fund", error: error.message };
    }
}

module.exports = {
    createWallet,
    fundWallet,
    transferFund,
    withdrawFund
}