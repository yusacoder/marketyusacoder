const supabase = require('../services/supabase');

const CATEGORIES = [
  "Gündem",
  "Teknoloji",
  "Spor",
  "Dünya",
  "Ekonomi",
  "Eğlence",
  "Anime"
];

// Simple in-memory cache with TTL (60 seconds) to avoid redundant external DB calls to Supabase
const cache = new Map();
const CACHE_TTL_MS = 60 * 1000;

function getCachedData(key) {
  const cached = cache.get(key);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    return cached.data;
  }
  return null;
}

function setCachedData(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

// GET /api/health
exports.getHealth = (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
};

// GET /api/news
exports.getAllNews = async (req, res) => {
  try {
    const cacheKey = 'all_news';
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    setCachedData(cacheKey, data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/news/:slug
exports.getNewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const cacheKey = `news_slug_${slug}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      return res.status(404).json({ error: 'News item not found' });
    }

    setCachedData(cacheKey, data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/news/category/:category
exports.getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const cacheKey = `news_cat_${category.toLowerCase()}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .ilike('category', category)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    setCachedData(cacheKey, data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/news/search?q=
exports.searchNews = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return exports.getAllNews(req, res);
    }

    const queryClean = q.trim().toLowerCase();
    const cacheKey = `news_search_${queryClean}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const searchTerm = `%${q.trim()}%`;
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    setCachedData(cacheKey, data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/categories
exports.getCategories = (req, res) => {
  res.status(200).json(CATEGORIES);
};
