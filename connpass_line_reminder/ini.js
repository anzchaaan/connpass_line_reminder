/**
 * keyに対応するoptionを返す。
 * オプション的な値はここにまとめる。(なんかglobalで宣言したconstを関数内で呼べないんだけど！！！)
 * @param {string} key
 * @return {*} option[key]
 */
function ini(key){
  const option = {
    CONNPASS_SERIES_ID_TO_ACQUIRE : '1121',
    CONNPASS_API_EVENT_URL : 'https://connpass.com/api/v1/event',
    LINE_MESSAGE_PUSH_URL : 'https://api.line.me/v2/bot/message/push',
    LINE_CHANNEL_ACCESS_TOKEN : '',
  };
  return option[key];
}
