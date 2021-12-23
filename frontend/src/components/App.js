import React, { Component } from "react";
import { render } from "react-dom";
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
