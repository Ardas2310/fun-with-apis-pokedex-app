import { useState } from 'react';
import axios from 'axios';
import './PokemonSearch.css';

const PokemonSearch = ({ onPokemonFound }) => {
	const [pokemonSearch, setPokemonSearch] = useState('');
	const [error, setError] = useState('');

	const handleSearch = async (e) => {
		e.preventDefault();

		if (!pokemonSearch.trim()) {
			setError(`Please enter a Pokemon that exists or it's ID.`);
			return;
		}

		setError('');
		try {
			const response = await axios.get(`
                https://pokeapi.co/api/v2/pokemon/${pokemonSearch.toLowerCase()}`);
			onPokemonFound(response.data);
		} catch (error) {
			setError('Pokemon not found.');
			console.log('Error searching Pokemon: ', error);
		}
	};

	return (
		<div className="pokemon-search">
			<form onSubmit={handleSearch}>
				<input
					type="text"
					value={pokemonSearch}
					onChange={(e) => setPokemonSearch(e.target.value)}
					placeholder="Search by name..."
				/>
				<button type="submit">Search</button>
			</form>
			{error && <p className="error">{error}</p>}
		</div>
	);
};

export default PokemonSearch;
