import React from 'react'
import Video from '../assets/home.mp4'
import { Link } from 'react-router-dom'
import axios from 'axios'

class RecipientLogin extends React.Component{
  constructor(props){
    super(props)
    this.state={
      email: '',
      password: ''
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  componentDidMount(){
    if(this.props.location.aboutProps){
      if(this.props.location.aboutProps.codeExpired==='true'){
        window.alert('Your video access code is expired. To watch the video again request for new access code to the Video Owner !!!')
      }
      else if(this.props.location.aboutProps.codeExpired==='false'){
        window.alert('unauthorized Access !!!')
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(true){
      console.log('User authentified')
    }
    else{
        window.alert(`--submitting--
        wrong email or password
        `)
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target;
    if(name==='email'){
      this.setState({email:value})
    }
    else if(name==='password'){
      this.setState({password:value})
    }
  }

  requestPassword = () => {
    if(this.state.email===''){
      window.alert('Enter your email-id !!!')
    }
    else{
      const url='https://media-chain.herokuapp.com/request-new-password'
      const messageData = {
        email: this.state.email
      }
      axios.post(url,messageData)
        .then(res=>console.log(res))
        .catch(err=>console.log(err.data))
      window.alert('Request Sent!')
    }
  }

  render(){
    return (
      <div id='recipient-login' className="login-page">
        <video autoPlay='autoplay' loop='loop' className="homeVideo">
          <source src={Video} type="video/mp4"/>
        </video>
        <Link  to='/'><button type='submit' className='btn back-button btn-dark mt-3'>Back</button></Link>
        <h2 style={{fontSize:'50px'}} className='user-authentication'>
          Recipient Authentication!!!
        </h2>
        <div className=''>
        <form action='' onSubmit={this.handleSubmit}>
          <div className='d-flex flex-row'>
            <p className='label'>Email</p>
            <input onChange={this.handleChange} value={this.state.email} name='email' type='text' className='form-control input' placeholder='Email'/>
          </div>
          <div className='d-flex flex-row'>
            <p className='label'>Password</p>
            <input onChange={this.handleChange} value={this.state.password} name='password' type='password' className='form-control input' placeholder='Password'/>
          </div>
          <button
            type='submit'
            onClick={this.requestPassword}
           className='btn request-button btn-dark m-3'>Request for new password</button>
          <Link  to={{pathname:'/media',aboutProps:{email:this.state.email,password:this.state.password}}}><button type='submit' className='btn btn-dark m-3'>Watch video!</button></Link>
        </form>
        </div>
      </div>
    )
  }
}

export default RecipientLogin
