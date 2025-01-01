const {mongoose} = require('mongoose')

require('dotenv').config();

const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.ohlks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`



const connectDB = async() => {
    try {
        const connection = await mongoose.connect(dbURL);

        console.log('Connect to DB successfully!!!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;