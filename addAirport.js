import fs from "fs";
import { parse } from "csv-parse";
import { Airport } from "./models/index.js";

const { default: country } = await import("./country.json", {
  assert: {
    type: "json",
  },
});

Airport.sync().then(async () => {
  fs.createReadStream("./airports.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", async function (row) {
      let json = {
        name: row[3],
        latitude: row[4],
        longitude: row[5],
        iso: row[8],
        country: country[row[8]],
      };
      await Airport.create(json)
    });
});
