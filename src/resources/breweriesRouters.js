const express = require('express')

const breweriesRouter = express.Router()

breweriesRouter.get("/:id", (req, res) => {
    let id = Number(req.params.id)

    let foundBrewery = breweries.find(brewery => {
        return brewery.id === id
    })
    console.log(`Found Brewery: ${foundBrewery}`)
    res.json(foundBrewery)
})

breweriesRouter.get("/", (req, res) => {
    const breweryType = req.query.brewery_type;

    if (breweryType) {
        const filteredBreweries = breweriesDB.filter(
            brewery => brewery.brewery_type === breweryType
        );

        const response = filteredBreweries.length
            ? filteredBreweries
            : "Can't find the brewery";

        res.json({ breweries: response });
    } else {
        res.json({ breweries: breweries });
    }
});

breweriesRouter.delete("/:id", (req, res) => {
    const brewery = breweries.find(brewery => brewery.id === parseInt(req.params.id))
    if (!breweries) return res.status(404).send('The breweries cannot be found')

    const index = breweries.indexOf(brewery)
    breweries.splice(index, 1)

    res.json(brewery)
})

breweriesRouter.post("/", (req, res) => {
    breweries.push(req.body)
    res.json(req.body)
})