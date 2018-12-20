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
    let user = new User({
      loginId: args.input.loginId,
      password: args.input.password,
      name: args.input.name,
      nickname: args.input.nickname,
      age: args.input.age,
      replyRate: args.input.replyRate,
      lastOnlinedAt: args.input.lastOnlinedAt,
      address1: args.input.address1,
      address2: args.input.address2,
      detailAddress: args.input.detailAddress,
      phoneNumber: args.input.phoneNumber,
      gender: args.input.gender,
      birthDay: args.input.birthDay,
      profileImage: args.input.profileImage,
      numberOfStamps: args.input.numberOfStamps,
      createdAt: args.input.createdAt,
      updatedAt: args.input.updatedAt
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
