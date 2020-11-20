var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default:Date.now
    }
})

// UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);