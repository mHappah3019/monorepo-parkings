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