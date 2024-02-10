const { Sequelize } = require('sequelize')


//  const sequelize=new Sequelize(
//   "touchnpay","postgres","datacube",{
//     dialect:"postgres",
//     host:"localhost",
//     port:5432,
//     database:"touchnpay"
//   }
//  )
//production
const sequelize = new Sequelize(
  "touchnpay",
  "postgres",
  "touchnpay",
  {
    dialect: "postgres",
    host:"touchnpay.cjsmwmgci40n.ap-south-1.rds.amazonaws.com",
    port: 5432,
    database: "touchnpay",
  }
);

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.WalletTransactions = require('./wallet_transactions')(sequelize, Sequelize)
db.WithdrawRequests = require('./withdraw_requests')(sequelize, Sequelize)
db.PaymentSupports = require('./payment_supports')(sequelize, Sequelize)

module.exports = db
