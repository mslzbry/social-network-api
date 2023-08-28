const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // the moment library will format the date in the below format
        get: (createdAt) => moment(createdAt).format('MM DD, YYYY hh:mm a')
    }
    },
    {
    toJSON: {
        getters: true
    } 
    }
);

const ThoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => moment(createdAt).format('MM DD, YYYY hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema] // reactions are like replies
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
)


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;