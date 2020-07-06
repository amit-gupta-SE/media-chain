import React from 'react';
import axios from 'axios'
import '../App.css';
import { Redirect } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';
import BackgroundVideo from '../assets/home.mp4'

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authentified: '',
      videoLink: '',
      codeExpired: '',
      noData: 'false'
    }
  }

  componentDidMount(){
    if(this.props.location.aboutProps){
      const recipientData = {
        email: this.props.location.aboutProps.email,
        password: this.props.location.aboutProps.password
      }
      const url='https://media-chain.herokuapp.com/authentify-recipient'
      axios.post(url,recipientData)
        .then(res=> {
          console.log(res.data)
          this.setState((state)=>{
            var videoLink = 'https://ipfs.io/ipfs/'+res.data.videoHash
            console.log(videoLink)
            return ({authentified:res.data.authentified,videoLink:videoLink,codeExpired:res.data.codeExpired})
          })
        })
        .catch(err=>console.log(err.data))
    }
    else{
      this.setState({noData:'true'})
    }
  }

  render() {
    if(this.state.noData==='true'){
      return (
        <div>
          <video autoPlay='autoplay' loop='loop' className="homeVideo">
            <source src={BackgroundVideo} type="video/mp4"/>
          </video>
          <h1 style={{fontSize:'60px',color:'white'}}>
            Media Chain
          </h1>
          <h1 className='m-5' style={{fontSize:'40px',color:'white'}}>
          First enter your credentials through login page .... 
          </h1>
          <div style={{height:'40vh'}} className='d-flex flex-column justify-content-end'>
            <Link to='/recipient-login'><button type='submit' style={{fontSize:'30px'}} className='button btn btn-dark m-5'>User's login</button></Link>
          </div>
        </div>
      )
    }
    else if(this.state.authentified==='true' && this.state.codeExpired==='false'){
      return (
        <div id='media-player' className='player-wrapper'>
        <ReactPlayer
          // Disable download button
          config={{ file: { attributes: { controlsList: 'nodownload' } } }}

          // Disable right click
          onContextMenu={e => e.preventDefault()}
          url={this.state.videoLink}
          width='100%'
          height='100%'
          className='react-player'
          progressInterval='10'
          controls={true}
          playing/>
        </div>
      );
    }
    else if(this.state.authentified==='false'){
      console.log('I dont know what HAPPENED')
      return <Redirect to={{pathname:'/recipient-login',aboutProps:{unauthorizedAccess:'true',codeExpired:'false'}}} />
    }
    else if(this.state.authentified==='true' && this.state.codeExpired==='true'){
      console.log('I dont know what HAPPENED')
      return <Redirect to={{pathname:'/recipient-login',aboutProps:{unauthorizedAccess:'false',codeExpired:'true'}}} />
    }
    return (
      <div>
        <video autoPlay='autoplay' loop='loop' className="homeVideo">
          <source src={BackgroundVideo} type="video/mp4"/>
        </video>
        <h1 style={{fontSize:'60px',color:'white'}}>
          Media Chain
        </h1>
        <h1 className='m-5' style={{fontSize:'50px',color:'white'}}>
          Verifying your accessibility ... 
        </h1>
      </div>
    )
  }
}

export default MediaPlayer;
