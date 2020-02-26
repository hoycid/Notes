const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const notes = require("./routes/api/notes")

app.use(cors());
app.use(bodyParser.json());

const db = require("./config/keys").MongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    console.log("MongoDB database connection established successfully.")
  )
  .catch(err => console.log(err));

app.use("/routes/api", notes);

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
