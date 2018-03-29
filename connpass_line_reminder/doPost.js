function doPost() {ß
  const json = JSON.parse(e.postData.getDataAsString())
  addLog(JSON.stringify(json));
}
