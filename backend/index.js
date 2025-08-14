import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv';
import ChatbotRoutes from './routes/ChatbotRoutes.js';
import journalRoutes from './routes/journalRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/", userRoutes)
app.use('/api/', ChatbotRoutes);
app.use('/api/journal', journalRoutes);
app.use("/api/conversations", conversationRoutes);
app.use('/api/assessment', assessmentRoutes);

// catches 404 errors
app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.statusCode = 404;
    next(error);
});

// centralized error handler
app.use(errorHandler);




mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected ✅')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));