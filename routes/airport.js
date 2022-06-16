import { Router } from "express";
import { Op } from "sequelize";
import { Airport } from "../models/index.js";

const airportRouter = Router();

airportRouter.get("/airport/search", async (req, res) => {
  const obj = req.query.obj;
  const airports = await Airport.findAll({
    limit: 10,
    where: {
      country: {
        [Op.like]: "%" + obj + "%",
      },
    },
  });
  res.json({airports: airports})
});

export default airportRouter
