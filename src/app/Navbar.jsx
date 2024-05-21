import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, selectAllComments } from '../features/comments/commentsSlice.js';

export const Navbar = () => {
  const dispatch = useDispatch();
  const comments = useSelector(selectAllComments);
  const numUnreadedComments = comments.filter(c => !c.read).length;

  const fetchNewComments = () => {
    dispatch(fetchComments());
  };

  let unreadedCommentsBadge;
  if (numUnreadedComments > 0) {
    unreadedCommentsBadge = (
      <span className='badge'>{numUnreadedComments}</span>
    );
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/comments">Comments {unreadedCommentsBadge}</Link>
          </div>
          <button className='button' onClick={fetchNewComments}>
            Refresh Comments
          </button>
        </div>
      </section>
    </nav>
  )
}