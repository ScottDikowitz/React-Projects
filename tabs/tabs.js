var Tabs = React.createClass({

  getInitialState: function (){
    return {tabIndex: 0};
  },

  handleClick: function (e) {
    this.setState({tabIndex: e.currentTarget.value});
  },

  render: function(){
    return <div>
      <ul>
        {this.props.content.map ( function (el, index) {
          if (index === this.state.tabIndex){
            // stuff
            return <li className="selected">{el.title}</li>;
          }
          else{
            return <li value={index} onClick={this.handleClick}>{el.title}</li>;
          }
        }.bind(this))}
      </ul>
      <article>{this.props.content[this.state.tabIndex].content}</article>
    </div>;
    // this.props.content

  }

});
