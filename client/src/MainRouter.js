import React, { useContext, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import MainNavigation from './components/MainNavigation/MainNavigation.js';
import Tags from './components/Tags/Tags';
import { SearchContext } from './context/search';
import Footer from './components/Footer/Footer';
import { AuthContext } from './context/auth';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { BrowserRouter as Router } from 'react-router-dom';

const Auth = React.lazy(() => import('./pages/Auth/Auth'));
const UserProfile = React.lazy(() => import('./pages/UserProfile/UserProfile'));
const EditUserProfile = React.lazy(() =>
  import('./pages/EditUserProfile/EditUserProfile')
);
const Notifications = React.lazy(() =>
  import('./pages/Notifications/Notifications')
);
const Tag = React.lazy(() => import('./pages/Tag/Tag'));
const Post = React.lazy(() => import('./pages/Post/Post'));
const SearchResults = React.lazy(() =>
  import('./pages/SearchResults/SearchResults')
);
const NewPost = React.lazy(() => import('./pages/NewPost/NewPost'));
const EditPost = React.lazy(() => import('./pages/EditPost/EditPost'));
const ReadingList = React.lazy(() => import('./pages/ReadingList/ReadingList'));

const MainRouter = ({ token }) => {
  let routes;
  const { searched } = useContext(SearchContext);
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn) {
    routes = (
      <>
        <MainNavigation />
        {searched ? (
          <SearchResults />
        ) : (
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/users/:userId' exact>
              <UserProfile />
            </Route>
            <Route path='/users/:userId/edit' exact>
              <EditUserProfile />
            </Route>
            <Route path='/users/:userId/readinglist' exact>
              <ReadingList />
            </Route>
            <Route path='/users/:userId/notifications' exact>
              <Notifications />
            </Route>
            <Route path='/auth' exact>
              <Auth newUser={false} />
            </Route>
            <Route path='/tags' exact>
              <Tags />
            </Route>
            <Route path='/tags/:tagName' exact>
              <Tag />
            </Route>
            <Route path='/search/' exact>
              <SearchResults />
            </Route>
            <Route path='/posts/new' exact>
              <NewPost />
            </Route>
            <Route path='/posts/:titleURL/:postId' exact>
              <Post />
            </Route>
            <Route path='/posts/:titleURL/:postId/edit' exact>
              <EditPost />
            </Route>
            <Redirect to='/auth' />
          </Switch>
        )}
        <Footer />
      </>
    );
  } else {
    routes = (
      <>
        <MainNavigation />
        {searched ? (
          <SearchResults />
        ) : (
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/auth/new-user' exact>
              <Auth newUser={true} />
            </Route>
            <Route path='/auth' exact>
              <Auth newUser={false} />
            </Route>
            <Route path='/tags' exact>
              <Tags />
            </Route>
            <Route path='/tags/:tagName' exact>
              <Tag />
            </Route>
            <Route path='/search/' exact>
              <SearchResults />
            </Route>
            <Route path='/users/:userId' exact>
              <UserProfile />
            </Route>
            <Route path='/posts/:titleURL/:postId' exact>
              <Post />
            </Route>
            <Redirect to='/auth' />
          </Switch>
        )}
        <Footer />
      </>
    );
  }
  return (
    <Router>
      <Suspense
        fallback={
          <div className='center'>
            <LoadingSpinner asOverlay={true} />
          </div>
        }
      >
        {routes}
      </Suspense>
    </Router>
  );
};

export default MainRouter;
