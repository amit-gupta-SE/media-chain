import axios from 'axios'
import React from 'react'
import '../App.css'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid = (email,formErrors) => {
  let valid = true
  if(email==null){
    return false
  }
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false)
  });
  return valid
}

class Form extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: null,
      formErrors: {
        email: "",
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    if(formValid(this.state.email,this.state.formErrors)){
        const messageData = {
          email: this.state.email
        }
        const url='https://media-chain.herokuapp.com/add-block'
        axios.post(url,messageData)
          .then(res=>console.log(res))
          .catch(err=>console.log(err.data))
        window.alert('Message Sent!')
    }
    else{
        window.alert(`--submitting--
        email: ${this.state.formErrors.email.length > 0 ? this.state.formErrors.email : this.state.email || 'empty input'}
        `)
    }
  }

  handleChange = e => {
    e.preventDefault()
    const {name, value} = e.target;
    let formErrors = this.state.formErrors

    switch(name){
      case 'email':
        formErrors.email = (emailRegex.test(value)) ? '' : 'invalid email address'
        break
      default:
        break
    }
    this.setState({formErrors, [name]: value})
  }

  render(){
    const { formErrors } = this.state

    return(
      <form action='' onSubmit={this.handleSubmit} className='py-3'>
        <p>
          Enter the email-address
        </p>
        <div className='row'>
          <input onChange={this.handleChange} name='email' type='email' className={`form-control ${formErrors.email.length > 0 ? 'error' : null}`} placeholder='Email'/>
        </div>
        <div className='row'>
        {formErrors.email.length > 0 && (<div className='emailErrorMessage col'><span>{formErrors.email}</span></div>)}
        </div>
        <button onChange={this.handleChange} type='submit' className='my-5 btn btn-dark'>Add Recipient</button>
      </form>
    )
  }
}

export default Form
