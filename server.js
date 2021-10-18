const express = require("express");
const app = express();
const router = require("./routes/index");
const cors = require("cors");
require("dotenv").config();
require("./config/database");
require("./config/passport");

app.use(cors())
app.use(express.json())
app.use(express.static('assets'))
app.use("/api", router)

app.listen(4000 , console.log('Server en port :)'))
