const {
  createpostcontroller,
  getpostbyidcontroller,
  getPostscontroller,
  deletepostecontroller,
  updatePostscontroller,
} = require("../controllers/postController");

const postrouter = require("express").Router();
postrouter.route('/').get(getPostscontroller).post(createpostcontroller)
postrouter.route('/:id').get(getpostbyidcontroller).patch(updatePostscontroller).delete(deletepostecontroller)
module.exports =postrouter