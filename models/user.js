import pkg from 'mongoose';
const { Schema: _Schema, model } = pkg;

var UserSchema = new _Schema({
    userId: { type: String, required: true },
    nonce: { type: String },
    publicAddress: { type: String, required: true, max: 42 },
    firstname: { type: String },
    lastname: { type: String },
    // Maybe replace fname lname with nickname
    email: { type: String },
    linkedin: { type: String }
});

export default model('User', UserSchema);