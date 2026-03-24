import { OpenAPIHono } from '@hono/zod-openapi'
import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';
import { router } from './routes.js';
import 'dotenv/config'
import { connectMongo } from './config/mongo.config.js';
import { Server } from 'socket.io';
import { registerChatSocket } from "./socket/socket.js";
import { cors } from "hono/cors";

const PORT = process.env.PORT || 5000;
const app = new OpenAPIHono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
)


app.doc('/', {
  info: {
    title: 'An Social Chat API',
    version: 'v1',
  },
  openapi: '3.1.0',
})

app.get('/docs', swaggerUI({ url: '/' }));

router(app);

const httpServer = serve({
  fetch: app.fetch,
  port: 5000
}, async () => {
  await connectMongo();
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`Docs available at http://localhost:${PORT}/docs`)
  
});

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on("connect_error", (err) => {
    console.log("Connection Error:", err.message)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

registerChatSocket(io);