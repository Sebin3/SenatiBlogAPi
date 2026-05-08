const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    minlength: [5, 'El título debe tener al menos 5 caracteres']
  },
  content: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
    minlength: [20, 'El contenido debe tener al menos 20 caracteres']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, 'El autor es obligatorio']
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Índice para búsquedas rápidas por título
postSchema.index({ title: 1 });

module.exports = mongoose.model('Post', postSchema);
