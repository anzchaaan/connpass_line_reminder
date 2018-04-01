/**
 * connpassのAPI関連のクラス
 */
LibConnnpassAPI = function() {};

/**
 * APIからグループのイベント情報を取得しJson形式で返す
 * @param {string} series_id
 */
LibConnnpassAPI.getEvent = function(series_id) {
  const apiURL = LibConnnpassAPI.createURL(series_id);
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
 * @param {string} series_id
 * @return {string} apiUrl "https://connpass.com/api/v1/event/?series_id=1121&count=100&order=2&ym=YYYYMM,YYYYMM"
 */
LibConnnpassAPI.createURL = function(series_id) {
  searchOption = '/?';
  searchOption += 'series_id=' + series_id;
  searchOption += '&count=' + '100';
  searchOption += '&order=' + '2'; // 1: 更新日時順 2: 開催日時順 3: 新着順

  const currntDate = new Date(); 
  const nextDate = new Date(currntDate.getFullYear(), currntDate.getMonth()+1, 1);
  const currentYearMonth = String(currntDate.getFullYear()) + String(currntDate.getMonth()+1);
  const nextYearMonth = String(nextDate.getFullYear()) + String(nextDate.getMonth()+1);

  const ym = currentYearMonth + ',' + nextYearMonth; 
  searchOption += '&ym=' + ym; // 今月と来月を検索条件に。jsの日付関連、魔境過ぎない？

  const apiUrl = INI['CONNPASS_API_EVENT_URL'] + searchOption;
  return apiUrl;
}


/**
 * イベント情報をシートに書き込む
 * @param {string} series_id
 * @param {json} eventJson 
 */
LibConnnpassAPI.updateSheet = function(series_id, eventJson) {
  const jsonkeys = ['event_id','started_at','title','catch','address','event_url','owner_nickname'];;
  eventList = LibCommon.getEventList(series_id);

  eventJson.events.forEach(function(eventJson){
    if (String(eventList).indexOf(eventJson['event_id']) == -1) {  
      eventInfo = [];
      jsonkeys.forEach(function(key){
        eventInfo.push(eventJson[key]);
      });
      WriteSheet.add(series_id, eventInfo)
    }
  });

  WriteSheet.commit(series_id)
}