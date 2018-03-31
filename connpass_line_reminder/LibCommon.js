/**
 * 汎用処理をまとめたクラス
 */
LibCommon = function() {};

/**
 * series_idの一覧を返す。
 */
LibCommon.getSeriesList = function() {
  sheet = SpreadsheetApp.getActive().getSheetByName(INI['SEET_NAME']['SERIES_LIST']);
  lastRow = sheet.getLastRow();
  seriesList = sheet.getRange(2, 1, lastRow - 1, 1).getValues();;
  return seriesList;
}

function testGetSeriesList(){
  Logger.log(LibCommon.getSeriesList());
}