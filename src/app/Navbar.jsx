import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchComments } from '../features/comments/commentsSlice.js';

export const Navbar = () => {
  const dispatch = useDispatch();

  const fetchNewComments = () => {
    dispatch(fetchComments());
  };

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/comments">Comments</Link>
          </div>
          <button className='button' onClick={fetchNewComments}>
            Refresh Comments
          </button>
        </div>
      </section>
    </nav>
  )
}