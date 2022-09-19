import pkg from 'mongoose';
const { Schema: _Schema, model } = pkg;

var ShipSchema = new _Schema({
    name: String,
    createdBy: String,
    desc: String,
    website: String,
    email: String,
    icon: String    //Auto assignment from website favicon
});

export default model('Ship', ShipSchema);