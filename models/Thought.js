const { Schema, model } = require('mongoose');

// Schema to create Reaction model
const ReactionSchema = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      getter: function () {
          return this.createdAt.toLocaleString();
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// Schema to create Thoughth model
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      getter: function () {
        return this.createdAt.toLocaleString();
      },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual - reactionCount
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('thought', ThoughtSchema);

module.exports = Thought;
