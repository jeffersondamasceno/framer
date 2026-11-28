import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { artworkRoutes } from './routes/artwork.routes';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Framer API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artworks', artworkRoutes);

const PORT = Number(process.env.PORT) || 3333;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});