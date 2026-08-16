const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Search endpoint must be registered before :slug route to avoid collision
router.get('/search', newsController.searchNews);
router.get('/category/:category', newsController.getNewsByCategory);
router.get('/', newsController.getAllNews);
router.get('/:slug', newsController.getNewsBySlug);

module.exports = router;
