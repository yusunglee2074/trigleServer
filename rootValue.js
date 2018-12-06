const mongoose = require('mongoose');

// db connection
const dbConfig = {
  dev: {
    name: 'dev',
    host: '10.211.55.5:27017/trigle-dev'
  },
  production: {
    name: 'production',
  }
}
const dbConnection = dbConfig.dev
// const dbConnection = dbConfig.production
mongoose.connect('mongodb://' + dbConnection.host, { useNewUrlParser: true });
if (mongoose.connection.readyState ==! 2) {
  throw Error("DB is not connected");
} else {
  console.log("DB is connected to \"" + dbConnection.name + "\"");
};

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
