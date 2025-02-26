import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Corrected path to serve frontend from `client/dist`
const clientDistPath = path.resolve(__dirname, '../../client/dist');
console.log("Serving frontend from:", clientDistPath);

app.use(express.static(clientDistPath));

// ✅ Serve React frontend
app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// ✅ Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect the routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
