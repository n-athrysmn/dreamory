import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.DB_URL

export const db = async () => {
    try {
        await mongoose.connect(url)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error)
    }
}
