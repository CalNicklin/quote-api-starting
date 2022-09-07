const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    res.send({
        quote: getRandomElement(quotes)
    });
})

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person !== undefined) {
        const entriesFromAuthor = quotes.filter(el => el.person === req.query.person)
        res.send({
            quotes: entriesFromAuthor
        });
    } else {
        res.send({
            quotes: quotes
        })
    }
});

app.post('/api/quotes', (req, res, next) => {
    if (req.query.quote !== undefined && req.query.person !== undefined) {
        quotes.push(req.query);
        res.status(200).send({
            quote: req.query
        })
    } else {
        res.status(400).send();
    }
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});