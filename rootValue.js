const Media = require('./schema/Media').model;
const User = require('./schema/User').model;

module.exports = {
  createAddress: (args, ctx, info) => {
    return dummyAddress[0];
  },
  getAddresses: (obj, args, context) => {
    return dummyAddress
  },


  // User
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

  // Media
  media: (args, ctx, info) => {
    return Media.findById(args.id, (e, media) => {
      if (e) {
        throw e;
      }
      return media;
    })
  },
  medias: (args, ctx, info) => {
    return Media.find({}, (e, medias) => {
      if (e) {
        throw e;
      }
      return medias;
    })
  },
  createMedia: (args, ctx, info) => {
    let media = new Media({
      url: args.input.url,
      text: args.input.text,
      createdAt: new Date().toISOString()
    })
    return media.save();
  },
  updateMedia: (args, ctx, info) => {
    return Media.findByIdAndUpdate(args.id, { 
      url: args.input.url,
      text: args.input.text,
    }, { new: true });
  },
  deleteMedia: (args, ctx, info) => {
    return Media.findByIdAndDelete(args.id, (e) => {
      if (e) {
        throw e;
      }
      return true;
    });
  },
}
