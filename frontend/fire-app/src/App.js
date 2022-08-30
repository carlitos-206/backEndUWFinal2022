import React from 'react';
import './App.css';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import DeletePost from './components/DeletePost';
import EditPost from './components/EditPost';
import FireMapApp from './components/FireMapApp';
// import FireMapAppData from './components/FireMapAppData';
import FireDetails from './components/FireDetails';
import Banner from './components/Banner'
import Footer from './components/Footer'
import { Route, Routes, useParams } from 'react-router-dom';
import SigninButton from './components/SignInButton';
import Login from './components/Login';
import Register from './components/Register';
import { Link } from 'react-router-dom';

function App() {

  const Home = () => {

    return (
      <>
        <main>
          <div className="row">
            <header  >
              <Banner />
            </header>
            <nav  >
              <SigninButton />
              <Link to={`/posts`}><button className="submit-btn">Create a Post</button></Link>
            </nav>
          </div>
          <FireMapApp />
          <Footer />
        </main>
      </>
    )
  };

  const FireDetailsPage = () => {
    const { fireId } = useParams();
    return (
      <>
        <main>
          <div >
            <FireDetails
              fireId={fireId}
            />
          </div>
        </main>
      </>
    );
  }

  const PostsPage = () => {
    const { userId } = useParams();
    return (
      <>
        <main>
          <header>
          <Banner />
          </header>
          <div >
            <Posts
              
            />
          </div>
        </main>
      </>
    );
  }

  const CreatePostPage = () => {
    const { postId } = useParams();
    return (
      <>
        <main>
          <div >
            <CreatePost
              postId={postId}
            />
          </div>
        </main>
      </>
    );
  }

  const DeletePostPage = () => {
    const { postId } = useParams();
    return (
      <>
        <main>
          <div >
            <DeletePost
              postId={postId}
            />
          </div>
        </main>
      </>
    );
  }

  const EditPostPage = () => {
    const { postId } = useParams();
    return (
      <>
        <main>
          <div >
            <EditPost
              postId={postId}
            />
          </div>
        </main>
      </>
    );
  }

  const LoginPage = () => {
    return (
      <>
        <main>
          <div >
            <Login
            />
          </div>
        </main>
      </>
    );
  }

  const RegisterPage = () => {
    return (
  
      <div className="App">
  
        <Routes>
          <Route path="/" element={<Home />} />
  
          {/* Fire details to be displayed in balloon */}
          <Route
            path="/map/:fireId"
            element={<FireDetailsPage/>}
          />
          {/* Page displaying the posts for a user */}
          <Route
            path="/posts/:userId"
            element={<MyPostsPage />}
          />
          {/* Page with blank fields to add a post from MyPosts page */}
          <Route
            path="/posts/:postId"
            element={<CreatePostPage />}
          />
          {/* Do we need a delete route or will this be javascript from the delete button on the My Posts Page? */}
          <Route
            path="/posts/:postId"
            element={<DeletePostPage />}
          />
          {/* Page with fields populated for exist post that a user can edit from My Posts Page */}
          <Route
            path="/posts/:postId"
            element={<EditPostPage />}
          />
        </Routes>
  
      </div>
    );
  }


  return (

    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Fire details to be displayed in balloon */}
        <Route
          path="/map/:fireId"
          element={<FireDetailsPage />}
        />
        {/* Page displaying the posts for a user */}
        <Route
          path="/posts"
          element={<PostsPage />}
        />
        {/* Page with blank fields to add a post from MyPosts page */}
        <Route
          path="/posts/:postId"
          element={<CreatePostPage />}
        />
        {/* Do we need a delete route or will this be javascript from the delete button on the My Posts Page? */}
        <Route
          path="/posts/:postId"
          element={<DeletePostPage />}
        />
        {/* Page with fields populated for exist post that a user can edit from My Posts Page */}
        <Route
          path="/posts/:postId"
          element={<EditPostPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

      </Routes>



    </div>
  );

}

export default App;