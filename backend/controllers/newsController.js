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

// GET /api/health
exports.getHealth = (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
};

// GET /api/news
exports.getAllNews = async (req, res) => {
  try {
    // ⚡ Bolt: Select only list fields (excluding heavy `content` column) to reduce payload size and network latency
    const { data, error } = await supabase
      .from('news')
      .select('id, title, slug, description, image_url, category, author, created_at')
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
    // ⚡ Bolt: Select only necessary fields for card previews, omitting large body text (`content`)
    const { data, error } = await supabase
      .from('news')
      .select('id, title, slug, description, image_url, category, author, created_at')
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
        .select('id, title, slug, description, image_url, category, author, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    const searchTerm = `%${q.trim()}%`;
    // ⚡ Bolt: Select only list fields for search results
    const { data, error } = await supabase
      .from('news')
      .select('id, title, slug, description, image_url, category, author, created_at')
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
