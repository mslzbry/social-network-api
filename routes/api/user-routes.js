const router = require('express').Router();

// defined in user controller
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// API Routes

// GET /api/users
router.route('/').get(getAllUsers);

// POST /api/users
router.route('/').post(createUser);

// GET /api/users/:id
router.route('/:id').get(getUserById);
// PUT /api/users/:id
router.route('/:id').put(updateUser);
// DELETE /api/users/:id
router.route('/:id').delete(deleteUser);

// Friend-related API routes

// POST /api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend);
// DELETE  /api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId').delete(deleteFriend);

module.exports = router; 