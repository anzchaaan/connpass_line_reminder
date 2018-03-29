sheet = SpreadsheetApp.getActive().getSheetByName('イベント情報');

/**
 * LINEあてにプッシュメッセージを送信する。
 * https://developers.line.me/ja/docs/messaging-api/reference/
 * @param {string} to 送信先のuserId、groupId、またはroomId
 * @param {string} messages 送信するメッセージ
 * @return {*} 調べてもよくわかんないけどみんなつけてる。responseをjson形式で出力してるのかな？とりあえずおまじない。
 */
function sendLINEMessaages(to,messages) {
  UrlFetchApp.fetch(ini('LINE_MESSAGE_PUSH_URL'), {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ini('LINE_CHANNEL_ACCESS_TOKEN'),
    },
    'method': 'post',
    'payload': JSON.stringify({
      //to': '', //ぼく
      'to': '',
      'messages': [
        {
          'type': 'text',
          'text': messages
        }, {
          'type': 'template',
          'altText': 'IoTLTの情報が公開されました!',
          'template': {
            'type': 'buttons',
            'title': sheet.getRange(4,3).getValue(),
            'text': '開催日：' + sheet.getRange(4,2).getValue().slice(0,9) + '\n',
            'actions': [
              {
                'type': 'uri',
                'label': '予約する',
                'uri': sheet.getRange(4,6).getValue(),
              }
            ]
          }
        } 
      ],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function createMessages(){
  var messages = '';
  messages += 'IoTLTの情報が公開されました。';
  messages += '参加する方はconnpassから予約してください。';
  Logger.log(messages);
  return messages;
}

function sendTest(){
  sendLINEMessaages('',createMessages());
}