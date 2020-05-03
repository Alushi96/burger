var connection = require("./connection.js");

var orm = {
    selectAll: function(table, cb) {
        var query = "SELECT * FROM " + table + ";";
        connection.query(query, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function(table, col, val, cb) {
        var query = "INSERT INTO " + table;
        query += "(";
        query += col;
        query += ")";
        query += "VALUES (";
        query += val;
        query += ")";

        connection.query(query, val, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function(table, objColVal, condition, cb) {
        var query = "UPDATE" + table;
        query += "SET";
        query += objColVal;
        query += "WHERE";
        query += condition;

        connection.query(query, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;