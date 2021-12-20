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
import EmojiPeopleSharpIcon from '@mui/icons-material/EmojiPeopleSharp';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import EmojiPeopleSharp from "@mui/icons-material/EmojiPeopleSharp";


const mvpName = 'Rock-A-Ride'
const problemDescription = 'Solving bicycle theft with a people-first approach'
const problemDescription2 = 'Enough bike thefts (and tolerance towards these scums), owning a bike will make a comeback in the city where not owning a bike should feel like a sin'
const howTo = 'Le attività convenzionate sono locali o botteghe che mettono a disposizione le loro risorse per rendere i parcheggi di biciclette piu" sicuri'
const howToE = "al suono dell'allarme i responsabili dell'attività interverrano chiamando le forze dell'ordine"
const howto1= "La prima cosa da fare è (salutare, poi) avvertire che stiamo parcheggiando la nostra bicicletta"
const howTo2 = "Successivamente potremmo parcheggiare la nostra bicicletta sapendo che un paio di occhi e di orecchie in piu' la stanno sorvegliando"
const howTo3 = "Il miglior modo per rendere efficace questo patto è munirsi di un buon lucchetto con allarme"

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
        <Description/>
        <UserGuide/>
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
    /*   if (parking.rating < securityLevel) {
        unInterestingElements.push(
          <ParkingDiv
          parking={parking}
          key={parking.address} />
        )
        return;
      } */

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
      <div id="filterbar"> 
      <form>
        <input
          type="text" 
          placeholder="Search by school..."
          value={this.props.schoolFilter}
          onChange={this.handleSchoolFilterChange} 
        />
        {/* <label style={{paddingLeft:5}}>Rating:</label>
        <select
          value={this.props.securityLevel}
          onChange={this.handleSecurityLevelChange}>
          <option value="5">5</option>
          <option value="4">4 or more</option>
          <option value="3">3 or more</option>
          <option value="2">2 or more</option>
          <option value="1">1 or more</option>
        </select> */}
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
            <LocationOnSharpIcon/>
            <p className='mildPadding'>{parking.address}</p>
          </ListItem>
          <ListItem disablePadding>
            <SchoolTwoToneIcon/>
            <p className='mildPadding'>{parking.school}</p>
          </ListItem>
          <ListItem disablePadding>
            <EmojiPeopleSharpIcon/>
            <p className='mildPadding'>{parking.players}</p>
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
        <h1>
          {this.props.problem_description}
        </h1>
      </div>
    )
  }
}

class ProblemHeaders2 extends React.Component {
  render() {
    return (
      <div>
        <div className="row1" /* className="header row1 mildSpacing" */>
          <div className="column left">
            <h1 /* className="column left" */>Rock-A-<span className='headerPop'>Ride</span></h1>
          </div> 
          <div className="column right">
            <h5 /* className="headerSubText column right" */>
              {this.props.problem_description}
            </h5>
          </div>
        </div>
      </div>
    )
  }
}

class Description extends React.Component {
  render() {
    const whyItWorks = "Le attività convenzionate sono locali o botteghe che mettono a disposizione le loro risorse umane per rendere i parcheggi di biciclette piu' sicuri. Al suono dell'allarme i responsabili interverranno chiamando le autorità";
    return (
      <div className="descriptionContent mildPadding mildSpacing">
        <h2 className="descriptionHeaders">
          What for
        </h2>
        <p>
          {whyItWorks}
        </p>
      </div>

    )
  }
  
}


class UserGuide extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const howItWorks1 = "Avverti che stai parcheggiando la tua bicicletta.";
    const howItWorks2 = "Parcheggi e allucchetti la tua bicicletta.";
    const howItWorks3 = "Il miglior modo per rendere efficace il sistema è munendosi di un buon lucchetto con allarme. Le attività possono quindi continuare a lavorare al solito ritmo senza dover attivamente sorvegliare nessuna bicicletta.";
    return (
      <div className="descriptionContent steps mildPadding mildSpacing">
        <h3 className="descriptionHeaders">
          How
        </h3>
        <p>
    
          {howItWorks1}<br></br>
          {howItWorks2}<br></br>
          {howItWorks3}

        </p>
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
        <div className="row2">
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
