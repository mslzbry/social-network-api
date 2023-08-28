const { Thought, User, Types } = require('../models');

const thoughtController = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .sort({_id: -1})
        .then(thoughts => res.json(thoughts))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // GET a thought by ID
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thought => {
            if (!thought) {
            res.status(404).json({message: `No thoughts found with ID ${params.id}`});
            return;
        }
        res.json(thought)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // POST / create a thought to User
    createThought({ params, body }, res) {       
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: `No User found with the id ${params.userId}` });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    // PUT / update a thought by ID
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(thought => {
            if (!thought) {
                res.status(404).json({message: `No thought found with ID ${params.id}`});
                return;
            }
            res.json(thought);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE a thought by ID
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(thought => {
            if (!thought) {
                res.status(404).json({message: `No thought found with ID ${params.id}`});
                return;
            }
            res.json(thought);
            })
            .catch(err => res.status(400).json(err));
    },

    // POST / add a new Reaction to Thought with ID
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thought => {
        if (!thought) {
            res.status(404).json({message: `No thought found with ID ${params.id}`});
            return;
        }
        res.json(thought);
        })
        .catch(err => res.status(400).json(err))

    },

    // DELETE a reaction by ID
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(thought => {
            if (!thought) {
                res.status(404).json({message: `No thought found with ID ${params.id}`});
                return;
            }
            res.json(thought);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;