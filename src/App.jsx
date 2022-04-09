import React from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import Loggedin from './Loggedin'; //ログイン後ホーム画面
import NotLoggedin from './NotLoggedin'; //ログイン前画面(サインイン画面)
import SetUIVocabularies from './amplify_login/UIVocabularies';
import '@aws-amplify/ui-react/styles.css';

SetUIVocabularies('ja');

//ログインチェック
//ユーザがアクセスしたときにトークンを既に持っている(ログイン済みか)をチェックします。
//ログイン済みなら、routeという変数に authenticated という文字列を返すので、
//ログイン済みなら <Loggedin /> のページを、未ログインなら <NotLoggedin /> のページを呼びます。
function Authcheck() {
  const { route } = useAuthenticator((context) => [context.route]);
  return route === 'authenticated' ? (
    <Loggedin />
  ) : (
    <div class="auth-screen">
      <NotLoggedin />
    </div>
  );
}

//ログインチェックの関数を、<Authenticator.Provider>タグでラップします。
export default function App() {
  return (
    <Authenticator.Provider>
      <Authcheck />
    </Authenticator.Provider>
  );
}
