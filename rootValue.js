module.exports = {
  createAddress: (args, context, info) => {
    return dummyAddress[0];
  },
  getAddresses: (obj, args, context) => {
    return dummyAddress
  }
}
