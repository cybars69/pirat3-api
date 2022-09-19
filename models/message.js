import pkg from 'mongoose';
const { Schema: _Schema, model } = pkg;

var MessageSchema = new _Schema({
    applicationId: { type: String},
    sender: String,
    content: String,
    attachment: String
});

export default model('Message', MessageSchema);