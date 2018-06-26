const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReferralSchema = new Schema({
    client_name: String,
    client_phone: String,
    client_email: String,
    description: String,
    datecreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending",
        lowercase: true
    },
    referring_organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization"
    },
    receiving_organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
    },
    referring_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tasks: [{
        date: {
            type: Date,
            default: new Date()
        },
        text: String,
        posting_user: String
    }],
    custom_fields: [{
        label: String,
        value: String
    }]
})

module.exports = mongoose.model("Referral", ReferralSchema);
