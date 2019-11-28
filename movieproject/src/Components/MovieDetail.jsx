import React, { Component } from 'react';
import OMDBGETimdbID from '../API/OMDB-GET-imdbID';
import MovieComments from './MovieComments';

class MovieDetail extends Component {
  state = {
    isLoading: true
  };
  render() {
    let { movie, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className='spinner-grow' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      );
    } else {
      return (
        <div className='row my-2'>
          <div className='col-12 col-sm3 col-md-3 p-2 text-center'>
            <img
              src={movie.Poster === 'N/A' ? 'https://via.placeholder.com/300x445' : movie.Poster}
              className='img-thumbnail'
              alt={movie.Title}
              style={{ width: '100%' }}
            ></img>
          </div>
          <div className='col-12 col-sm-9 col-md-5 p2'>
            <ul className='list-group list-group-flush'>
              <li
                className='
                                list-group-item
                                font-weight-bold
                                bg-primary
                                text-white'
              >
                {movie.Title} ({movie.Year})<span className='badge badge-light float-right'>{movie.imdbRating}</span>
              </li>
              <li className='list-group-item'>Genre: {movie.Genre}</li>
              <li className='list-group-item'>{movie.Plot}</li>
            </ul>
          </div>

          <div className='col-md-4 p-2'>
            <MovieComments movieID={movie.imdbID} />
          </div>
        </div>
      );
    }
  }

  componentDidMount = async () => {
    let movieID = this.props.match.params.movieId;
    let movie = await OMDBGETimdbID(movieID);
    this.setState({
      movieID: movieID,
      movie: movie,
      isLoading: false
    });
  };
  componentDidUpdate = async () => {
    console.log('Movie Detail Component updated!');
  };
}
export default MovieDetail;
