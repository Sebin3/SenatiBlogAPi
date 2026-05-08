const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

// ============ RUTAS REST PARA ARTÍCULOS ============
router.get('/', getPosts);                       // GET /api/posts
router.get('/:id', getPostById);                 // GET /api/posts/:id
router.get('/author/:authorId', getPostsByAuthor); // GET /api/posts/author/:authorId
router.post('/', createPost);                    // POST /api/posts
router.put('/:id', updatePost);                  // PUT /api/posts/:id
router.delete('/:id', deletePost);               // DELETE /api/posts/:id

module.exports = router;
