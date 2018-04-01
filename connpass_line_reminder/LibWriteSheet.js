var spreadsheetArray = [];

/**
 * スプレッドシートに配列を出力するクラス
 * スプレッドシートの更新などの処理はAPIを叩くため重くなる。
 * なるべくAPIを叩く回数を減らすため配列で格納しておき、必要に応じてcommitする。
 */
WriteSheet = function() {};

/**
 * スプレッドシートに送信するメッセージをシートごとに配列に格納する。
 * @var {string} sheetName
 * @var {array[string,...]} tsv
 */
WriteSheet.add = function(sheetName, tsv) {
  if (!spreadsheetArray[sheetName]) {
    spreadsheetArray[sheetName]=[];
  }
  spreadsheetArray[sheetName].unshift(tsv);
};

/**
 * 格納していたメッセージをcommitする。
 * 新しいメッセージから上に挿入される。
 * @var {string} sheetName
 */
WriteSheet.commit = function(sheetName) {
  if (!spreadsheetArray[sheetName]) {
    return;
  }
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const row = spreadsheetArray[sheetName].length;
  const column = spreadsheetArray[sheetName][0].length;
  sheet.insertRowsAfter(1, row);
  sheet.getRange(2,1,row,column).setValues(spreadsheetArray[sheetName]);
  spreadsheetArray[sheetName] = [];
}

/**
 * 新規シートを作成する。
 * @var {string} sheetName
 */
WriteSheet.insertSheet = function(sheetName) {
  SpreadsheetApp.insertSheet(sheetName);
}