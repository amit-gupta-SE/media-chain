import React from 'react'
import Video from '../assets/home.mp4'
import { Link } from 'react-router-dom'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username: '',
      password: ''
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  componentDidMount(){
    if(this.props.location.UnauthorizedAccess){
      window.alert('Unauthorized Access !!!')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.username==='annu' && this.state.password==='olliii'){
        console.log('welcome')
    }
    else{
        console.log('wrong username or password')
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target;
    if(name==='username'){
      this.setState({username:value})
      window.$username = value
    }
    else if(name==='password'){
      this.setState({password:value})
      window.$password = value
    }
  }

  render(){
    return (
      <div id='login' className="login-page">
        <video autoPlay='autoplay' loop='loop' className="homeVideo">
          <source src={Video} type="video/mp4"/>
        </video>
        <Link  to='/'><button type='submit' className='btn back-button btn-dark mt-3'>Back</button></Link>
        <h2 style={{fontSize:'50px'}} className='user-authentication'>
          Video Owner Authentication!!!
        </h2>
        <div>
          <form action='' onSubmit={this.handleSubmit}>
            <div className='d-flex flex-row'>
              <p className='label'>Username</p>
              <input onChange={this.handleChange} value={this.state.username} name='username' type='text' className='form-control input' placeholder='Username'/>
            </div>
            <div className='d-flex flex-row'>
              <p className='label'>Password</p>
              <input onChange={this.handleChange} value={this.state.password} name='password' type='password' className='form-control input' placeholder='Password'/>
            </div>
            <Link  to='/recipients'><button type='submit' className='btn btn-dark mt-3'>login!</button></Link>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
