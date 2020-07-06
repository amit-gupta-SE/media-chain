import React from 'react';
import axios from 'axios'
import Header from './header';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../App.css';
import { Link, Redirect } from 'react-router-dom'
import BackgroundVideo from '../assets/home.mp4'

class Recipients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authentified: '',
      columnDefs: [{
              headerName: "Email", field: "email",
            }, {
              headerName: "Contacted", field: "contacted"
            }, {
              headerName: "ViewCount", field: "viewCount"
            }],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
      },
      rowSelection: 'multiple',
      rowData: [],
      fileName: '',
    }
  }

  componentDidMount(){
    
    const messageData = {
      username: window.$username,
      password: window.$password
    }
    const url='https://media-chain.herokuapp.com/login'
    axios.post(url,messageData)
      .then(res=>{
        this.setState({authentified:res.data})
      })
      .catch(err=>console.log(err.data))


    fetch('https://media-chain.herokuapp.com/get-video-name')
      .then(res => res.json())
        .then(x => {
          this.setState({fileName:x.videoName})
          console.log(x.videoName)
        })
    fetch('https://media-chain.herokuapp.com/get-users')
      .then(res => res.json())
        .then(x => {
          var rows = x.map(row => ({email:row.email,contacted:'Yes',viewCount:row.views}))
          this.setState({rowData:rows})
        })
  }

  sendMails = (e) => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const emails = selectedData.map( node => node.email)
    for(var i=0;i<emails.length;i++){
      const url='https://media-chain.herokuapp.com/send-mails'
      const messageData = {
        email: emails[i]
      }
      axios.post(url,messageData)
        .then(res=>console.log(res))
        .catch(err=>console.log(err.data))
    }
    window.alert('Mails Sent!')
  }

  render() {
    if(this.state.authentified==='authentified'){
      return (
        <div>
          <Header/>
          <div id='recipients' className="col-9 offset-3 recipient-site-container d-flex justify-content-start">
            <button
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                window.open('http://localhost:3001','_self');
              }}
             className='btn upload-video-button btn-dark mt-5'>Upload Video</button>
             <input
              style={{width:'300px'}}
              type='text'
              className = 'form-control mt-5'
              value = {this.state.fileName===''?'No video addded':this.state.fileName}
              disabled = 'disabled'/>
            <h1 className='py-5'>
              All Recipients
            </h1>
            <div
              className="ag-theme-alpine"
              style={{
              height: '270px',
              width: '800px' }}
            >
              <AgGridReact
                onGridReady={ params => this.gridApi = params.api }
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                rowSelection={this.state.rowSelection}
                rowMultiSelectWithClick={true}
                rowData={this.state.rowData}>
              </AgGridReact>
              <button className='btn btn-dark mt-5 my-3' type='submit' onClick={this.sendMails}>Send authorization details</button>
            </div>
            <Link to='/add-block' className='btn btn-dark mt-5 my-3 add-recipient-button'>Add Recipient</Link>
          </div>
        </div>
      );
    }
    else if(this.state.authentified==='unauthentified'){
      return <Redirect to={{pathname:'/login',UnauthorizedAccess:'true'}}/>
    }
    return (
      <div>
        <video autoPlay='autoplay' loop='loop' className="homeVideo">
          <source src={BackgroundVideo} type="video/mp4"/>
        </video>
        <h1 style={{fontSize:'60px',color:'white'}}>
          Media Chain
        </h1>
        <h1 className='m-3' style={{fontSize:'50px',color:'white'}}>
          Verifying your accessibility ... 
        </h1>
      </div>
    )
  }
}

export default Recipients;
