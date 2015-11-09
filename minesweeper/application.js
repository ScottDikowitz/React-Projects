var Game = React.createClass({
  getInitialState: function () {
    return { game: new Minesweeper.Board(10, 15), over: false, won: false };
  },

  updateGame: function(tile, show){
    debugger;
    if (show){
      tile.explore();
    }

  },

  render: function () {
    // debugger;
    return <Board board={this.state.game} updateGame={this.updateGame}></Board>;
  }

});

var Board = React.createClass({
  render: function () {
    return <div className="grid">
            {
              this.props.board.grid.map(function (row, rowIdx){
              return row.map(function(tile, colIdx){
                return <Tile tile={tile} updateGame={this.props.updateGame}/>;
              }.bind(this));

            }.bind(this))}
            </div>;
  }
});

var Tile = React.createClass({

  handleClick: function(e){
    var booly = false;
    if (this.props.tile.explored || this.props.tile.flagged || this.props.tile.bombed){
      booly = true;
    }
    this.props.updateGame(this.props.tile, booly);
    // e.currentTarget

  },

  render: function() {
    var str = "T";
    var show = "hidden";
    if (this.props.tile.explored === false){
      str = " ";
    }
    else if(this.props.tile.adjacentBombCount() > 0){
      str = this.props.tile.adjacentBombCount();
      show = "revealed";
    }
    else if(this.props.tile.flagged === true){
      str = "⚑";
      show = "flagged";
    }
    else if(this.props.tile.bombed === true){
      str = "☀";
      show = "bombed";
    }

    return <div onClick={this.handleClick} className= {"tile " + show}>{str}</div>;
  }
});

React.render(<Game/>, document.getElementById('minesweeper'));
