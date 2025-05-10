import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = () => {
	const [pokemonList, setPokemonList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [nextUrl, setNextUrl] = useState('');
	const [selectedPokemon, setSelectedPokemon] = useState(null);

	useEffect(() => {
		fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=20');
	}, []);

	const fetchPokemon = async (url) => {
		setLoading(true);
		try {
			const response = await axios.get(url);
			setNextUrl(response.data.next);

			const pokemonData = await Promise.all(
				response.data.results.map(async (pokemon) => {
					const pokemonResponse = await axios.get(pokemon.url);
					return pokemonResponse.data;
				})
			);

			setPokemonList((prevList) => [...prevList, ...pokemonData]);
		} catch (error) {
			console.error('Error fetching Pokemon:', error);
		} finally {
			setLoading(false);
		}
	};

	const loadMore = () => {
		if (nextUrl) {
			fetchPokemon(nextUrl);
		}
	};

	const handlePokemonClick = (pokemon) => {
		setSelectedPokemon(pokemon);
	};

	return (
		<div className="pokemon-container">
			<div className="pokemon-list">
				{pokemonList.map((pokemon) => (
					<div
						key={pokemon.id}
						className="pokemon-item"
						onClick={() => handlePokemonClick(pokemon)}
					>
						<img src={pokemon.sprites.front_default} alt={pokemon.name} />
						<p>#{pokemon.id.toString().padStart(3, '0')}</p>
						<h3>
							{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
						</h3>
					</div>
				))}
			</div>

			{loading && <div className="loading">Loading Pokémon...</div>}

			{!loading && nextUrl && (
				<button className="load-more" onClick={loadMore}>
					Load More
				</button>
			)}

			{selectedPokemon && (
				<div className="pokemon-detail">
					<button
						className="close-button"
						onClick={() => setSelectedPokemon(null)}
					>
						×
					</button>
					<PokemonCard pokemon={selectedPokemon} />
				</div>
			)}
		</div>
	);
};

export default PokemonList;
