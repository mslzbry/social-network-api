const router = require('express').Router();

// defined in the thought controller
const { 
    getAllThoughts, 
    getThoughtById,
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

// API Routes

// GET /api/thoughts
router.route('/').get(getAllThoughts);

// GET /api/thoughts/:id
router.route('/:id').get(getThoughtById);
// PUT /api/thoughts/:id
router.route('/:id').put(updateThought);
// DELETE /api/thoughts/:id
router.route('/:id').delete(deleteThought);

// POST /api/thoughts/:userId
router.route('/:userId').post(createThought);

// POST /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE /api/thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;