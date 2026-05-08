const Post = require('../models/Post');
const Author = require('../models/Author');

// ============ OBTENER TODOS LOS ARTÍCULOS ============
const getPosts = async (req, res) => {
  try {
    // Populate trae los datos completos del autor (no solo el ID)
    const posts = await Post.find()
      .populate('author', 'name email')  // Solo trae nombre y email del autor
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ============ OBTENER ARTÍCULO POR ID ============
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email bio');
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Artículo no encontrado' 
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de artículo inválido' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ============ OBTENER ARTÍCULOS POR AUTOR ============
const getPostsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    
    // Verificar que el autor existe
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ 
        success: false, 
        message: 'Autor no encontrado' 
      });
    }
    
    const posts = await Post.find({ author: authorId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      author: { id: author._id, name: author.name },
      count: posts.length,
      data: posts
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

// ============ CREAR NUEVO ARTÍCULO ============
const createPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    
    // Validación manual
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: 'Los campos title, content y author son obligatorios'
      });
    }
    
    // Verificar que el autor existe
    const authorExists = await Author.findById(author);
    if (!authorExists) {
      return res.status(404).json({
        success: false,
        message: 'El autor especificado no existe'
      });
    }
    
    const post = await Post.create({ title, content, author, tags });
    
    // Devolver el artículo con los datos del autor
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name email');
    
    res.status(201).json({
      success: true,
      message: 'Artículo creado exitosamente',
      data: populatedPost
    });
  } catch (error) {
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

// ============ ACTUALIZAR ARTÍCULO ============
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name email');
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Artículo no encontrado' 
      });
    }
    
    res.json({
      success: true,
      message: 'Artículo actualizado correctamente',
      data: post
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ============ ELIMINAR ARTÍCULO ============
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Artículo no encontrado' 
      });
    }
    
    res.json({
      success: true,
      message: 'Artículo eliminado correctamente'
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de artículo inválido' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = {
  getPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
};
