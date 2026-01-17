import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import axios from 'axios';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGO)
    .then(() => { console.log('MongoDb is connected') })
    .catch((err) => { console.log(err) });

const PORT = 3000;

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.post('/ai', async (req, res) => {
  console.log(
    'COHERE KEY:',
    process.env.COHERE_API_KEY ? 'SET' : 'MISSING'
  );
  try {
    const prompt = req.body.prompt?.trim();
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt cannot be empty' });
    }
    const model = process.env.COHERE_MODEL || 'command-r-plus-08-2024';

    const response = await axios.post(
      'https://api.cohere.ai/v1/chat',
      {
        model,
        message: prompt, 
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const botText = response?.data?.text;
    
    if (!botText) {
      return res.status(502).json({ error: 'AI returned an unexpected response' });
    }

    res.json({ bot: botText.trim() });
  } catch (error) {
    console.error('AI ERROR:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI generation failed' });
  }
});


// Serve static files from the 'dist' folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Serve 'index.html' for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

export default app;