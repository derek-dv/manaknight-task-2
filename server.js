import express from "express";
import * as eta from "eta";
import fetch from "node-fetch";
import airportRouter from "./routes/airport.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("eta", eta.renderFile);

app.set("view engine", "eta");

app.get("/", (req, res) => {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=c2f3fa491a584071b62151033221606&q=yola&aqi=no`
  )
    .then((_res) => {
      if (_res.ok) return _res.json();
    })
    .then((_res) => {
      console.log(res.location.name);
      return res.render("test.eta", {
        place: _res.location.name,
        condition: _res.current.condition.text,
        humidity: _res.current.humidity,
        temperature: _res.current.temp_c
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // res.send("Too bad");
});

app.use("/api", airportRouter);
app.listen("3000", () => {
  console.log("listening at port 3000");
});
