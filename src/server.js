const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const app = express();

const { cards } = require("./../mock/cards.json");

app.use(cors());

app.get("/api/cards", (req, res) => {
  const { name, type, pageSize = 20, page = 1} = req.query;

  if (_.every([name, type], (item) => item === undefined)) {
    return res.json({ cards: cards.slice(0, pageSize) });
  }

  let filteredCards = [...cards]

  filteredCards = _.filter(cards, (card) => {
      const name = _.toUpper(_.get(req, "query.name", ""));
      const type = _.toUpper(_.get(req, "query.type", ""));
      const checkName = _.includes(_.toUpper(card.name), name);
      const checkType = _.includes(_.toUpper(card.type), type);
      return checkName || checkType;
    })
    
  // Calculate pagination indexes
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize, 10);

  // Get the current page of results
  const paginatedCards = filteredCards.slice(startIndex, endIndex);

  // Determine if there are more pages
  const hasMore = endIndex < filteredCards.length;

  res.json({ cards: paginatedCards, hasMore });
});

app.listen(3030, () => console.log("app start @ port 3030"));
