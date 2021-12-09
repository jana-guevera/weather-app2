const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");

var port = 3000;

if(process.env.PORT){
    port = process.env.PORT;
}

const app = express();

app.set("view engine", "hbs");

const partialsDirectory = path.join(__dirname, "../views/partials");
hbs.registerPartials(partialsDirectory);

const publicPathDirectory = path.join(__dirname, "../public");
app.use(express.static(publicPathDirectory));

var author = "Peter";

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        author: author
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Us",
        author: author
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        author: author
    });
});

app.get("/weather", (req, res) => {
    console.log("Weather request");

    if(!req.query.address){
        return res.send({
            error: "Please provide the address!"
        });
    }

    geocode(req.query.address, (error, response) => {
        if(error){
            return res.send({
                error: error
            });
        }

        forecast(response.latitude, response.longitute, (error, forecast) => {
            if(error){
                return res.send({
                    error: error
                });
            }

            res.send({
                forecast: forecast,
                location: response.location
            });

        });
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 Page not found!",
        author: author
    });
});

app.listen(port, () => {
    console.log("The server is listening in port 3000"); 
});