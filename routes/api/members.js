const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const members = require("../../Members"); //leaving the api folder, then leaving the routes folder, then loading Members.js file

//Get all members
router.get("/", (req, res) => {
  res.json(members);
});

//Get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); //found = the member with the id given in the url

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id))); //if given id is = to found, return the json of that member in the response
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` }); //if not, send a 400 status and display message
  }
});

//Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  res.json(members);
});

//Update Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); //found = the member with the id given in the url

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` }); //if not, send a 400 status and display message
  }
});

//Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); //found = the member with the id given in the url

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    }); //if given id is = to found, return the json of that member in the response
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` }); //if not, send a 400 status and display message
  }
});

module.exports = router;
