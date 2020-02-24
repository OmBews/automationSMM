const express = require("express");
const router = express.Router();
const Comment = require("../../models/comment");

router.get("/", (req, res) => {
  Comment.find()
    .sort({ date: -1 })
    .then(comments => {
      res.json(comments);
    });
});

router.post("/", (req, res) => {
  const obj = new Comment({
    comment: req.body.comment
  });
  obj
    .save()
    .then(teamMember => {
      res.json(teamMember);
    })
    .catch(err => res.json(err));
});

router.post("/:id", (req, res) => {
  Comment.findOneAndDelete({ _id: req.params.id })
    .then(resp => res.json(resp))
    .catch(resp => res.json(resp));
});

module.exports = router;
