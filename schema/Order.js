const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    status: String,
    createdAt: Date,
});

let model = mongoose.model('Order', orderSchema);
module.exports = { model, types: `
  type Order {
    id: ID!
    userId: User
    amount: Int
    status: String
    createdAt: String
  }
  input OrderCreateInput {
    userId: ID
    amount: Int
    status: String
  }
  input OrderUpdateInput {
    userId: ID
    amount: Int
    status: String
  }
  `,
  queries: `
  order(id: ID): Order
  orders: [Order]
  `,
  mutations: `
  createOrder(input: OrderCreateInput) : Order
  updateOrder(id: ID, input: OrderUpdateInput): Order
  deleteOrder(id: ID): Boolean
  `
}
