import express from 'express';
import { getElenaReply } from '../models/utils/ElenaAi.js';
import { getJessReply } from '../models/utils/JessAi.js';

const router = express.Router();

router.post('/ElenaAI', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization token is missing.' });
  }
  const token = authHeader.split(' ')[1]; // "Bearer TOKEN"

  try {
    const reply = await getElenaReply(message, token);
    res.json({ reply });
  } catch (error) {
    console.error('Error generating reply:', error);
    res.status(500).json({ error: 'Failed to generate reply.' });
  }
});

router.post('/JessAI', async (req, res) => {
  const { message } = req.body;
  console.log(message)
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // Extract token from Authorization header (same as ElenaAI)
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization token is missing.' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const reply = await getJessReply(message, token);
    res.json({ reply });
  } catch (error) {
    console.error('Error generating Jess reply:', error);
    res.status(500).json({ error: 'Failed to generate reply.' });
  }
});

export default router;
