import { Router } from "express";
import { Op } from "sequelize";
import { Order } from "../models/index.js";

const orderRouter = Router();

orderRouter.get("/order", async (req, res) => {
  const obj = req.query.obj;
  const airports = await Order.findAll({
    limit: 10,
    where: {
      country: {
        [Op.like]: "%" + obj + "%",
      },
    },
  });
  res.json({airports: airports})
});

export default orderRouter
