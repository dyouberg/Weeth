import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { url: 'http://localhost:8080' };

    this.createItem = this.createItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  componentDidMount() {
    // load all data
    const { url } = this.state;

    fetch(`${url}/data`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success:', response)
      this.setState({
        ...this.state,
        data: response,
      });
    });


    this.setState({
      url: 'http://localhost:8080',
    });
  }

  createItem() {
    console.log('create item');
    const { url } = this.state;

    const sampleData = {
      content: 'Here is some content',
      contractAddress: '0xABCDEF0123456',
      contractUrl: 'www.google.com',
      id: '1234567890',
      itemId: '123456'
    };
    
    fetch(url, {
      method: 'POST',
      body: sampleData, 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  searchItem(id) {
    console.log('search item');
    console.log(id);

    const { url } = this.state;
    
    fetch(`${url}/123456`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  editItem(id) {
    console.log('edit item');
    console.log(id);

    const { url } = this.state;

    const sampleUpdate = {
      content: 'Here is some updated content',
    };
    
    fetch(`${url}/123456`, {
      method: 'PUT',
      body: sampleUpdate,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <hr />
        <h5>Data: </h5>
        {data && data.map((item, index) => (
          <div className="item">
            <h5>Item Number {index}</h5>
            <p>Content: {item.content}</p>
            <p>Contract Address: {item.contractAddress}</p>
            <p>Contract URL: {item.contractUrl}</p>
            <p>Id: {item.Id}</p>
            <p>Item Id: {item.itemId}</p>

            <button onClick={() => this.searchItem(item.itemId)}>Search Item</button>
            <button onClick={() => this.editItem(item.itemId)}>Edit Item</button>
          </div>
        ))}
        <hr />
        <button onClick={this.createItem}>Create Item</button>
        <hr />
      </div>
    );
  }
}

export default App;
