import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';

import './DataList.css';

class DataList extends Component {

  constructor(props) {
    super(props);
    this.state = { url: 'http://localhost:8080/api' };
  }

  componentDidMount() {

    // Load initial data
    const { url } = this.state;

    fetch(`${url}/data`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(res => {
        this.setState({
          ...this.state,
          data: res
        });
      });
  }

  render() {
    const { data } = this.state;

    const styles = {
      card: {
        maxWidth: 445,
        margin: '0 auto'
      }
    };
    return (
      <div className="DataList">
        {data && data.map((item, index) => (

          <Grid item xs={12} style={styles.card} key={index}>
            <Card>
              <CardContent>
                <Typography variant="headline" component="h2">
                  {item.itemId}
                </Typography>
                <List>
                  {item.content.split('|').map(function (row, i) {
                    return (
                      <ListItem divider key={i}>
                        <ListItemText primary={row}></ListItemText>
                      </ListItem>);
                  })}
                </List>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Add State</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </div>
    );
  }
}

export default DataList;
