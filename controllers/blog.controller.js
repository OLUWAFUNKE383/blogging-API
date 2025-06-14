const Blog = require('../models/blog.model');
const estimateReadingTime = require('../utils/readingTime');

exports.createBlog = async (req, res) => {
  const { title, description, tags, body } = req.body;
  const reading_time = estimateReadingTime(body);
  const blog = await Blog.create({
    title, description, tags, body,
    author: req.user._id,
    reading_time,
  });
  res.status(201).json(blog);
};

exports.getPublishedBlogs = async (req, res) => {
  const { page = 1, limit = 20, author, title, tags, orderBy = 'timestamp' } = req.query;
  const query = { state: 'published' };

  if (author) query.author = author;
  if (title) query.title = { $regex: title, $options: 'i' };
  if (tags) query.tags = { $in: tags.split(',') };

  const blogs = await Blog.find(query)
    .populate('author', 'first_name last_name email')
    .sort({ [orderBy]: -1 })
    .skip((page - 1) * limit)
    .limit(+limit);

  res.json(blogs);
};

exports.getSingleBlog = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id, state: 'published' })
    .populate('author', 'first_name last_name email');

  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  blog.read_count += 1;
  await blog.save();
  res.json(blog);
};


exports.getMyBlogs = async (req, res) => {
  const { page = 1, limit = 20, state } = req.query;
  const query = { author: req.user._id };

  if (state) query.state = state;

  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(+limit);

  res.json(blogs);
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  if (!blog.author.equals(req.user._id))
    return res.status(403).json({ message: 'Not authorized to update this blog' });

  const { title, description, body, tags, state } = req.body;

  if (title) blog.title = title;
  if (description) blog.description = description;
  if (body) {
    blog.body = body;
    blog.reading_time = require('../utils/readingTime')(body);
  }
  if (tags) blog.tags = tags;
  if (state) blog.state = state;

  await blog.save();
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  if (!blog.author.equals(req.user._id))
    return res.status(403).json({ message: 'Not authorized to delete this blog' });

  await blog.remove();
  res.json({ message: 'Blog deleted successfully' });
};