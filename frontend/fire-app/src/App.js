import React from 'react';
import './App.css';
import FireMapApp from './components/FireMapApp';
// import FireMapAppData from './components/FireMapAppData';
import FireDetails from './components/FireDetails';
import Banner from './components/Banner'
import Footer from './components/Footer'
import { Route, Routes, useParams } from 'react-router-dom';
import SigninButton from './components/SignInButton';
import Login from './components/Login';
import Register from './components/Register';
import Hamburger from './components/Hamburger';
import Bookmark from './components/Bookmark';
import ViewBookMarks from './components/viewBookMarks';
import BookmarkPage from './components/bookmarkPage'
import SearchIncidentName from './components/searchByIncident';
function App() {
  const Home = () => {
    const isLoggin = () =>{
      let local = localStorage.getItem('loginData')
      if(local){
        return {display: 'block'}
      }else{
        return {display: 'none'}
      }
    }
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
          <div className='burger' style={isLoggin()} >
            <Hamburger/>
          </div>
          <nav id="navbar" className="navigation" role="navigation">
            {UserLogin()}
            <ViewBookMarks />
          </nav>
            <SearchIncidentName />
            <FireMapApp/>
        </main>
      </>
    )
  };

  const FireDetailsPage = () => {
    const { fireId } = useParams();
    return (
      <>
        <main>
          <div>
            <Bookmark fire_id={fireId} />
            <FireDetails
              fireId={fireId}
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
        <Route
          path ="/myBookmarks"
          element ={<BookmarkPage />}
          />
        </Routes>
        <Footer />
      </div>
    );
  }




export default App;