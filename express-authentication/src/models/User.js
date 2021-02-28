const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
  },
  {
    timestamps: true,
    // Deletes the password when converting to JSON so it never reaches the frontend
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
      },
    },
  }
);

const User = model('User', userSchema);
module.exports = User;
