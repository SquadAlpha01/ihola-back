const { Sequelize } = require('sequelize')


// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('postgres://127.0.0.1:27017:5433/chat-app','kokokoko', {
//     dialect: 'postgres'
//   }) // Example for postgres
  const sequelize = new Sequelize('database_development', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433,
  })






const test=async()=>{try {
  await sequelize.sync()
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }}
  test()

module.exports=sequelize