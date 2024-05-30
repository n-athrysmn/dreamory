import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dateTime:{
        type: Date,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    organizer:{
        type: String,
        required: true
    },
    status:{
        type: String
    },
    theme:{
        type: String
    }
})

const Event = mongoose.model('Event', eventSchema)

export default Event