const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");
// Timer for cleaning up stored refresh tokens
const refreshTokenExpirationTime = 5 * 180 * 1000; // 15 minutes in milliseconds

const RefreshTokenModel = require("../models/RefreshToken");

function generateAccessToken(payload) {
  // 35 SECONDS EXPIRATION FOR ACCESS TOKENS (FOR DEMO)
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
}

function generateRefreshToken(payload) {
  // 5 MIN EXPIRATION FOR REFRESH TOKENS
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "45m",
  });
}

function storeRefreshTokenInDatabase(userId, refreshToken) {
  // Associate a user with a refresh token
  // expiresAt sets the removal of the refresh token
  // so that, users wont have infinite access to access token.

  const refreshTokenModel = new RefreshTokenModel({
    userId,
    refreshToken,
    expiresAt: new Date(new Date().getTime() + refreshTokenExpirationTime), // Set expiration time
  });
  refreshTokenModel.save();
}

// Generates a new access token, provided the refresh token in the request body.
const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken; // from body.token changed to //refreshToken

  if (refreshToken == null) return res.sendStatus(401);

  try {
    // Check if the refresh token exists in the database
    const tokenDocument = await RefreshTokenModel.findOne({ refreshToken });

    if (!tokenDocument) {
      return res.sendStatus(403);
    }

    // Verify the refresh token against the secret
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      // console.log('User Information from Refresh Token:', user);

      // If verification is successful, generate a new access token
      const accessToken = generateAccessToken({
        userId: user.userId,
        email: user.email,
        role: user.role,
      });
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ message: "Refresh token is required for logout." });
  }

  try {
    // Remove the refresh token from the database
    await RefreshTokenModel.deleteOne({ refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.sendStatus(204); // Successful logout
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user based on the email
    const user = await User.findOne({ email: email });

    if (email.length == 0 || password.length == 0) {
      return res.status(401).json({ message: "check user input pls" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // once logged in, give user a access token (for them use on other requests)
    // and a refresh token, for handling access token expiration

    const userPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    // save to db the refresh token
    storeRefreshTokenInDatabase(user._id, refreshToken);

    res.send({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = {
  login,
  refresh,
  logout,
};
