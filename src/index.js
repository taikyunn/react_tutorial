import React from "react";
import ReactDOM from 'react-dom';
import './index.css';

// SquareはBoardに制御されたコンポーネント
// 関数コンポーネント:renderメソッドだけを有して自分のstateを持たないコンポーネントをよりシンプルに書く方法
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // どちらのプレイヤーの番なのかを決める真偽値
      xIsNext: true,
    };
  }

  handleClick(i) {
    // コピーそ作成することで、履歴が残るためデータの変化や、複雑な機能の実装に便利
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    // propsを渡す
    return <Square
            // 現在のsquareのstateをpropsを使って渡す。
            // this.state.squaresの値は'X''○'null'のいずれかである
            value={this.state.squares[i]}
            // マス目がクリックされたときにどのマス目に何が入っているのかを管理する関数を呼び出す。
            onClick={()=> this.handleClick(i)}
            />;
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
