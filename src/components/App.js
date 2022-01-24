import React, { Component } from 'react';
import './App.css';

class App extends Component {

  captureFile = (event) =>{
    event.preventDefault()
    console.log("File is captured!")

    //process file for IPFS
    console.log(event.target.files[0])

    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)

    reader.onloadend = () =>{
      console.log(Buffer(reader.result))
    }

    //console.log("Buffer2: ", this.state.buffer)
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>FileShare</i>
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                  <img src={"https://ipfs.infura.io/ipfs/QmQawtxnXrqT1QyodQnSVj6Hwqaib97GNMrqk7c44Cadwf"} className="App-logo" alt="logo" />

                <p>&nbsp;</p>
                <h1>Upload and Share Your File Privately!</h1>

                <p>
                  <i>Utilized <code>Ethereum Blockchain</code> and <code>IPFS</code> Technologies </i>
                </p>
                <p>&nbsp;</p>
                
                <form>
                  <input type="file" onChange={this.captureFile}/>
                  <input type="submit" />
                </form>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
