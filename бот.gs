function doPost(e) {

let contents = JSON.parse(e.postData.contents);
let msg = contents.message;
let chatId = msg.chat.id;
let userName = contents.message.chat.first_name;

if (getSessionID(String(contents.update_id))){
   return
} else {
setSessionID(String(contents.update_id))
}

if (msg.text.toLowerCase().indexOf('алимент') != -1){
  let answer = askChatGPT(msg.text)
  if (answer) {
    sendReplyMessage (answer, chatId, msg.message_id)
  }
}

if (msg.text.indexOf('http') != -1){
  let summary = getSummary(msg.text)
  if (summary) {
    sendMessage(summary, chatId)
  }
}

if (msg.text.toLowerCase() === 'положение о раскрытии информации') {
  sendMessage (`${userName},
Положение о раскрытии информации можно скачать по <a href="https://www.sberbank.com/common/img/uploaded/files/pdf/normative_docs/emitter_information_regulations_22022013.pdf">ссылке</a>`, chatId)
return
}

if (msg.text.toLowerCase() === 'информационная политика') {
  sendMessage (`${userName},
Положение о раскрытии информации можно скачать по <a href="https://www.sberbank.com/common/img/uploaded/files/pdf/normative_docs/informatsionnaya_politika_rus.pdf">ссылке</a>`, chatId)
return
}

if (msg.text === '/start' || 
    msg.text.toLowerCase().indexOf('привет') != -1 || 
    msg.text.toLowerCase().indexOf('добрый день') != -1 || 
    msg.text.toLowerCase().indexOf('здарова') != -1 || 
    msg.text.toLowerCase().indexOf('здравствуй') != -1){
sendMessage(`Привет, ${userName}!

Подписывайся на <a href="https://t.me/law_coder">канал</a>, чтобы не пропустить заметки LawCoder'a

Напиши мне ИНН юр. лица и я пришлю краткую информацию по нему.

Напиши мне ОГРНИП и я пришлю краткую информацио об ИП.

Напиши мне ИНН самозанятого и я проверю и сообщу его статус.`, chatId)
return
}

if (msg.text.length == 10 || msg.text.length == 13 || msg.text.length == 15){
try {
message = daDataInfo(msg.text.length, msg.text);
} catch (e) {
console.log(e)
message = 'Ой, что-то пошло не так... Попробуйте снова или измените запрос.'
}
sendMessage (message, chatId)
return
} 

if (msg.text.length == 12){
let date = new Date().toISOString().split("T")
let requestDate = date[0];
let request = taxpayerStatus(msg.text, requestDate);
sendMessage(request, chatId);
return
}  

}

function getSessionID(id){
  const sss = SpreadsheetApp.openById('ID таблицы с журналом сессиий').getSheetByName('session') 
  let sessions_id_list = sss.getRange(1,1,sss.getLastRow(),1).getValues()
  let status = false
  sessions_id_list.map((e) => {
    if (e[0] == id){
      status = true
    }
    });
    return status
}

function setSessionID(id){
  const sss = SpreadsheetApp.openById('ID таблицы с журналом сессиий').getSheetByName('session') 
  sss.getRange(sss.getLastRow()+1,1).setValue(id)
}
