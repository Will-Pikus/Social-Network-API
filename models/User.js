const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought');

// Schema to create User model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual - friendCount
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


const User = model('user', UserSchema);

module.exports = User;
