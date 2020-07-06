import React from 'react'
import Form from './form';
import Header from './header';
import { Link } from 'react-router-dom';

class AddBlock extends React.Component{
  render(){
    if(window.$username===''){
      return (
        <div className='videoHomePage'>
          <h1 style={{color:'white'}}>First enter your credentials through login page ....</h1>
          <div style={{height:'80vh'}} className='d-flex flex-column justify-content-end'>
            <Link to='/login'><button type='submit' style={{fontSize:'30px'}} className='button btn btn-dark m-5'>Owner's login</button></Link>
          </div>
        </div>
      )
    }
    else{
      return (
        <div>
          <Header/>
          <div id='add-block' className="col-9 offset-3 site-container">
            <h2 className='mb-5'>
              Welcome Back!!!
            </h2>
            <h3>
              Add Recipient
            </h3>
            <h4 className='mb-5'>
              which new recipient should recieve links to the video?
            </h4>
            <Form/>
          </div>
        </div>
      )
    }
  }
}

export default AddBlock
