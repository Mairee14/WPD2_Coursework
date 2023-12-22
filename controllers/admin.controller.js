const User = require('../models/userModels');

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find({});
        console.log(users);
        res.render('admin', { userData: users });
        
    } catch (error) {
        console.error('Error fetching users:', error);
        return []; // Return an empty array if there's an error
    }
};

module.exports = {
    getAllUsers,
};