const express = require("express");
const router = express.Router();
const TeamMember = require("../../models/teamMember");

router.get("/", (req, res) => {
  TeamMember.find()
    .sort({ date: -1 })
    .then(teamMembers => {
      res.json(teamMembers);
    });
});

router.post("/", (req, res) => {
  const obj = new TeamMember({
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
  TeamMember.findOneAndDelete({ _id: req.params.id })
    .then(resp => res.json(resp))
    .catch(resp => res.json(resp));
});

module.exports = router;
