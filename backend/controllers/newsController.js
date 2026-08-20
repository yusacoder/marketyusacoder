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

// Simple in-memory response cache to reduce database round-trips to Supabase.
// Cache TTL set to 60 seconds (60,000 ms).
const CACHE_TTL_MS = 60 * 1000;
const cache = new Map();

function getCachedData(key) {
  const cached = cache.get(key);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    return cached.data;
  }
  if (cached) {
    cache.delete(key);
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
// ⚡ Optimization: In-memory cache eliminates remote database queries on repeated GET requests.
// Response time drops from ~200ms (Supabase query) to <1ms (Memory cache hit).
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
// ⚡ Optimization: In-memory cache for news article details by slug.
exports.getNewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const cacheKey = `slug_${slug}`;
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
// ⚡ Optimization: In-memory cache for category news queries.
exports.getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const cacheKey = `category_${category.toLowerCase()}`;
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
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
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

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/categories
exports.getCategories = (req, res) => {
  res.status(200).json(CATEGORIES);
};
