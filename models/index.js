import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("task2", "root", "mynewpassword", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("all good");
  })
  .catch((err) => {
    console.log(err);
  });

export const Airport = sequelize.define("Airport", {
  name: DataTypes.STRING,
  latitude: DataTypes.DECIMAL,
  longitude: DataTypes.DECIMAL,
  iso: DataTypes.STRING,
  country: DataTypes.STRING,
});


export const Order = sequelize.define('Order', {
  from_airport: DataTypes.STRING,
  to_airport: DataTypes.STRING,
  from_country: DataTypes.STRING,
  to_country: DataTypes.STRING,
  total: DataTypes.STRING,
  stripe_id: DataTypes.STRING,
  status: DataTypes.STRING
})
export default sequelize;
