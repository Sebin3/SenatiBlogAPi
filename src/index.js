const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authorRoutes = require('./routes/authorRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());                    
app.use(express.json());            
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err.message));

app.get('/', (req, res) => {
  res.json({
    name: 'SENATI Blog API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      authors: '/api/authors',
      posts: '/api/posts'
    }
  });
});

app.use('/api/authors', authorRoutes);
app.use('/api/posts', postRoutes);

app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint no encontrado' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
