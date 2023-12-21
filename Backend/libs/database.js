import mongoose from "mongoose";

const connectDataBase = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`)
    }).catch((err) => console.log('Unable to connect Database', err))
}

export default connectDataBase;