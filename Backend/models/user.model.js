const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 character']
        },
        lastname: {
            type: String,
            minlength: [3, 'last name must be at least 3 character']
        }
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 character']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {             // use for live tracking 
        type: String
    }
})

// These methods belong to a single document (object).
// They are called after fetching or creating a document

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// Static methods belong to the Model, not to a document.
// They are called directly using the model.

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;