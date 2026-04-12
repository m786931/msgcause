const { body } = require("express-validator");
const pool = require("../db");

const getRegisteredUsers = async () => {
  try {
    return result = await new Promise (function (resolve, reject) {
        pool.query("SELECT * FROM accounts", (err, res) => {
            if (err) {
                reject(err);
            }
            if (res && res.rows) {               
                resolve(res.rows);
            } else {
                reject (new Error("No rows found"));
            }
        });
    });
    } catch (err) {
        console.error("Error fetching registered users:", err);
        throw err;
    }
};

const getRegisteredUser = (id) => {
    return new Promise (function (resolve, reject) {
        pool.query("SELECT * FROM accounts WHERE id = $1", [id], (err, res) => {
            if (err) {
                reject(err);
            }
            if (res && res.rows) {               
                resolve(res.rows[0]);
            } else {
                reject (new Error("No rows found"));
            }
        });
    });
};

const createRegisteredUser = (userData) => {
    const { orgName, contact, email, phone, ein, agree } = userData;
    return new Promise (function (resolve, reject) {
        pool.query(
            "INSERT INTO accounts (orgname, contact, email, phone, ein, agree) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [orgName, contact, email, phone, ein, agree],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                if (res && res.rows) {               
                    resolve(res.rows[0]);
                } else {
                    reject (new Error("Failed to create user"));
                }
            }
        );
    });
};

const updateRegisteredUser = (id, userData) => {
    const { orgName, contact, email, phone, ein, agree } = userData;
    return new Promise (function (resolve, reject) {
        pool.query(
            "UPDATE accounts SET orgname = $1, contact = $2, email = $3, phone = $4, ein = $5, agree = $6 WHERE id = $7 RETURNING *",
            [orgName, contact, email, phone, ein, agree, id],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                if (res && res.rows) {               
                    resolve(res.rows[0]);
                } else {
                    reject (new Error("Failed to update user"));
                }
            }
        );
    });
};

const deleteRegisteredUser = (id) => {
    return new Promise (function (resolve, reject) {
        pool.query("DELETE FROM accounts WHERE id = $1 RETURNING *", [id], (err, res) => {
            if (err) {
                reject(err);
            }
            if (res && res.rows) {               
                resolve(res.rows[0]);
            } else {
                reject (new Error("Failed to delete user"));
            }
        });
    });
};

module.exports = {
    getRegisteredUsers,
    getRegisteredUser,
    createRegisteredUser,
    updateRegisteredUser,
    deleteRegisteredUser
};