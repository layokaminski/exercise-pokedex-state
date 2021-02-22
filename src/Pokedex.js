import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import './index.css';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.filterPokemons = this.filterPokemons.bind(this);
    this.nextPokemon = this.nextPokemon.bind(this);
    this.filteredPokemons = this.filteredPokemons.bind(this);
    this.arrayPokemonTypes = this.arrayPokemonTypes.bind(this);

    this.state = {pokemonIndex: 0, filteredType: 'all'};
  }

  filterPokemons(filteredType) {
    this.setState({pokemonIndex: 0, filteredType});
  }

  nextPokemon(numberPokemons) {
    this.setState(state => ({
      pokemonIndex: (state.pokemonIndex + 1) % numberPokemons,
    }));
  }

  filteredPokemons() {
    const { pokemons } = this.props;
    const { filteredType } = this.state;

    return pokemons.filter(pokemon => {
      if (filteredType === 'all') return pokemons;
      return pokemon.type === filteredType;
    });
  }

  arrayPokemonTypes() {
    const { pokemons } = this.props;

    return [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
  }

  render() {
    const filteredPokemons = this.filteredPokemons();
    const pokemonTypes = this.arrayPokemonTypes();
    const pokemon = filteredPokemons[this.state.pokemonIndex];

    return (
      <div className="pokedex">
        <Pokemon pokemon={pokemon} />
        <div className="pokedex-buttons-panel">
          <Button className="filter-button" onClick={() => this.filterPokemons('all')}>
            Todos
          </Button>
          {pokemonTypes.map(type => (
            <Button className="filter-button" key={ type } 
            onClick={ () => this.filterPokemons(type) }>
              {type}
            </Button>
          ))}
        </div>
        <Button className="pokedex-button" 
            onClick={ () => this.nextPokemon(filteredPokemons.length) }>
            Pŕoximo pokémon
        </Button>
      </div>
    );
  }
}

export default Pokedex;
