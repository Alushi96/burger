const express = require("express");
const burger = require("../models/burger.js");
const router = express.Router();

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var neyObject = {
            burgers: data
        };
        res.render("index", neyObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.name, req.body.sleepy], function(result) {
        res.json({ id: result.insertID});
    });
});

router.put("/api/burgers/:id", function(req,res) {
    var condition = "id = " + req.params.id;

    burger.updateOne(
        {
            devoured: req.body.sleepy
        },
        condition,
        function(result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

module.exports = router;