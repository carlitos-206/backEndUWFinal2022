import React from 'react';
import './App.css';
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
import logOut from './components/logOut';
import Register from './components/Register';
import { Link } from 'react-router-dom';
import Hamburger from './components/Hamburger';

function App() {

  const Home = () => {
    const UserLogin = () =>{
      if(localStorage.getItem('loginData')){
        let data = localStorage.getItem('loginData')
        let dataJSON = JSON.parse(data)
        if(dataJSON.token){
          const clear = () =>{
            localStorage.clear()
            window.location.reload()
          }
          return(
            <>
            <button onClick={clear}>LogOut</button>
            </>
            )
        }else{
          return(
            <SigninButton />
          )
        }
      }else{
        return(
          <SigninButton />
        )
      }
    }
    return (
      <>
        <main>
            <Banner />
            <nav id="navbar" className="navigation" role="navigation">
              {UserLogin()}
              <Hamburger />
            </nav>
          <FireMapApp/>
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

  const DeletePostPage = () => {
    const { id} = useParams();
    return (
      <>
        <main>
          <div >
            <DeletePost
              id={id}
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
      <>
        <main>
          <div >
            <Register
            />
          </div>
        </main>
      </>
    );
  }

    return (
  
      <div className="App">
  
        <Routes>
          <Route path="/" element={<Home />} />
  
          {/* Fire details to be displayed in balloon */}
          <Route
            path="/map/:fireId"
            element={<FireDetailsPage/>}
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