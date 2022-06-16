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

export default sequelize;
