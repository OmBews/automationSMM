const express = require("express");
const router = express.Router();
const Trial = require("../../models/trial");

router.get("/", (req, res) => {
  Trial.find()
    .sort({ date: -1 })
    .then(trials => {
      res.json(trials);
    });
});

router.post("/", (req, res) => {
  const obj = new Trial({
    url: req.body.url
  });
  obj
    .save()
    .then(resp => {
      res.json(resp);
    })
    .catch(err => res.json(err));
});

router.delete("/:id", (req, res) => {
  Trial.findOneAndDelete({ _id: req.params.id })
    .then(resp => res.json(resp))
    .catch(resp => res.json(resp));
});

module.exports = router;
