const { text } = require('body-parser')
const mongoose = require('mongoose')

const VisualizationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    link: {
        type: String
    },
    description: {
        type: String
    },
    like: {
        type: Array
    },
    deleted_at: {
        type: Date
    },
    type: {
        type: String,
        enum: ['default', 'user'],
        default: 'user'
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('visualization', VisualizationSchema)
