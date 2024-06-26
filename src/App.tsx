import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { PostsList } from './features/posts/PostsList.jsx';
import { AddPostForm } from './features/posts/AddPostForm.jsx';
import { SinglePostPage } from './features/posts/SinglePostPage.jsx';
import { EditPostForm } from './features/posts/EditPostForm.jsx';
import { UsersList } from './features/users/UsersList.jsx';
import { UserPage } from './features/users/UserPage.jsx';
import { CommentsList } from './features/comments/CommentsList.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <section>
                <React.Fragment>
                  <AddPostForm />
                  <PostsList />
                </React.Fragment>
              </section>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/comments" component={CommentsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App;