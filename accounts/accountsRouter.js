const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();



//get all acounts WORKS
router.get("/", (req, res) => {

  db.select("*")
    .from("accounts") // returns a promise
    .then(rows => {
      res.status(200).json({ data: rows });
    })
    .catch(error => {
      res.status(500).json({ message: "Could not load accounts" });
    });
});

//get account by id WORKS
router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(post => {
      if (post) {
        res.status(200).json({ data: post });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not load accounts" });
    });
});

//post new account WORKS
router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(data => {
      res.status(201).json({ results: data });
    })
    .catch(error => {
      res.status(500).json({ message: "Could not load accounts" });
    });
});

//update account WORKS
router.put("/:id", (req, res) => {
  const changes = req.body;

  db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Account updated successfully" });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not load accounts" });
    });
});

//delete account WORKS
router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del() // delete the records
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Account deleted successfully" });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not load accounts" });
    });
});

module.exports = router;
