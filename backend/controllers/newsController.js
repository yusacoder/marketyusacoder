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

// Fields required by news cards in list pages (excludes heavy `content` column to optimize network payload size & DB read)
const LIST_NEWS_FIELDS = 'id, title, slug, description, image_url, category, created_at';

// GET /api/health
exports.getHealth = (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
};

// GET /api/news
exports.getAllNews = async (req, res) => {
  try {
    // Select specific fields for news cards to prevent fetching heavy `content` column on list views
    const { data, error } = await supabase
      .from('news')
      .select(LIST_NEWS_FIELDS)
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

// GET /api/news/:slug
exports.getNewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    // Single item detail page requires all fields including full `content` and `author`
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      return res.status(404).json({ error: 'News item not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/news/category/:category
exports.getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    // Select specific fields for news cards to prevent fetching heavy `content` column on list views
    const { data, error } = await supabase
      .from('news')
      .select(LIST_NEWS_FIELDS)
      .ilike('category', category)
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

// GET /api/news/search?q=
exports.searchNews = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      const { data, error } = await supabase
        .from('news')
        .select(LIST_NEWS_FIELDS)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    const searchTerm = `%${q.trim()}%`;
    const { data, error } = await supabase
      .from('news')
      .select(LIST_NEWS_FIELDS)
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
