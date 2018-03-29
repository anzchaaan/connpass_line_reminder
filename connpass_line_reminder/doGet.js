function doGet() {
  const readme = HtmlService.createTemplateFromFile('README');
  return readme.evaluate().setTitle('Connpass通知');
}
