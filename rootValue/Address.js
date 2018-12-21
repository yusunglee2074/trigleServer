const Address = require('./../schema/Address').model;

module.exports = {
  address: (args, ctx, info) => {
    return Address.findById(args.id).populate('profileImage').populate('receiverId').exec()
  },
  addresses: (args, ctx, info) => {
    return Address.find({}).populate('receiverId').populate('profileImage').exec()
  },
  createAddress: (args, ctx, info) => {
    let address = new Address(args.input);
    return address.save();
  },
  updateAddress: (args, ctx, info) => {
    return Address.findByIdAndUpdate(args.id, args.input, { new: true });
  },
  deleteAddress: async (args, ctx, info) => {
    if (await Address.findByIdAndDelete(args.id)) return true;
    return false;
  },
}
