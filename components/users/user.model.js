const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    name: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

UserSchema.set('toJSON', {
    versionKey: false,
    transform: (document, returnedObject) => {
        delete returnedObject.passwordHash
    }
})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
