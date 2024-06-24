const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Please insert your name"],
        minLength: [3, "Your name is too short"],
    },
    email: {
        type: String,
        required: [true, "Please insert your email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please insert user password"],
        minLength: [8, "Password is less than 8 character"]
    }
})


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;