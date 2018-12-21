const Comment = require('./../schema/Comment').model;

module.exports = {
  comment: (args, ctx, info) => {
    console.log(ctx)
    return Comment.findById(args.id).populate('profileImage').exec()
  },
  comments: (args, ctx, info) => {
    return Comment.find({}).populate('profileImage').exec()
  },
  createComment: (args, ctx, info) => {
    let comment = new Comment(args.input);
    return comment.save();
  },
  updateComment: (args, ctx, info) => {
    return Comment.findByIdAndUpdate(args.id, args.input, { new: true });
  },
  deleteComment: async (args, ctx, info) => {
    if (await Comment.findByIdAndDelete(args.id)) return true;
    return false;
  },
}
