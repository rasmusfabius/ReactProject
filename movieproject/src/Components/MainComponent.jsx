import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBarComponent';
import Footer from './FooterComponent';

export const MainComponent = () => {
  return (
    <section>
      <Router>
        <NavBar />
        <div className='container-fluid'>
          <div className='container'></div>
        </div>
        <Footer />
      </Router>
    </section>
  );
};

export default MainComponent;
