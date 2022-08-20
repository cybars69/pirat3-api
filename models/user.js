import pkg from 'mongoose';
const { Schema: _Schema, model } = pkg;

var UserSchema = new _Schema({
    userId: {type: String, required: true},
    publicAddress: {type: String, required: true, max: 42},
    email: {type: String}
});

export default model('User', UserSchema);