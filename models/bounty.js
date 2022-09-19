import pkg from 'mongoose';
const { Schema: _Schema, model } = pkg;

var BountySchema = new _Schema({
    name: String,
    shipId: String,
    createdBy: String,
    status: { type: Number, default: 0 },
    //Created, In Progress, Delivered, Claimed, Expired
    desc: String,
    currency: String,
    amount: Number,
});

export default model('Bounty', BountySchema);