import React, { useEffect, useState } from 'react';
import Amplify, { Auth, API, Storage } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';

function LikeButton(props) {
  // 初期値をpropsから取得
  const {initCount, pressby} = props;
  console.log(`LikeButton initCount: ${initCount}`);


  const [hovered, setHovered] = useState(false);
  const [count, setCount] = useState(initCount);
  const [liked, setLiked] = useState(false);
  const userInfo = useSelector((state) => state.auth.user);

  const styles = {
    container: {
      fontFamily: "helvetica, arial, 'hiragino kaku gothic pro', meiryo, 'ms pgothic', sans-serif",
      fontSize: 11,
      position: 'absolute',
      bottom: '10px',
      right: '25px',
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

  // カーソルが乗った時に状態を変更するイベントハンドラ
  const onMouseEnter = (e) => {
     e.stopPropagation();
    setHovered(true);
    console.log(`onMouseEnter`)
  };

  // カーソルが外れた時に状態を変更するイベントハンドラ
  const onMouseLeave = (e) => {
     e.stopPropagation();
    setHovered(false);
  };

  // クリックしたときのイベントハンドラ
  const onClick = (e) => {
    e.stopPropagation();
    setCount(liked ? -1 : 1);
    setLiked(!liked);
    console.log(`Like: ${liked}`)
  };

  // ボタンに onMouseEnter と onMouseLeave のイベントハンドラを割り当てます
  return (
    <span style={styles.container}>
      <span
        style={styles.like}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        いいね！
      </span>
      <span style={styles.counter}>
        <span style={styles.counterBefore}> </span>{liked ? initCount+1 : initCount}
      </span>
    </span>
  );
}

export default LikeButton;
