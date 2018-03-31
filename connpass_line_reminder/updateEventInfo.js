/**
 * IoTLTのイベント情報を取得し、スプレッドシートを更新する
 */
function updateEventInfo() {
  seriesList = LibCommon.getSeriesList();
  seriesList.forEach(function(series_id) {
    eventJson = LibConnnpassAPI.getEvent(series_id);
    LibConnnpassAPI.updateSheet(series_id, eventJson);
  });
}
