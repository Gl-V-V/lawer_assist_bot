function doPost(e) {
let contents = JSON.parse(e.postData.contents);
let msg = contents.message;
let chatId = msg.chat.id;
let userName = contents.message.chat.first_name;

if (msg.text === '/start'){
sendMessage(`Привет, ${userName}!
Подписывайся на <a href="https://t.me/law_coder">канал</a>, чтобы не пропустить заметки LawCoder'a`, chatId)
}

}
