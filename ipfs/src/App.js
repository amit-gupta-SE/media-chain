import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import ipfs from './ipfs'
import axios from 'axios'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null,
      fileName: ''
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    // this.state.web3.eth.getAccounts((error, accounts) => {
    //   simpleStorage.deployed().then((instance) => {
    //     this.simpleStorageInstance = instance
    //     this.setState({ account: accounts[0] })
    //     // Get the value from the contract to prove it worked.
    //     return this.simpleStorageInstance.get.call(accounts[0])
    //   }).then((ipfsHash) => {
    //     // Update state with the result.
    //     return this.setState({ ipfsHash })
    //   })
    // })
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    console.log(file)
    this.setState({fileName:file.name})
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit(event) {
    event.preventDefault()
    window.alert('Media processing has started ...')
    ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      console.log('result :',result)
      this.setState({ ipfsHash: result[0].hash })
      console.log('ifpsHash', this.state.ipfsHash)
      const messageData = {
        // videoName:
        fileName: this.state.fileName,
        videoHash: result[0].hash
      }
      const url='https://media-chain.herokuapp.com/add-video-hash'
      axios.post(url,messageData)
        .then(res=> {
            console.log(res)
            window.open('https://media-chain.web.app/login','_self')
          }
        )
        .catch(err=>console.log(err.data))
      // this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
      //   return this.setState({ ipfsHash: result[0].hash })
      //   console.log('ifpsHash', this.state.ipfsHash)
      // })
    })
  }

  render() {
    return (
      <div className="App site-container d-flex justify-content-start">
        <main className="container">
          <div>IPFS File Upload DApp</div>
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your Image</h1>
              <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
              <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} style={{height:'400px'}} alt=""/>
              <h2>Upload Image</h2>
              <form onSubmit={this.onSubmit} >
                <input type='file' onChange={this.captureFile} className='btn btn-dark m-5'/>
                <input type='submit' className='btn btn-dark m-5'/>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
