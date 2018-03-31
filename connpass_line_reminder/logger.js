
/**
 * スプレッドシートにloggを出力するクラス
 */
SheetLogger = function() {};

/**
 * 格納してあるLogを出力する
 */
SheetLogger.commit = function() {
  commitSpreadsheet(INI['SEET_NAME']['LOG']);
};

/**
 * 各ログレベルでLogを格納する
 * @var {string} message
 */
SheetLogger.debug = function(message) {
  const loglevel = 'debug';
  const tsv = [message];
  tsv.unshift(loglevel);
  tsv.unshift(new Date());
  addSpreadsheet(INI['SEET_NAME']['LOG'], tsv);
}
SheetLogger.info = function(message) {
  const loglevel = 'info';
  const tsv = [message];
  tsv.unshift(loglevel);
  tsv.unshift(new Date());
  addSpreadsheet(INI['SEET_NAME']['LOG'], tsv);
}
SheetLogger.warm = function(message) {
  const loglevel = 'warm';
  const tsv = [message];
  tsv.unshift(loglevel);
  tsv.unshift(new Date());
  addSpreadsheet(INI['SEET_NAME']['LOG'], tsv);
}
SheetLogger.error = function(message) {
  const loglevel = 'error';
  const tsv = [message];
  tsv.unshift(loglevel);
  tsv.unshift(new Date());
  addSpreadsheet(INI['SEET_NAME']['LOG'], tsv);
}

/**
function logtest() {
  SheetLogger.debug('debugレベルの正常テスト');
  SheetLogger.info('infoレベルの正常テスト');
  SheetLogger.warm('warmレベルの正常テスト');
  SheetLogger.error('errorレベルの正常テスト');
  SheetLogger.commit();
}
*/