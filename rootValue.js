let dummyAddress = [
  {
    id: 1,
    receiverName: "이유성" ,
    receiverId: 3,
    address1: '전남',
    address2: '목포',
    detailAddress: '동아아파트',
    profileImage: 3,
    numberOfSent: 0,
    numberOfReceived: 0,
  }
] 

module.exports = {
  createAddress: () => {
    return dummyAddress[0];
  }
}
