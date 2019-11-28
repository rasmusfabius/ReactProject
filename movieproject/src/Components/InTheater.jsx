import React, { Component } from 'react';
import SingleMovie from './SingleMovie';

const inTheater = [
  {
    imdbID: 'tt7286456'
  },
  {
    imdbID: 'tt9248934'
  },
  {
    imdbID: 'tt1025100'
  },
  {
    imdbID: 'tt4520988'
  },
  {
    imdbID: 'tt9763442'
  },
  {
    imdbID: 'tt0241527'
  }
];

const InTheater = () => {
  return (
    <>
      <h3 className='display-4'>In Theater</h3>

      <div className='row'>
        {inTheater.map((movie, index) => (
          <SingleMovie movie={movie} key={index} />
        ))}
      </div>
    </>
  );
};
export default InTheater;
