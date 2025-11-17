const { poolPromise } = require('../config/db.config');

exports.getAllPosts = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Posts");
    //testing out git 
    res.status(200).json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const pool = await poolPromise;

    await pool.request()
      .input("title", title)
      .input("content", content)
      .input("author", author)
      .query(
        "INSERT INTO Posts (title, content, author) VALUES (@title, @content, @author)"
      );

    res.status(201).json({ success: true, message: "Post created successfully!" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
