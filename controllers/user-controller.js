const { User } = require('../models');

const userController = {
    
    // POST / create a new User
    createUser({body}, res) {
        User.create(body)
        .then(usersData => res.json(usersData))
        .catch(err => res.status(400).json(err));
    },

    // GET all Users
    getAllUsers(req, res) {
        User.find({})
        // get user thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // get user friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .sort({_id: -1})
        .then(usersData => res.json(usersData))
        .catch(err => res.status(500).json(err));
    },

    // GET a user by ID
    getUserById({params}, res) {
        User.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(usersData => {
            if (!usersData) {
                res.status(404).json({message: `No User found with ID ${params.id}`});
                return; 
            }
            res.json(usersData)
        })
        .catch(err => res.status(400).json(err))
    },

    // PUT / Update a user by ID
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(usersData => {
            if (!usersData) {
                res.status(404).json({message: `No User found with ID ${params.id}`});
                return;
            }
            res.json(usersData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE a user by ID
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(usersData => {
            if (!usersData) {
                res.status(404).json({message: `No User found with ID ${params.id}`});
                return;
            }
            res.json(usersData);
        })
        .catch(err => res.status(400).json(err));
    },

    // Add a friend associated with User
    addFriend({params}, res) {
        User.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(usersData => {
            if (!usersData) {
                res.status(404).json({message: `No User found with ID ${params.id}`});
                return;
            }
        res.json(usersData);
        })
        .catch(err => res.status(400).json(err));
    },

    // Delete a friend associated with User
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(usersData => {
            if (!usersData) {
                res.status(404).json({message: `No User found with ID ${params.id}`});
                return;
            }
            res.json(usersData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = userController; 