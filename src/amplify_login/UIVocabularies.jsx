import { I18n } from 'aws-amplify';
import { Translations } from "@aws-amplify/ui-components";

export default function SetUIVocabularies (lng) {
    I18n.setLanguage(lng);
    I18n.putVocabulariesForLanguage('ja', {
        // ---
        // サインイン
        // ---
        [Translations.SIGN_IN_ACTION]:  'ログイン',  // 'Login', // Tab header
        [Translations.SIGN_IN_TEXT]: 'ログイン', // Button label
        [Translations.SIGN_IN_HEADER_TEXT]: 'アカウントにログイン', //'Sign in to your account', 
        Username: 'ユーザーID', // Username label
        Password: 'パスワード', // Password label
        [Translations.FORGOT_PASSWORD_TEXT]: 'パスワードリセット', 

        // ---
        // サインアップ、一部他と兼用
        // ---
        [Translations.CREATE_ACCOUNT_TEXT]: 'アカウント作成', // Tab header
        'Create Account':  'アカウント作成', // 'Register', // Tab header
        [Translations.SIGN_UP_HEADER_TEXT]: 'New User', // Header text
        'Confirm Password': '確認用パスワード', // Confirm Password label
        Email: 'メールアドレス',
        // 'Phone Number': 'Enter your phone number',

        // ---
        // パスワードリセット
        // ---
        [Translations.RESET_YOUR_PASSWORD]: 'パスワードをリセット', // 画面説明 lable
        [Translations.USERNAME_PLACEHOLDER]: 'ユーザーIDまたはメールアドレス', // リセットするユーザー名 lable
        // SEND_CODE型だとなぜか認識されない → [Translations.SEND_CODE]: 'コード送信', // コード送信ボタン
        'Send code': 'コード送信', // パスワードリセットコードの送信時の説明タイトル
        [Translations.BACK_TO_SIGN_IN]: 'ログインに戻る', // 前画面に戻るリンク表示文字列

        // パスワードリセット後
        [Translations.CONFIRM_SIGN_UP_RESEND_CODE]: '再送信',   // Resend Code 再送信
        'Code':'確認コード', //パスワードリセット時のコード（Your verification codeを入れる）、TOTPでのコード入力のplaceholder
        [Translations.NEW_PASSWORD_LABEL]: "新しいパスワード", //新しいパスワード
        // パスワード確認用のplaceholerは、サインアップと同じ

        // Submit はどの型定義か不明
        'Submit': '送信',

        // ---
        // パスワード変更
        // ---
        [Translations.CHANGE_PASSWORD]: 'パスワード変更',

        //--- アカウント復元用のメールアドレス確認
        [Translations.VERIFY_CONTACT_VERIFY_LABEL]: '確認',   // Verify
        'Skip': 'スキップ', //今は確認せずにスキップ

        // --- TOTPログイン認証のパスワード認証後
        [Translations.CONFIRM_TOTP_CODE]: '2段階認証 認証コード', // TOTPのワンタイムトークンの入力画面説明ラベル
        [Translations.CONFIRM]: '確認', //TOTPの送信ボタン


        // ---
        // 
        // ---
        'Signing in': 'logning in...', // サインイン（ログイン）ボタン後の処理中
        //定義にsubmitting がない


        //--- cognitoのサーバーからのメッセージ
        // Cognito Server Side Error Messages
        // ref.) https://github.com/aws-amplify/amplify-js/issues/867
        //---
        'User does not exist.': 'ユーザーが存在しません',
        'Incorrect username or password.': 'ユーザー名またはパスワードが違います',
        'User is not confirmed.': 'ユーザーは検証されていません',
        'User already exists': 'ユーザーは既に存在します',
        'Invalid verification code provided, please try again.': '指定された確認コードが無効です。もう一度お試しください',
        'Invalid password format': 'パスワードのフォーマットが不正です',
        'Account recovery requires verified contact information': 'アカウントの復旧には確認済みの連絡先情報が必要です',
        'Invalid phone number format': '不正な電話番号フォーマットです。 電話番号は次のフォーマットで入力してください: +12345678900',
        'An account with the given email already exists.': 'そのメールアドレスは既に存在します',
        'Username cannot be empty': 'ユーザー名は必須です',
        'Password attempts exceeded': 'ログイン試行回数が上限に達しました',
        'Attempt limit exceeded, please try after some time.': '試行制限を超過しました。しばらくしてからもう一度お試しください',
        'Username/client id combination not found.': 'ユーザーが存在しません',
        'CUSTOM_AUTH is not enabled for the client.': 'パスワードは必須です', // 本来の意味とは異なるが、パスワード未入力時に発生するのでこの訳としている
        'Password does not conform to policy: Password not long enough': 'パスワードは8文字以上を入力してください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
        'Password does not conform to policy: Password must have uppercase characters': 'パスワードには大文字を含めてください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
        'Password does not conform to policy: Password must have lowercase characters': 'パスワードには小文字を含めてください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
        'Password does not conform to policy: Password must have numeric characters': 'パスワードには数字を含めてください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
        "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": 'パスワードは8文字以上、大文字小文字を含む英数字を指定してください', // 適宜修正。本来の意味とは異なるがこれで明示している。
        "2 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\S]+.*[\S]+$": 'パスワードは8文字以上、大文字小文字を含む英数字を指定してください', // 適宜修正。本来の意味とは異なるがこれで明示している。
        'Temporary password has expired and must be reset by an administrator.': '一時パスワードは無効です。管理者によるリセットが必要です',
        "1 validation error detected: Value null at 'attributeName' failed to satisfy constraint: Member must not be null": '入力チェックエラー、必須項目がNULLです', //アカウント復旧でのメールアドレスのラジオをチェックONにせず、送信した場合
        'Invalid code received for user': '無効なコードです', // TOTPでのトークンに誤りがある
        'Invalid session for the user, session is expired.' : '無効なセッション、セッションは有効期限切れです。ログインからやり直してください' // ログインセッション無効です、ログインからやり直し
    });
};
