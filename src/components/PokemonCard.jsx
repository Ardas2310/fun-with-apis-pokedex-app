import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
	if (!pokemon) return null;

	return (
		<div className="pokemon-card">
			<div className="pokemon-card-image">
				<img
					src={
						pokemon.sprites.other['official-artwork'].front_default ||
						pokemon.sprites.front_default
					}
					alt={pokemon.name}
				/>
			</div>
			<div className="pokemon-card-info">
				<span className="pokemon-card-id">
					#{pokemon.id.toString().padStart(3, '0')}
				</span>
				<h2 className="pokemon-card-name">
					{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
				</h2>
				<div className="pokemon-card-type">
					{pokemon.types.map((type) => (
						<span key={type.type.name} className={`type ${type.type.name}`}>
							{type.type.name}
						</span>
					))}
				</div>
				<div className="pokemon-card-stats">
					<div className="stat">
						<span>Height:</span> {pokemon.height / 10}m
					</div>
					<div className="stat">
						<span>Weight:</span> {pokemon.weight / 10}kg
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonCard;
