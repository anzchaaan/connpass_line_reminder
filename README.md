# connpass_line_reminder
ConnpassのイベントをLINEへリマインドを行うLINEBOTを作成する。

# Google Apps Script
Google Apps Scriptを使用する。  
claspを使用しGASとの連携を行い、ローカルで開発する。
https://github.com/google/clasp

## claspの環境構築はQiitaの記事を参照
https://qiita.com/soundTricker/items/354a993e354016945e44

## Command
` clasp push  `  
./connpass_line_remainder配下のコードをgasにアップロード
  
` clasp pull  `  
./connpass_line_remainder配下にgasのコードをDL

# 参考
LINE Messaging API  
https://developers.line.me/ja/docs/messaging-api/reference/