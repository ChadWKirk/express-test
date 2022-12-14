const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const members = require("./Members");

const logger = require("./middleware/logger");

const app = express();

//Init Middleware
//app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//Body Parser Middleware
app.use(express.json()); //parses incoming requests with JSON payloads (basically turns req data into JSON).
app.use(express.urlencoded({ extended: false })); //Turns body into (parses) urlencoded data then parses into querystring library & creates a req.body object

//Homepage Route (Handlebars)
app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App",
    members
  });
});

//Set a static folder
app.use(express.static(path.join(__dirname, "public")));

//Members API Routes
app.use("/api/members", require("./routes/api/members")); //when going to /api/members, use members.js route file

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
