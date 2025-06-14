require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('./routes/blog.routes');
const swaggerDocs = require('./swagger/swagger');

const app = express();

connectDB();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use("/", (req, res) => {
  res.send("Server up and running")
})
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
