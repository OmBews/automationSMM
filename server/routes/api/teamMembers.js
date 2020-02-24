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
  console.log(req.body);
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

router.post("/:id", (req, res) => {
  TeamMember.findOneAndDelete({ _id: req.params.id })
    .then(resp => res.json(resp))
    .catch(resp => res.json(resp));
});

router.post("/:id/update", (req, res) => {
  TeamMember.update({ _id: req.params.id },
    {$set: { "firstImage" : req.body.first,
            "secondImage": req.body.second,
            "thirdImage": req.body.third,
            "followers": req.body.followers  
  
  }})
    .then(resp => res.json(resp))
    .catch(resp => res.json(resp));
});



module.exports = router;
