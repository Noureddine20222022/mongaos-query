const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  postName: {
    type: String,
    required: [true, "post name is required"],
  },
  postContent: {
    type: String,
    required: [true, "post content is required"],
    minlength: 10,
  },
  category:{
    type: String,
    enum: process.env.CATEGORY.split(','),
    default: process.env.CATEGORY.split(',')[0],
  }

  // user: {
  //   type: mongoose.Types.ObjectId,
  //   ref : 'User',
  //   required:[true, "user is required"]
  // }
},
{timestamps:true}
);
module.exports =mongoose.model('Post',PostSchema)