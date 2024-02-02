const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  'telega-bot',
  'Ivan',
  'AVNS_lcmRtUgdYpJ9UJnX4e2',
  {
    host: 'telegram-bg-do-user-15579380-0.c.db.ondigitalocean.com',
    port: '25060',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false, // This line will fix new error
      },
    },
  }
);
