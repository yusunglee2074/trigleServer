const User = require('./../schema/User').model;

module.exports = {
  user: (args, ctx, info) => {
    return User.findById(args.id).populate('profileImage').exec()
  },
  users: (args, ctx, info) => {
    return User.find({}).populate('profileImage').exec()
  },
  createUser: (args, ctx, info) => {
    let user = new User(args.input);
    return user.save();
  },
  updateUser: (args, ctx, info) => {
    return User.findByIdAndUpdate(args.id, args.input, { new: true });
  },
  deleteUser: async (args, ctx, info) => {
    if (await User.findByIdAndDelete(args.id)) return true;
    return false;
  },
}
