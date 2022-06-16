import express from "express";
import Stripe from "stripe";
import bodyparser from "body-parser"
import * as eta from "eta";
import fetch from "node-fetch";
import airportRouter from "./routes/airport.js";

const stripe = Stripe('sk_test_51IWQUwH8oljXErmds28KftkL6o6jYIcPgYbBdfEmCPSuAlIh0fgoS4NADcCmsIZbdQ3p5nbAeCOcGkSmo38U9BIe00BdOenrqo')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 
app.engine("eta", eta.renderFile);

app.set("view engine", "eta");

app.post('/payment', function(req, res){ 

  // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({ 
      email: req.body.stripeEmail, 
      source: req.body.stripeToken, 
      name: 'Derek David', 
      address: { 
          line1: 'TC 9/4 Old MES colony', 
          postal_code: '410109', 
          city: 'Yola', 
          state: 'Adamawa', 
          country: 'Nigeria', 
      } 
  }) 
  .then((customer) => { 

      return stripe.charges.create({ 
          amount: 7000,    // Charing Rs 25 
          description: 'Web Development Product', 
          currency: 'USD', 
          customer: customer.id 
      }); 
  }) 
  .then((charge) => { 
      res.send("Success") // If no error occurs 
  }) 
  .catch((err) => { 
      res.send(err)    // If some error occurs 
  }); 
}) 


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
        temperature: _res.current.temp_c,
        secret: 'pk_test_51IWQUwH8oljXErmdg6L4MhsuB6tDdmumlHFfyNaopty2U27pmRcqMX1c868zn838lGQtU1eYV6bKRSQtMFWf36VT00aNsvnTOE'
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // res.send("Too bad");
});

app.use("/api", airportRouter);
app.listen("3001", () => {
  console.log("listening at port 3000");
});
