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
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
