const User = require('./../schema/User').model;

module.exports = {
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
