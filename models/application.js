import pkg from 'mongoose';
const { Schema: _Schema, model } = pkg;

var ApplicationSchema = new _Schema({
    bountyId: String,
    status: {
        type: Number, default: 0
    },
    // Submitted, Accepted, Rejected, Review, Closed
    applicantId: String,
    coverLetter: String,
    hourlyRate: String,
    attachments: { type: [String], default: [] }
});

export default model('Application', ApplicationSchema);