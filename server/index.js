import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import adminAuthRoutes from "./routes/admin.js"
import contentRoutes from "./routes/content.js"
import progressRoutes from "./routes/progress.js"
import userManagementRoutes from "./routes/userManagement.js"
import contentManagementRoutes from "./routes/contentManagement.js"
import lessonManagementRoutes from "./routes/lessonManagement.js"

const app = express()
dotenv.config()

// Use environment variable for PORT, with 8800 as fallback
const PORT = process.env.PORT || 8800

const connect = () => {
    mongoose.connect(process.env.MONGO, {
        dbName: 'ensayo_backup'
    }).then(() => {
        console.log("Connected to DB")
    }).catch((err) => {
        throw err
    })
}

// Configure CORS for both development and production
const allowedOrigins = ['https://ensayo.online', 'https://www.ensayo.online', 'https://admin.ensayo.online'];

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Client Routes 
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/content", contentRoutes)
app.use("/api/progress", progressRoutes)
// Admin Routes
app.use("/api/admin", adminAuthRoutes)
app.use("/api/userManagement", userManagementRoutes)
app.use("/api/contentManagement", contentManagementRoutes)
app.use("/api/lessonManagement", lessonManagementRoutes)

// API health check endpoint - helps with monitoring on Render
if (process.env.NODE_ENV === 'production') {
  app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
  });
}

// Error Handling
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong!"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(PORT, ()=> {
    connect()
    console.log(`Server running on port ${PORT}`)
})
