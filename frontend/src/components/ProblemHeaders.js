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