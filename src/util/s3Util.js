import Amplify, { Storage } from 'aws-amplify';
import config from '../aws-exports';

Amplify.configure(config);

/**
 * ファイルを保存
 * @param {string} key キー
 * @param {object} object オブジェクト
 * @param {object} config 設定（オプション）
 * @returns 結果
 */
// export async function put(key, object, config = null) {
//   try {
//     return await Storage.put(key, object, config);
//   } catch (err) {
//     console.error('error:', err);
//   }
// }

// export async function pathToImageFile(pathToImageFile) {
//   try {
//     const response = await fetch(pathToImageFile);
//     console.log('get image respoonse: ' + response);
//     const blob = await response.blob();
//     console.log('blob: ' +  blob);
//     await Storage.put('abc', blob, {
//       contentType: 'image/jpeg', // contentType is optional
//     });
//   } catch (err) {
//     console.log('Error uploading file:', err);
//   }
// }

/**
 * ファイルを削除
 * @param {string} key キー
 * @param {object} object オブジェクト
 * @param {object} config 設定（オプション）
 * @returns 結果
 */
export async function remove(key, object, config = null) {
  try {
    return await Storage.remove(key, object, config);
  } catch (err) {
    console.error('error:', err);
  }
}

/**
 * ファイルを取得
 * @param {string} key キー
 * @param {object} config 設定（オプション）
 * @returns 署名付きURLまたはファイル(Blob)
 */
export async function get(key, config = null) {
  try {
    return await Storage.get(key, config);
  } catch (err) {
    console.error('error:', err);
  }
}

/**
 * ファイル一覧を取得
 * @param {string} path キー
 * @param {object} config 設定（オプション）
 * @returns 一覧情報
 */
export async function list(path, config = null) {
  try {
    return await Storage.list(path, config);
  } catch (err) {
    console.error('error:', err);
  }
}

/**
 * ファイルダウンロード
 * @param {object} blob ファイルオブジェクト
 * @param {string} filename ファイル名
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener('click', clickHandler);
    }, 150);
  };
  a.addEventListener('click', clickHandler, false);
  a.click();
  return a;
}
