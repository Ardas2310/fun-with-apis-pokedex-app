import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePokemon = (initialUrl) => {
	const [loading, setLoading] = useState(true);
	const [pokemonData, setPokemonData] = useState([]);
	const [nextUrl, setNextUrl] = useState('');
	const [error, setError] = useState('');

	const fetchPokemon = async (url) => {
		setLoading(true);
		try {
			const response = await axios.get(url);
			setNextUrl(response.data.next);

			const results = await Promise.all(
				response.data.results.map(async (pokemon) => {
					const pokemonResponse = await axios.get(pokemon.url);
					return pokemonResponse.data;
				})
			);
			setPokemonData((prevData) => [...prevData, ...results]);
		} catch (error) {
			setError(error);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPokemon(initialUrl);
	}, [initialUrl]);

	const loadMore = () => {
		if (nextUrl) {
			fetchPokemon(nextUrl);
		}
	};

	return { loading, error, loadMore, pokemonData, hasMore: !!nextUrl };
};
