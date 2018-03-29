/**
 * スプレッドシートの更新などの処理はAPIを叩くため重くなる。
 * なるべくAPIを叩く回数を減らすため配列で格納しておき、必要に応じてcommitする。
 */
var logArray = [];

/**
 * スプレッドシートに送信するメッセージを配列に格納する。
 * sheet事に格納する。
 */
function addLog(sheet,log) {
  if (!logArray[sheet]) {
    Logger.log('initial');
    logArray[sheet]=[];
  }
  logArray[sheet].push(log);
}

/**
 * メッセージをcommitする。
 */
function commitLog(sheet) {
  const spreadsheetId = "";
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const st = spreadsheet.getSheetByName('シート1');
  
  const firstRow = st.getLastRow() + 1;
  const row = logArray[sheet].length;
  const column = 2;
  st.getRange(firstRow,1,row,column).setValues(logArray[sheet]);;
}

function test() {
  addLog('1',['aaa','bbb']);
  addLog('1',['LOG!','FGO!']);
  addLog('1',['LOG!','FGO!']);
  addLog('1',['こいつは表示する!','FGO!']);
  addLog('2',['こいつは表示しない!','a!']);
  addLog('1',['LOG!','FGO!']);
  commitLog('2');
}