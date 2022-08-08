const express = require("express");
const router = express.Router();

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
router.post('/', (req, res) => {
    const newMember = {
        
    }
});

module.exports = router;
