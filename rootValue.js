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
    return User.findById(args.id, (e, user) => {
      if (e) {
        throw e;
      }
      return user;
    })
  },
  users: (args, ctx, info) => {
    return User.find({}, (e, user) => {
      if (e) {
        throw e;
      }
      return user;
    })
  },
  createUser: (args, ctx, info) => {
    let user = new User({
      id: args.input.id,
      loginId: args.input.loginId,
      password: args.input.password,
      name: String,
      nickname: String,
      age: Number,
      replyRate: Number,
      lastOnlinedAt: String,
      address1: String,
      address2: String,
      detailAddress: String,
      phoneNumber: String,
      gender: String,
      birthDay: String,
      profileImage: String,
      numberOfStamps: Number,
      createdAt: Date,
      updatedAt: Date,
    })
    return user.save();
  },
  updateUser: (args, ctx, info) => {
  },
  deleteUser: (args, ctx, info) => {
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
