const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes")
const {notFound,errorHandler} = require('./middleware/errorMiddleware')
dotenv.config();

connectDB();
const app = express();

app.use(express.json()); // to accept Json data

app.get('/',(req,res)=>{
    res.send("Api is running successfully");
})

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(5000,console.log(`Port is running at ${PORT}`.yellow.bold));