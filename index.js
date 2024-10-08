const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const cookiesParser = require('cookie-parser')
const mongoose = require('mongoose');
const authRoutes = require("./routes/AuthRoute.js");
const projectRoutes = require("./routes/ProjectRoute.js");
const fs = require("fs")
const path = require('path');

dotenv.config();

const app = express()
const port = process.env.PORT || 3000;
const db = process.env.DB;

const corsOptions = {
  origin: 'https://chandancodes.onrender.com',  // Your frontend origin
  credentials: true,  // Allows cookies and other credentials to be sent
};

app.use(cors(corsOptions));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cookiesParser());
app.use(express.json())

app.use('/api/auth',authRoutes)

app.use('/api/projects',projectRoutes)
app.use('/images',express.static('uploads'))

const server = app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})

mongoose.connect(db).then(()=>{
    console.log("DataBase connection successfull")
}).catch(err=>console.log(err.message));
