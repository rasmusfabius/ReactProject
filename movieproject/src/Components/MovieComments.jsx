import React, { Component } from 'react';
import GETComments from '../API/GETComments';
import SingleComment from './SingleComment';
import WriteComment from './WriteComment';

class MovieComments extends Component {
  updateComments = async () => {
    this.setState({
      isLoading: true
    });

    console.log('Updating State');
    let comments = await GETComments(this.props.movieID);
    this.setState({
      isLoading: false,
      comments: comments
    });
  };

  state = {
    isLoading: true,
    comments: []
  };

  render() {
    let { comments, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className='spinner-grow' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      );
    } else
      return (
        <>
          {comments.length === 0 && (
            <div className='alert alert-info' role='alert'>
              No comments available. Be the first one to comment
            </div>
          )}
          {comments.length > 0 && (
            <ul className='list-group list-group-flush'>
              {comments.map((comment, index) => (
                <SingleComment key={index} comment={comment} updateFn={this.updateComments} />
              ))}
            </ul>
          )}
          <WriteComment movieID={this.props.movieID} updateFn={this.updateComments} />
        </>
      );
  }

  componentDidMount = async () => {
    let comments = await GETComments(this.props.movieID);
    this.setState({
      comments: comments,
      isLoading: false
    });
  };
  componentDidUpdate = () => {
    console.log('Movie Coments Compent update');
    console.log('Loading', this.state.loading);
  };
}

export default MovieComments;
