import React, { Component } from 'react';
import axios from 'axios';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

export default class Pokemon extends Component {
  state = {
    name: '',
    pokemonIndex: '',
    imageUrl: '',
    types: [],
    description: '',
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAttack: '',
      specialDefense: ''
    },
    height: '',
    weight: '',
    eggGroup: '',
    abilities: '',
    genderRationMale: '',
    genderRationFemale: '',
    evs: '',
    hatchSteps: ''
  };

  async componentWillMount() {
    const { pokemonIndex } = this.props.match.params;

    // Urls for pokemon information
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    // Get Pokemon information

    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
      }
    });

    // Convert decimeters to feet ... The + 0.0001 * 100 /100 is for rounding to 2 deciaml places
    const height = Math.round((pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100;
    // Convert decimeters to pounds
    const weight = Math.round((pokemonRes.data.weight * 0.220462 + 0.0001) * 100) / 100;

    const types = pokemonRes.data.types.map(type => type.type.name);

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    const abilities = pokemonRes.data.abilities
      .map(ability => {
        return ability.ability.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
      })
      .join(', ');

    const evs = pokemonRes.data.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}`;
      })
      .join(', ');

    // Get Pokemon Description .... Is from a different end point uggh

    await axios.get(pokemonSpeciesUrl).then(res => {
      let description = '';
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === 'en') {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data['gender_rate'];
      const genderRationFemale = 12.5 * femaleRate;
      const genderRationMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

      const eggGroups = res.data['egg_groups']
        .map(group => {
          return group.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', ');

      const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

      this.setState({
        description,
        genderRationFemale,
        genderRationMale,
        catchRate,
        eggGroups,
        hatchSteps
      });
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      themeColor,
      height,
      weight,
      abilities,
      evs
    });
  }

  render() {
    return (
      <div className='col'>
        <div className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-5'>
                <h5>{this.state.pokemonIndex}</h5>
              </div>
              <div className='col-7'>
                <div className='float-right'>
                  {this.state.types.map(type => (
                    <span
                      key={type}
                      className='badge badge-pill mr-1'
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: 'white'
                      }}
                    >
                      {type
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row align-items-center'>
              <div className='col-md-3'>
                <img src={this.state.imageUrl} className='card-img-top rounded mx-auto mt-2' />
              </div>
              <div className='col-md-9'>
                <h4 className='mx-auto'>
                  {this.state.name
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}
                </h4>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>HP</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{
                          width: `${this.state.stats.hp}%`
                        }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Attack</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{
                          width: `${this.state.stats.attack}%`
                        }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Defence</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{
                          width: `${this.state.stats.defense}%`
                        }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Speed</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{
                          width: `${this.state.stats.speed}%`
                        }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Special Attack</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{
                          width: `${this.state.stats.specialAttack}%`
                        }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Special Defence</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{
                          width: `${this.state.stats.specialDefense}%`
                        }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mt-1'>
                <div className='col'>
                  <p className='p-2'>{this.state.description}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className='card-body'>
            <h5 class='card-title text-center'>Profile</h5>
            <div className='row'>
              <div className='col-md-6'>
                <div className='row'>
                  <div className='col-6'>
                    <h6 className='float-right'>Height:</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-left'>{this.state.height} ft.</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-right'>Weight:</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-left'>{this.state.weight} lbs</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-right'>Catch Rate:</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-left'>{this.state.catchRate}%</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-right'>Gender Ratio:</h6>
                  </div>
                  <div className='col-6'>
                    <div class='progress'>
                      <div
                        class='progress-bar'
                        role='progressbar'
                        style={{
                          width: `${this.state.genderRatioFemale}%`,
                          backgroundColor: '#c2185b'
                        }}
                        aria-valuenow='15'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{this.state.genderRatioFemale}</small>
                      </div>
                      <div
                        class='progress-bar'
                        role='progressbar'
                        style={{
                          width: `${this.state.genderRatioMale}%`,
                          backgroundColor: '#1976d2'
                        }}
                        aria-valuenow='30'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{this.state.genderRatioMale}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='row'>
                  <div className='col-6'>
                    <h6 className='float-right'>Egg Groups:</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-left'>{this.state.eggGroups} </h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-right'>Hatch Steps:</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-left'>{this.state.hatchSteps}</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-right'>Abilities:</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-left'>{this.state.abilities}</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-right'>EVs:</h6>
                  </div>
                  <div className='col-6'>
                    <h6 className='float-left'>{this.state.evs}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='card-footer text-muted'>
            Data From{' '}
            <a href='https://pokeapi.co/' target='_blank' className='card-link'>
              PokeAPI.co
            </a>
          </div>
        </div>
      </div>
    );
  }
}
