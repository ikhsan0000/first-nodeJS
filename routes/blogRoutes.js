const express = require('express');

//controller
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/blog', blogController.blog_index);
router.get('/blog/create', blogController.blog_create_get);
router.post('/blog/create', blogController.blog_create_post);
router.get('/blog/:id', blogController.blog_details); //must be at the bottom because will clash with GET /blog/create ex. GET /blog/create will find blog with id of 'create' if this line is on top
router.delete('/blog/:id', blogController.blog_delete);
router.put('/blog/:id', blogController.blog_update)

module.exports = router;