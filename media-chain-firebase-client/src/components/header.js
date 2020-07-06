import React from "react"
import Navbar from './navbar'
import Logo from '../assets/media_chain.jpeg';
import '../App.css'

class Header extends React.Component{
  render(){
    return (
            <header id='header' className='ml-0'>
              <div className='row m-0'>
                <div className='col-3 p-0 bgcolor-black'>
                  <nav className='primary-nav navbar-expand-md'>
                    <img src={Logo} style={{width:'300px',height:'300px'}} alt='logo' />
                    <Navbar/>
                  </nav>
                </div>
              </div>
            </header>
          )
  }
}
export default Header
