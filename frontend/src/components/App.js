import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import BasicTable from './Table';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { List, ListItemText } from "@mui/material";
import { ListItem } from "@mui/material";
import { Divider } from "@mui/material";
import { Container } from "@mui/material";


const mvpName = 'Rock-A-Ride'
const problemDescription = 'Enough bike thefts (and tolerance towards these scums), owning a bike will make a comeback in the city where not owning a bike should feel like a sin'


export default class App extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      parkings: []
    };
  }


  componentDidMount() {
    this.refreshList();
  }


  refreshList = () => {
    axios
      .get("/api/get-data")
      .then((res) => this.setState({parkings: res.data}))
      .catch((err) => console.log(err));
  };



  render() {

    return(
      //TODO: keep an eye on versions/numbers
      <div>
        <ProblemHeaders2
          mvp_name = {mvpName} 
          problem_description={problemDescription}/>
        <FilterableParkingsList
          parkings = {this.state.parkings}/>
        <OutroParag2/>
      </div>
    );
  }
}



class FilterableParkingsList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      schoolFilter: '',
      securityLevel: 1
    };
    this.props = {
      divSize: 0
    };

    this.handleSchoolFilterChange = this.handleSchoolFilterChange.bind(this);
    this.handleSecurityLevelChange = this.handleSecurityLevelChange.bind(this);
  }

  handleSchoolFilterChange(schoolFilter) {
    this.setState({
      schoolFilter: schoolFilter
    });
  }
  handleSecurityLevelChange(securityLevel) {
    this.setState({
      securityLevel: securityLevel
    });
  }

  render () {
    return (
    <div>
      <FilterBar 
        schoolFilter={this.state.schoolFilter}
        securityLevel={this.state.securityLevel}
        onSchoolFilterChange={this.handleSchoolFilterChange}
        onSecurityLevelChange={this.handleSecurityLevelChange}
      />
      <ParkingsList 
        parkings={this.props.parkings}
        schoolFilter={this.state.schoolFilter}
        securityLevel={this.state.securityLevel}
      />
    </div>
    );
  }
}

class ParkingsList extends React.Component {
  render() {
    const schoolFilter = this.props.schoolFilter;
    const securityLevel = this.props.securityLevel;

    const elements = [];
    const unInterestingElements = [];

    this.props.parkings.forEach((parking) => {
      if (parking.school.toUpperCase().indexOf(schoolFilter.toUpperCase()) === -1){
        unInterestingElements.push(
          <ParkingDiv
          parking={parking}
          key={parking.address} />
        )
        return;
      }
      if (parking.rating < securityLevel) {
        unInterestingElements.push(
          <ParkingDiv
          parking={parking}
          key={parking.address} />
        )
        return;
      }

      elements.push(
        <ParkingDiv
          parking={parking}
          key={parking.address} />
      )
    });

    return (
      <List>
        {elements}
        {unInterestingElements}
      </List>
    );
  }
}

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSchoolFilterChange = this.handleSchoolFilterChange.bind(this);
    this.handleSecurityLevelChange = this.handleSecurityLevelChange.bind(this);
  }
  

  handleSchoolFilterChange(e) {
    this.props.onSchoolFilterChange(e.target.value);
  }
  
  handleSecurityLevelChange(e) {
    this.props.onSecurityLevelChange(e.target.value);
  }

  
  render() {
    
    return (
      <div className="mildPadding"> 
      <form>
        <input
          type="text" 
          placeholder="Search by school..."
          value={this.props.schoolFilter}
          onChange={this.handleSchoolFilterChange} 
        />
        <label style={{paddingLeft:5}}>Rating:</label>
        <select
          value={this.props.securityLevel}
          onChange={this.handleSecurityLevelChange}>
          <option value="5">5</option>
          <option value="4">4 or more</option>
          <option value="3">3 or more</option>
          <option value="2">2 or more</option>
          <option value="1">1 or more</option>
        </select>
      </form>
      </div>
    )
  }
}

class ParkingDiv extends React.Component {
  render() {
    const parking = this.props.parking
    return (
      <ListItem>
        <List>
          <ListItem disablePadding>
            {parking.address}
          </ListItem>
          <ListItem disablePadding>
            {parking.school}
          </ListItem>
          <ListItem disablePadding>
            {parking.rating}
          </ListItem>
          <ListItem disablePadding>
            {parking.players}
          </ListItem>
        </List>
      </ListItem>
    )
  }
}

class ProblemHeaders extends React.Component {
  render() {
    return (
      <div>
        <h1>
          {this.props.mvp_name}
        </h1>
        <p>
          {this.props.problem_description}
        </p>
      </div>
    )
  }
}

class ProblemHeaders2 extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>Rock-A-<span className='headerPop'>Ride</span></h1>
          <p className='headerSubText'>
            {this.props.problem_description}
          </p>
        </div>

        <div className="content">
          <p>Find the most secure parking nearby your school:</p>
          <p>1. Enter your school name</p>
          <p>2. Filter by level of security and park with ease</p>
        </div>
      </div>
    )
  }
}

class OutroParag extends React.Component {
  render() {
    return (
      <footer>
        <h2>Contact us</h2>
        <p>
          email inquires: bicieamici@gmail.com
        </p>
        <div>
          <p>
            Yvon:
          </p>
          <blockquote>
            “Sometimes good ideas spring from having a sense of where you want to go, of having a vision of the next level of products.”
          </blockquote>
        </div>

      </footer>
    )
  }
}

class OutroParag2 extends React.Component {
  render() {
    return (
      <div className="container">
        <div class="row">
          <div className="column1">
            <div>
              <h2 id="nospacing">Contact Us</h2>
              <p>Leave any feedback or show interest in the project!<br></br> For having a talk too!!</p>
            </div>
            <div className="content">
              <p>email inquires: surpriding.spaces@gmail.com</p>
            </div>
          </div>
          <div className="column2">
            <p>“Sometimes good ideas spring from having a sense of where you want to go, of having a vision of the next level of products.” -Yvon Chouinard</p>
          </div>
        </div>
      </div>
    )
  }
}


const appDiv = document.getElementById("app");
render(<App />, appDiv);



/* ReactDOM.render(
  <FilterableParkingsList parkings={PARKINGS} />,
  document.getElementById('app')
); */


/* ReactDOM.render(
  <App style={{overflowY:'auto'}} />,
  document.getElementById('app')
); */
