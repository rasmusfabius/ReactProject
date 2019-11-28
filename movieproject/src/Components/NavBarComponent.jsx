import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  state = {};

  search = e => {
    this.setState({
      searchKeyword: e.target.value
    });
  };
  render() {
    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
        <Link to='/'>
          <div className='navbar-brand' data-toggle='collapse' data-target='.navbar-collapse.show'>
            CARLITO MovieDB
          </div>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active' data-toggle='collapse' data-target='.navbar-collapse.show'>
              <Link to='/movies-in-theater' className='nav-link'>
                Movies In Theater
              </Link>
            </li>
          </ul>
          <form className='form-inline'>
            <input
              onKeyUp={this.search}
              className='form-control mr-sm-2'
              type='search'
              placeholder='Search movies'
              aria-label='Search'
            ></input>
            <Link to={'/search/' + this.state.searchKeyword}>
              <button
                className='btn btn-outline-success my-2 my-sm-0'
                type='submit'
                data-toggle='collapse'
                data-target='.navbar-collapse.show'
              >
                Search
              </button>
            </Link>
          </form>
        </div>
      </nav>
    );
  }
}

export default NavBar;
