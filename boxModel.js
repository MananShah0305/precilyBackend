import mongoose from 'mongoose'

const internalSchema = {
    content: String,
    image: String,
    timestamp: Date,
}

const boxSchema = {
    name: String,
    boxInfo: [internalSchema],
}

const boxModel = mongoose.model('informations', boxSchema)

export default boxModel