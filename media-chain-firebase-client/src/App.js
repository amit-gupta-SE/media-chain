import React from 'react';
import AddBlock from './components/addBlockPage';
import Login from './components/loginPage';
import RecipientLogin from './components/recipientLoginPage';
import Recipients from './components/recipientsPage';
import MediaPlayer from './components/videoRoutePage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BackgroundVideo from './assets/home.mp4'
import './App.css';


window.$username = ''
window.$password = ''

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/recipients' exact component={Recipients} />
          <Route path='/add-block' exact component={AddBlock} />
          <Route path='/recipient-login' exact component={RecipientLogin} />
          <Route path='/media' exact component={MediaPlayer} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div id='home' className="home">
    <video autoPlay='autoplay' loop='loop' className="homeVideo">
      <source src={BackgroundVideo} type="video/mp4"/>
    </video>
    <h1 style={{fontSize:'60px'}}>
      Media Chain
    </h1>
    <div style={{height:'80vh'}} className='d-flex flex-column justify-content-center'>
      <Link to='/login'><button type='submit' style={{fontSize:'30px'}} className='button btn btn-dark m-5'>Owner's login</button></Link>
      <Link to='/recipient-login'><button type='submit' style={{fontSize:'30px'}} className='button btn btn-dark m-5'>User's login</button></Link>
    </div>
  </div>
)

export default App;
