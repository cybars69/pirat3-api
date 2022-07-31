import pkg from 'mongoose';
const { Schema: _Schema, model } = pkg;

var AuthSchema = new _Schema({
    publicAddress: {type: String, required: true, max: 42},
    signature: {type: String},
    signMessage: {type: String},
    authStatus: {type: String}
});


// Export the model
export default model('Auth', AuthSchema);