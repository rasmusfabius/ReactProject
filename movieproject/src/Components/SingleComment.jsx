import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import DELETEComment from '../API/DELETEComment';

const SingleComment = props => {
  const deleteComment = async commentID => {
    await DELETEComment(commentID);
    props.updateFn();
  };
  let comment = props.comment;
  return (
    <button
      onClick={() => {
        deleteComment(comment._id);
      }}
      className='list-group-item list-group-item-action list-group-item-light'
    >
      <div className='d-flex justify-content-between align-items-center'>
        {comment.comment}
        <span className='badge badge-primary badge-pill'>{comment.rate}</span>
      </div>

      <footer className='blockquote-footer'>
        by {comment.author} <Moment fromNow>{comment.updatedAt}</Moment>
      </footer>
    </button>
  );
};
export default SingleComment;
