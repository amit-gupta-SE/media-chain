import React from 'react'
import $ from 'jquery'
import '../App.css'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  componentDidMount(){
    $(document).on('mouseenter','#home',function(){
      $("a.nav-item").removeClass('current')
      $("a.a-home").addClass('current')
    })
    $(document).on('mouseenter','#login',function(){
      $("a.nav-item").removeClass('current')
      $("a.a-login").addClass('current')
    })
    $(document).on('mouseenter','#recipients',function(){
      $("a.nav-item").removeClass('current')
      $("a.a-recipients").addClass('current')
    })
    $(document).on('mouseenter','#add-block',function(){
      $("a.nav-item").removeClass('current')
      $("a.a-add-block").addClass('current')
    })
  }

  render(){
    return(
      <div className='d-flex flex-column'>
        <Link to='/'><a href='#home' className='a-home nav-item nav-link text-white-50 font-os font-size-16 active'>Home</a></Link>
        <Link to='/login'><a href='#login' className='a-login nav-item nav-link text-white-50 font-os font-size-16 active'>Login</a></Link>
        <Link to='/recipients'><a href='#recipients' className='a-recipients nav-item nav-link text-white-50 font-os font-size-16 active'>Dashboard</a></Link>
        <Link to='/add-block'><a href='#add-block' className='a-add-block nav-item nav-link text-white-50 font-os font-size-16 active'>Add Block</a></Link>
      </div>
    )
  }
}

export default Navbar
