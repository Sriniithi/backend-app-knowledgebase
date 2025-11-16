const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error.middleware');

const postRoutes = require('./routes/post.routes');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/posts', postRoutes);
app.use("/test", require("./routes/test.route"));


// Error handler
app.use(errorHandler);

module.exports = app;
