const express = require("express");
const router = express.Router();
const User = require("../models/userModels");

router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users); // Log fetched users to check if they're retrieved properly
        const processedUsers = users.map(user => ({
            name: user.name,
            email: user.email,
            yearGroup: user.yearGroup,
            // Add other necessary fields here
        }));
        res.render('dashboard', { userData: processedUsers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting user data", message: err.message });
    }
});




module.exports = router;
