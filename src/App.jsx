import React, { useState } from 'react';
import PokemonList from './components/PokemonList';
import PokemonSearch from './components/PokemonSearch';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
	const [searchedPokemon, setSearchedPokemon] = useState(null);

	const handlePokemonFound = (pokemon) => {
		setSearchedPokemon(pokemon);
	};

	return (
		<div className="app">
			<header className="app-header">
				<h1>Pokidex</h1>
				<PokemonSearch onPokemonFound={handlePokemonFound} />
			</header>

			<main>
				{searchedPokemon && (
					<div className="search-result">
						<h2>Search Result</h2>
						<PokemonCard pokemon={searchedPokemon} />
						<button onClick={() => setSearchedPokemon(null)}>Clear</button>
					</div>
				)}

				<PokemonList />
			</main>
		</div>
	);
}

export default App;
