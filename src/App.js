import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import logo from './ethereum.png';
import DataList from './DataList';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'http://localhost:8080/api',
      content: '',
      itemId: '',
      loading: false
    };

    this.createItem = this.createItem.bind(this);
  }

  componentDidMount() {

  }

  createItem(e) {
    e.preventDefault();
    const { url } = this.state;

    this.setState({ loading: true });

    fetch(`${url}/data`, {
      method: 'POST',
      body: JSON.stringify({ content: this.state.content, itemId: this.state.itemId }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .then((resJson) => this.setState({ loading: false }))
      .catch((error) => this.setState({ loading: false }))
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { loading, success } = this.state;
    const { classes } = this.props;

    const style = {
      height: '500px',
      marginBottom: '220px'
    };

    const list = {
      textAlign: 'center'
    }

    return (
      <div className="App">
        <Grid container>
          <Grid item xs={12} style={style}>
            <img src={logo} alt="" />
            <Typography variant="display3" style={{ marginTop: '20px' }} gutterBottom>
              Ethereum Seed to Sale API
            </Typography>
            <form autoComplete="off" onSubmit={this.createItem}>
              <TextField
                id="itemId"
                required
                placeholder="Item id (CMS id)"
                margin="normal"
                value={this.state.itemId}
                onChange={this.handleChange('itemId')}
              /><br /><br />
              <TextField
                id="content"
                required
                multiline
                rowsMax="4"
                placeholder="Item state"
                value={this.state.content}
                onChange={this.handleChange('content')}
              /><br /><br />
              <Button variant="raised" type="submit" size="large" disabled={loading}>
                Create an item
              </Button>
              {loading && <CircularProgress size={24} />}
            </form>
          </Grid>
          <Grid item xs={12} style={list}>
            <DataList></DataList>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(() => ({
  
}))(App);
