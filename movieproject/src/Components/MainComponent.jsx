import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBarComponent';
import Footer from './FooterComponent';
import InTheater from './InTheater';
import MovieDetail from './MovieDetail';
import SearchComponent from './SearchComponent';

export const MainComponent = () => {
  return (
    <section>
      <Router>
        <NavBar />
        <div className='container-fluid'>
          <div className='container'>
            <Route path='/movie-detail/:movieId' component={MovieDetail} />
            <Route path='/movies-in-theater' component={InTheater} />
            <Route path='/search/:searchQuery' component={SearchComponent} />
          </div>
        </div>
        <Footer />
      </Router>
    </section>
  );
};

export default MainComponent;
