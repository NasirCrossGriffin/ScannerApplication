const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scannerSchema = new Schema(
    {
        scannerId: {
            type: String,
            trim: true
        },

        tempName: {
            type: String,
            default: "",
            trim: true
        },

        checkedOut: {
            type: Boolean,
            default: false
        },

        checklist: {
            type: Schema.Types.ObjectId,
            ref: 'Checklist',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Scanner', scannerSchema);