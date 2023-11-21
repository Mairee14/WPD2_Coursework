const User = require("../models/userModels");

const createUser = (req, res) => {
    const alumniData = req.body;
    User.create(alumniData)
        .then((user) => {
            console.log({ message: "signup sucessfully", user });
            res.redirect("/form/signup");
        })
        .catch((err) => {
            console.error("an error occurred");
            console.error({ error: err });
            res.status(500).send("Error siging up; please try again");
        });
};

const getAllUsers = (req, res) => {
    User.find({})
        .then((users) => {
            console.log(users);
            res.render("dashboard", { alumniData: users });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error getting data; please try again");
        });
};

module.exports = {
    createUser,
    getAllUsers
};