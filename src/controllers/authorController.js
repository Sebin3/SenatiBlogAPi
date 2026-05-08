const Author = require('../models/Author');

// ============ OBTENER TODOS LOS AUTORES ============
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: authors.length,
      data: authors
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ============ OBTENER AUTOR POR ID ============
const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      return res.status(404).json({ 
        success: false, 
        message: 'Autor no encontrado' 
      });
    }
    
    res.json({
      success: true,
      data: author
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de autor inválido' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ============ CREAR NUEVO AUTOR ============
const createAuthor = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    
    // Validación manual
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Los campos name y email son obligatorios'
      });
    }
    const author = await Author.create({ name, email, bio });
    
    res.status(201).json({
      success: true,
      message: 'Autor creado exitosamente',
      data: author
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un autor con ese email'
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ============ ACTUALIZAR AUTOR ============
const updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!author) {
      return res.status(404).json({ 
        success: false, 
        message: 'Autor no encontrado' 
      });
    }
    
    res.json({
      success: true,
      message: 'Autor actualizado correctamente',
      data: author
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un autor con ese email'
      });
    }
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ============ ELIMINAR AUTOR ============
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    
    if (!author) {
      return res.status(404).json({ 
        success: false, 
        message: 'Autor no encontrado' 
      });
    }
    res.json({
      success: true,
      message: 'Autor eliminado correctamente'
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de autor inválido' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
