const express = require('express');
const router = express.Router();
const {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorController');

// ============ RUTAS REST PARA AUTORES ============
router.get('/', getAuthors);           // GET /api/authors
router.get('/:id', getAuthorById);     // GET /api/authors/:id
router.post('/', createAuthor);        // POST /api/authors
router.put('/:id', updateAuthor);      // PUT /api/authors/:id
router.delete('/:id', deleteAuthor);   // DELETE /api/authors/:id

module.exports = router;
