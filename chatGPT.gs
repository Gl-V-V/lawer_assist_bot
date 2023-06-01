const apiKey = "КЛЮЧ ОПЕНАИ АПИ"

function callChatGPT(features) {
  try {
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
     "model": "gpt-3.5-turbo",
     "messages": [{
                   "role": "user", 
                   "content": features,
                  }],
     "temperature": 0.7
     }),
  };
  const response = UrlFetchApp.fetch(apiUrl, options);
  const content = JSON.parse ( response.getContentText() )
  console.log(content)
  return content.choices[0].message.content
  } catch (e) {
    console.log(e)
    return 'ЧатГПТ сейчас недоступен. Попробуйте немного позже.'
  }
}
