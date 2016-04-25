class App extends React.Component {
  getInitialState(){
    return {
      data: [],
      count: 0,
      alltimeClasses: '',
      recentClasses: ''
    }
  }

  componentDidMount(){
    return this.getData('recent');
  }

  getData(timeframe){
    const self = this
    const request = new XMLHttpRequest()
    request.open('GET', `http://fcctop100.herokuapp.com/api/fccusers/top/${timeframe}`, true)

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        self.setState({count: 0});
        const data = JSON.parse(this.response);
        const formattedData = data.map( elem => {
          return (
            <tr>
              <td>{++self.state.count}</td>
              <td className="username"><img src={elem.img} /> {elem.username}</td>
              <td>{elem.recent}</td>
              <td>{elem.alltime}</td>
            </tr>
          )
        })

        if(timeframe === 'recent') {
          self.setState({recentClasses: 'clickable active', alltimeClasses: 'clickable'});
        } else {
          self.setState({recentClasses: 'clickable', alltimeClasses: 'clickable active'});
        }
        self.setState({data: formattedData})
      } else {
        // We reached our target server, but it returned an error
        console.error("I'm sorry there was an error contacting the server.  Please try again later")
      }
    }

    request.onerror = function() {
      // There was a connection error of some sort
      console.error("error occured please check your connection and try again")
    }

    request.send()
  }

  render(){
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th colSpan="4">Camper Leaderboard</th>
          </tr>
          <tr>
            <th>Rank</th>
            <th className="username">Username</th>
            <th className={this.state.recentClasses} idName="recent" onClick={this.getData.bind(null, 'recent')}>Points in last 30 days <span className="glyphicon glyphicon-menu-down"></span></th>
            <th className={this.state.alltimeClasses} idName="alltime" onClick={this.getData.bind(null, 'alltime')}>Alltime Points <span className="glyphicon glyphicon-menu-down"></span></th>
          </tr>
        </thead>
        <tbody>
          {this.state.data}
        </tbody>
      </table>
    )
  }
}

React.render(<App />, document.getElementById('root'))
