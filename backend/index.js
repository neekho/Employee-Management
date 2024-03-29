require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port_number = 4000;
const path = require("path");

const mongoose = require("mongoose");

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Schema for storing refresh tokens, associate the refresh tokens to its users
const RefreshTokenModel = require("./models/RefreshToken");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(logger);
app.use(errorHandler);

// Establish MongoDB Atlas connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

db.once("open", () => console.log("Connected to MongoDB"));

// Application routes

const authRoute = require("./routers/authRoute");
app.use("/", authRoute);

const userRoute = require("./routers/userRoute");
app.use("/user", userRoute);

const employeeRoute = require("./routers/employeeRoute");
app.use("/employee", employeeRoute);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

async function removeExpiredRefreshTokens() {
  try {
    const currentDateTime = new Date();

    await RefreshTokenModel.deleteMany({
      expiresAt: { $lte: currentDateTime },
    });

    console.log("Expired refresh tokens removed.");
  } catch (error) {
    console.error("Error removing expired refresh tokens:", error);
  }
}

// Timer for cleaning up stored refresh tokens
const refreshTokenExpirationTime = 5 * 60 * 1000; // 15 minutes in milliseconds

setInterval(async () => {
  await removeExpiredRefreshTokens();
}, refreshTokenExpirationTime);

app.listen(port_number, () => {
  console.log(`server is running on http://localhost:${port_number}`);
});
