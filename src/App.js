import React, { useState } from "react";
import "./App.css";

import { CardList } from "./Cards";
import { Navigation } from "./Navigation";
// import { CardModal } from "./CardsModal";

// import CardConstants from "./cards.json";

import cards from "./cards.json";

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b",
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>My PokeDex</h1>
      <CardList cardList={cards?.cards} />
      {/* <CardModal
        isOpen={modalOpen}
        onClose={closeModal}
        cardList={CardConstants?.cards}
      /> */}
      <Navigation />
    </div>
  );
}

export default App;
