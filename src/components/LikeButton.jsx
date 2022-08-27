import React, { useEffect, useState } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import * as mutations from '../graphql/mutations';

function LikeButton(props) {
  // 初期値をpropsから取得
  const { bookId, initCount, setInitCount, pressby } = props;
  // const { bookId, initCount, pressby } = props;
  console.log(`LikeButton initCount: ${initCount}`);

  const [hovered, setHovered] = useState(false);
  // const [count, setCount] = useState(initCount);
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
    console.log(`onMouseEnter`);
  };

  // カーソルが外れた時に状態を変更するイベントハンドラ
  const onMouseLeave = (e) => {
    e.stopPropagation();
    setHovered(false);
  };

  // クリックしたときのイベントハンドラ
  const onClick = async (e) => {
    console.log(`Like in onClick: ${liked}`);
    e.stopPropagation();

    // setInitCount(liked ? initCount - 1 : initCount + 1);
    let newCount = liked ? initCount - 1 : initCount + 1;
    setLiked(!liked);
    console.log(`bookId in Like: ${bookId}`);

    // let update_pressby;
    // if(liked){
    //   if(userInfo.userId in pressby){
    //     const index = pressby.indexOf();
    //     update_pressby = pressby.splice(index, 1);
    //   }
    // }else{
    //   update_pressby = [...pressby, userInfo.userId];
    // }

    //TODO: 以下、liked=Trueもしくはpressbyに既にidがある場合には実行しないようにする
    const update_variables = {
      id: bookId,
      count: newCount,
      // pressby: update_pressby,
    };

    const res_update_like = await API.graphql({
      query: mutations.updateLike,
      variables: { input: update_variables },
    });
    console.log(`updateLike: ${res_update_like.data.updateLike.count}`);
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
        <span style={styles.counterBefore}> </span>
        {liked ? initCount + 1 : initCount}
      </span>
    </span>
  );
}

export default LikeButton;
