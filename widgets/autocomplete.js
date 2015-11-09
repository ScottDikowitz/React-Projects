var Autocomplete = React.createClass({
  getInitialState: function () {
    return {textInput: ""};
  },

  // pass in e to update, instead of document.getElementById
  update: function(e) {
    this.setState({textInput: e.currentTarget.value });
  },


  matches: function() {
    var result = [];
    this.props.names.forEach (function (el) {
      var partName = el.slice(0, this.state.textInput.length);
      if (partName === this.state.textInput) {
        result.push(el);
      }
    }.bind(this));
    return result;
  },

  handleClick: function(e) {
    this.setState({textInput: e.currentTarget.innerText });
    document.getElementById("nameInput").value = e.currentTarget.innerText;
  },


  render: function () {
    // debugger;
    //console.log(this.matches());
    return <div>
      <input id="nameInput" onChange={this.update}/>

      <ul> {this.matches().map (function (el) {
        return <li onClick={this.handleClick}>{el}</li>;
        }.bind(this)) }
      </ul>

    </div>;
  }

});
