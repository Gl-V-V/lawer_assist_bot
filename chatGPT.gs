const apiKey = "КЛЮЧ ОПЕНАИ АПИ"

function askChatGPT(que) {
  const faq = DocumentApp.openById('ID документа с юридическим заключением').getBody().getText()
  const features = `Мне нужен ответ на следующий вопрос: "${que}". Найди ответ в следующем тексте: "${faq}". Если текст не содержит ответа, ответь: "Я не могу дать ответ.`
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const options = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(
     {
     "model": "gpt-3.5-turbo-16k",
     "messages": [{
                   "role": "user", 
                   "content": features,
                  }],
     "temperature": 0.7
     }),
  };
  const response = UrlFetchApp.fetch(apiUrl, options);
  const content = response.getContentText();
  console.log(content)

  let json = JSON.parse(content)

  if (json.error) {
    return json.error.message
  }

  return json.choices[0].message.content
}
