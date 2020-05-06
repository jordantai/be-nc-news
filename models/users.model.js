const connection = require("../db/connection");

exports.fetchUserByUsername = (username) => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .then((rows) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "User not found" });
      return rows;
    });
};
