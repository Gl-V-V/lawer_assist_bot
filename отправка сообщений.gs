const API_TOKEN = "ВАШ ТОКЕН";
//функция отправки сообщений ботом 
function sendMessage (message, chatId){ 
    var data = { 
     method: "post", 
     payload: { 
     method: "sendMessage", 
     chat_id: String(chatId), 
     text: message, 
     parse_mode: "HTML",
     disable_web_page_preview: true
     } 
    } 
    UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data); 
}
function sendReplyMessage (message, chatId, msg_id){ 
    var data = { 
     method: "post", 
     payload: { 
     method: "sendMessage", 
     chat_id: String(chatId), 
     text: message, 
     parse_mode: "HTML",
     disable_web_page_preview: true,
     reply_to_message_id: msg_id
     } 
    } 
    UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data); 
}
