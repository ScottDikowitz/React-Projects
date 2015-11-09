var Clock = React.createClass({
  getInitialState: function () {
    return {date: new Date() };
  },

  //componentDidMount runs (automatically) when component is on page
  componentDidMount: function(){
    this.intervalId = setInterval(this.tick, 1000);
  },

  tick: function(){
    this.setState({date: new Date()});

  },


  render: function () {
    return <div>
      <p>{this.state.date.toString()}</p>
    </div>;
  }

});

var WeatherClock = React.createClass({

  getInitialState: function () {
    return {weather: {}, temperature: {}};
  },

  componentDidMount: function(){
    var that = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      var xmlhttp = new XMLHttpRequest();
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var url = "http://api.openweathermap.org/data/2.5/weather?lat=";
      url = url.concat(lat).concat("&lon=").concat(long).concat("&appid=2de143494c0b295cca9337e1e96b00e0");
      var request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var resp = JSON.parse(request.responseText);
          //successful, so set state
          that.setState({weather: resp.weather[0].description, temperature: resp.main.temp});

        } else {
          // We reached our target server, but it returned an error

        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };

      request.send();
    });
  },


  //
  //     this.setState({location: position});
  //   }.bind(this));
  // },


  render: function () {
    // debugger
    return <div>
      <p>The Current Weather: {this.state.weather}</p>
      <p>The Current Temperature (F) is: {Math.ceil((this.state.temperature * 1.8) - 459.67)}</p>
      <p>The Current Temperature (C) is: {Math.ceil(this.state.temperature - 273.15)}</p>
    </div>;

  }

});
