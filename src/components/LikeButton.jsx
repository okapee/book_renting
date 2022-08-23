import React from 'react';
import ReactDom from 'react-dom';

export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      count: 999, // カウント数の状態を追加
      liked: false, // 押したかどうかの状態を追加
    };
  }

  styles() {
    return {
      container: {
        fontFamily:
          "helvetica, arial, 'hiragino kaku gothic pro', meiryo, 'ms pgothic', sans-serif",
        fontSize: 11,
        position: 'absolute',
        bottom: '5px',
        right: '5px'
      },
      like: {
        display: 'inline-block',
        background: '#3b5998',
        padding: '0px 5px',
        borderRadius: 2,
        color: '#ffffff',
        cursor: 'pointer',
        float: 'left',
        height: 20,
        lineHeight: '20px',
      },
      likeHover: {
        background: '#444',
      },
      counterBefore: {
        display: 'block',
        float: 'left',
        width: 6,
        height: 6,
        background: '#fafafa',
        marginLeft: '-12px',
        borderRight: 10,
        transform: 'rotate(45deg)',
        WebkitTransform: 'rotate(45deg)',
        marginTop: 6,
        borderLeft: '1px solid #aaa',
        borderBottom: '1px solid #aaa',
      },
      counter: {
        display: 'block',
        background: '#fafafa',
        boxSizing: 'border-box',
        border: '1px solid #aaa',
        float: 'left',
        padding: '0px 8px',
        borderRadius: 2,
        marginLeft: 8,
        height: 20,
        lineHeight: '20px',
      },
    };
  }
  // カーソルが乗った時に状態を変更するイベントハンドラ
  onMouseEnter = () => {
    this.setState({ hovered: true });
  }

  // カーソルが外れた時に状態を変更するイベントハンドラ
  onMouseLeave = () => {
    this.setState({ hovered: false });
  }

  // クリックしたときのイベントハンドラ
  onClick = (e) => {
    // e.stopPropagation();
    this.setState({
      count: this.state.count + (this.state.liked ? -1 : 1),
      liked: !this.state.liked,
    });
  }

  // カーソルが乗った時に状態を変更するイベントハンドラ
  onMouseEnter = () => {
    this.setState({ hovered: true });
  }

  // カーソルが外れた時に状態を変更するイベントハンドラ
  onMouseLeave = ()=> {
    this.setState({ hovered: false });
  }

  // this.state.likedとthis.state.countを追加し、
  // onClickイベントハンドラを紐付ける
  render() {
    const styles = this.styles();
    console.log(this.state); // 状態をログに出す

    // ボタンに onMouseEnter と onMouseLeave のイベントハンドラを割り当てます
    return (
      <span style={styles.container}>
        <span
          style={styles.like}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          // onClick="onClick(event,this)"
        >
          いいね！
        </span>
        <span style={styles.counter}>
          <span style={styles.counterBefore}> </span>999
        </span>
      </span>
    );
  }
}
