/**
 * 汎用処理をまとめたクラス
 */
LibCommon = function() {};

/**
 * series_idの一覧を返す。
 * @return {array}
 */
LibCommon.getSeriesList = function() {
  sheet = SpreadsheetApp.getActive().getSheetByName(INI['SEET_NAME']['SERIES_LIST']);
  lastRow = sheet.getLastRow();
  if (lastRow == '1') return [];
  seriesList = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  return seriesList;
}

function testGetSeriesList(){
  Logger.log(LibCommon.getSeriesList());
}

/**
 * グループのイベントの一覧を返す。
 * @param {string} series_id
 * @param {array}
 */
LibCommon.getEventList = function(series_id) {
  sheet = SpreadsheetApp.getActive().getSheetByName(series_id);
  lastRow = sheet.getLastRow();
  if (lastRow == '1') return [];
  seriesList = sheet.getRange(2, 1, lastRow - 1, 1).getValues();;
  return seriesList;
}
