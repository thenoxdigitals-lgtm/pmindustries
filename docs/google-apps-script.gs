/* Paste into the Apps Script project bound to your enquiry spreadsheet.
 * Script properties: SPREADSHEET_ID, WEBHOOK_SECRET. Optional SHEET_NAME (default Enquiries).
 * Deploy as Web App: execute as Me; access Anyone. The secret authenticates POSTs.
 */
function output(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || e.postData.contents.length > 20000) return output({ok:false});
    var data = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    var secret = props.getProperty('WEBHOOK_SECRET');
    if (!secret || typeof data.secret !== 'string' || data.secret !== secret) return output({ok:false});
    if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(data.requestId || '')) return output({ok:false});
    var limits = {name:100,company:160,phone:40,email:254,product:160,voltageClass:80,message:4000,sourcePage:250};
    for (var key in limits) if (typeof data[key] !== 'string' || data[key].length > limits[key]) return output({ok:false});
    if (data.name.trim().length < 2 || data.message.trim().length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return output({ok:false});
    if (!/^[+\d\s().-]{7,40}$/.test(data.phone) || data.phone.replace(/\D/g,'').length < 7 || !/^\/(?!\/)[^\r\n]*$/.test(data.sourcePage)) return output({ok:false});
    var timestamp = new Date(data.submittedAt);
    if (isNaN(timestamp.getTime()) || Math.abs(Date.now() - timestamp.getTime()) > 300000) return output({ok:false});
    if (!lock.tryLock(10000)) return output({ok:false});
    var spreadsheetId = props.getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) return output({ok:false});
    var book = SpreadsheetApp.openById(spreadsheetId);
    var sheet = book.getSheetByName(props.getProperty('SHEET_NAME') || 'Enquiries');
    if (!sheet) return output({ok:false});
    var expected = ['Timestamp','Name','Company','Phone','Email','Product','Voltage Class','Requirement','Source Page','Status'];
    var headers = sheet.getRange(1,1,1,10).getValues()[0];
    if (expected.some(function(value,index){return headers[index] !== value;})) return output({ok:false});
    // Persistent duplicate prevention. Column K is internal and hidden from normal view.
    var idHeader = sheet.getRange(1,11).getValue();
    if (idHeader && idHeader !== 'Request ID') return output({ok:false});
    if (!idHeader) { sheet.getRange(1,11).setValue('Request ID'); sheet.hideColumns(11); }
    if (sheet.getLastRow() > 1 && sheet.getRange(2,11,sheet.getLastRow()-1,1).createTextFinder(data.requestId).matchEntireCell(true).findNext()) return output({ok:true});
    // Shared backstop across all web-server instances: 100 accepted rows per 10 minutes.
    var slot = String(Math.floor(Date.now()/600000));
    var count = props.getProperty('RATE_SLOT') === slot ? Number(props.getProperty('RATE_COUNT') || 0) : 0;
    if (count >= 100) return output({ok:false});
    // Prefix every visitor-controlled cell with an apostrophe so Sheets treats it as text.
    function literal(value) { return "'" + String(value || ''); }
    sheet.appendRow([timestamp,literal(data.name),literal(data.company),literal(data.phone),literal(data.email),literal(data.product),literal(data.voltageClass),literal(data.message),literal(data.sourcePage),'New',data.requestId]);
    SpreadsheetApp.flush();
    props.setProperties({RATE_SLOT:slot,RATE_COUNT:String(count+1)});
    return output({ok:true});
  } catch (_) {
    return output({ok:false});
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
