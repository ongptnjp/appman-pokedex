import React, { useState, useEffect } from "react";
import "./App.css";

import Pokedex from "./Pokedex/Pokedex";
import Navigation from "./Navigation/NavigationBar";
import CardModal from "./CardsModal/CardModal";

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
  const [pokedex, setPokedex] = useState([]);
  const [pokemonCards, setPokemonCards] = useState([]);

  const [words, setWords] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20); // Set your desired page size
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemonCards = () => {
    if (!hasMore) return;

    fetch(
      `http://localhost:3030/api/cards?pageSize=${pageSize}&page=${page}&name=${words}&type=${words}`
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedPokemonCards = data?.cards?.filter(
          (c) => !pokedex.find((pokedexCard) => pokedexCard.id === c.id)
        );
        
        if (page === 1 ) {
          setPokemonCards([...updatedPokemonCards]);
        } else {
          setPokemonCards([...pokemonCards, ...updatedPokemonCards]);
        }
        setPage(page + 1);
        setHasMore(data.hasMore);
      })
      .catch((error) => console.error(error));
  }

  const openModal = () => {
    if (pokemonCards.length <= 0) {
      fetchPokemonCards();
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // Fetch Pokemon cards when words changes
    fetchPokemonCards();
  }, [words]);

  const handleOnChangeSearch = (event) => {
    const newWords = event?.target?.value;
    // Reset the page to 1 when the search query changes
    setPage(1);
    setWords(newWords);
    setHasMore(true)
  }

  const handleAddToPokedex = (card) => {
    // Add the card to your Pokedex
    setPokedex([...pokedex, card]);

    // Remove the card from the list of available Pokemon cards
    const updatedPokemonCards = pokemonCards.filter((c) => c.id !== card.id);
    setPokemonCards(updatedPokemonCards);
  };

  const handleRemoveFromPokedex = (card) => {
    // Remove the card from your Pokedex
    const updatedPokedex = pokedex.filter((c) => c.id !== card.id);
    setPokedex(updatedPokedex);

    // Add the card back to the list of available Pokemon cards
    setPokemonCards([...pokemonCards, card]);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>My PokeDex</h1>
      <Pokedex cards={pokedex} onRemove={handleRemoveFromPokedex} />
      <CardModal
        isOpen={modalOpen}
        onClose={closeModal}
        pokemonCards={pokemonCards}
        onSetPokemonCards={setPokemonCards}
        addCard={handleAddToPokedex}
        words={words}
        onChangeWords={handleOnChangeSearch}
        hasMore={hasMore}
        handleLoadMore={fetchPokemonCards}
      />
      <Navigation onOpenModal={openModal} />
    </div>
  );
}

export default App;
