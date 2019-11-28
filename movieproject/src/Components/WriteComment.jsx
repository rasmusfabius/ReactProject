import React, { Component } from 'react';
import POSTComment from '../API/POSTComment';

class WriteComment extends Component {
  captureComment = e => {
    e.preventDefault();
    let commentObject = {
      comment: document.querySelector('#comment').value,
      rate: document.querySelector('#rating').value,
      elementId: this.props.movieID
    };
    POSTComment(commentObject);
    document.querySelector('#comment').value = '';
    document.querySelector('#rating').value = 5;
    this.props.updateFn();
  };
  activateSubmit = () => {};

  render() {
    return (
      <form onSubmit={this.captureComment}>
        <div className='form-group'>
          <textarea
            required
            onChange={this.activateSubmit}
            className='form-control mb-2'
            id='comment'
            rows='3'
            placeholder='Write comment about the movie'
          ></textarea>
          <div className='input-group'>
            <select className='custom-select' id='rating' aria-label='Expample select button addon'>
              <option value='5'>Five</option>
              <option value='4'>Four</option>
              <option selected value='3'>
                Three
              </option>
              <option value='2'>Two</option>
              <option value='1'>One</option>
            </select>
            <div className='input-group-append'>
              <button className='btn btn-outline-secondary' type='submit'>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default WriteComment;
