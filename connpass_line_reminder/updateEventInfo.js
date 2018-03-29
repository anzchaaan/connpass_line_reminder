/**
 * IoTLTのイベント情報を取得し、スプレッドシートを更新する
 */
function updateEventInfo() {
  eventJson = getConnpassEventJson();
  writeSpreadSheet(eventJson);
}

/**
 * connpassのAPIを叩いてイベント情報を取得する。
 */
function getConnpassEventJson() {
  const apiURL = createConnpassApiURL(ini('CONNPASS_SERIES_ID_TO_ACQUIRE'));
  const apiOption = {
    'method' : 'get',
    'contentType' : 'application/json; charset=utf-8'
  };
  const response = UrlFetchApp.fetch(apiURL,apiOption);
  const contentText = response.getContentText();
  const eventJson = JSON.parse(contentText);
  return eventJson;
}

/**
 * connpass検索用URLを生成して返す
 * 検索条件に使用できるオプションは↓公式を参照
 * https://connpass.com/about/api/
 * @param {int} series_id
 * @return {string} apiUrl "https://connpass.com/api/v1/event/?series_id=1121&count=100&order=2&ym=YYYYMM,YYYYMM"
 */
function createConnpassApiURL(series_id) {
  // 検索オプション用文字列を生成
  var searchOption = '/?';
  searchOption += 'series_id=' + series_id;
  searchOption += '&count=' + '100';
  searchOption += '&order=' + '2'; // 1: 更新日時順 2: 開催日時順 3: 新着順

  const now = new Date();
  const currentYearMonth = String(now.getFullYear()) + String(now.getMonth()+1);
  now.setMonth(now.getMonth()+1);
  const nextYearMonth = String(now.getFullYear()) + String(now.getMonth()+1);
  const ym = currentYearMonth + ',' + nextYearMonth; 
  searchOption += '&ym=' + ym; // 今月と来月を検索条件に。jsの日付関連、魔境過ぎない？
  
  // URLを結合し、返す。
  const apiUrl = ini('CONNPASS_API_EVENT_URL') + searchOption;
  return apiUrl;
}

/**
 * イベント情報をスプレッドシートに書き込む
 * @param {json} eventJson 
 */
function writeSpreadSheet(eventJson) {  
  const sheetEventInfo = SpreadsheetApp.getActive().getSheetByName('イベント情報');
  const jsonkeys = ['event_id','started_at','title','catch','address','event_url','owner_nickname'];;
  var range = {
    'row' : 0,
    'column' : 0,
  };
  
  // シート初期化
  sheetEventInfo.clear();
   
  // hedder出力
  range['row']++; 
  range['column'] = 1; 
  jsonkeys.forEach(function(key){
    sheetEventInfo.getRange(range['row'],range['column']++).setValue(key);
  });
  
  // イベントデータ出力
  eventJson.events.forEach(function(event){
    range['row']++; 
    range['column'] = 1; 
    jsonkeys.forEach(function(key){
      sheetEventInfo.getRange(range['row'],range['column']++).setValue(event[key]);
    });
  });
}
