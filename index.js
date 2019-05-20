const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./models/Todo");

mongoose.connect(
  "mongodb+srv://b03505052:Dennislee0903@cluster0-wu2h8.gcp.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
);
mongoose.set("useFindAndModify", false);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes")(app);
app.use(express.static("client/build"));
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
