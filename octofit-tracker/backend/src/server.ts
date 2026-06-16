import express from 'express';
import connectDatabase from './config/database.ts';
import usersRouter from './routes/users.ts';
import teamsRouter from './routes/teams.ts';
import activitiesRouter from './routes/activities.ts';
import workoutsRouter from './routes/workouts.ts';
import leaderboardRouter from './routes/leaderboard.ts';

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

async function startServer() {
  try {
    await connectDatabase();
    console.log('MongoDB connected.');

    const codespaceName = process.env.CODESPACE_NAME;
    const host = '0.0.0.0';
    const localUrl = `http://localhost:${PORT}`;
    const codespacesUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : null;

    app.listen(PORT, host, () => {
      console.log(`Backend listening on ${localUrl}`);
      if (codespacesUrl) {
        console.log(`Codespaces URL: ${codespacesUrl}`);
      }
    });
  } catch (error) {
    console.error('Failed to start backend', error);
    process.exit(1);
  }
}

startServer();
