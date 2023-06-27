function yandexGPT(article_url) {
 const token = 'ВАШ ТОКЕН'
 const endpoint = 'https://300.ya.ru/api/sharing-url'
 const options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify({
      'article_url': article_url,
    }),
    headers: {'Authorization': `OAuth ${token}`},
    muteHttpExceptions: true
  };

let res = UrlFetchApp.fetch(endpoint, options)
let json = JSON.parse(res.getContentText())
if (json.status == 'success'){
  return [true, json.sharing_url]
} else {
  return [false,'YandexGPT не вернул ответ']
       }
}

function getSummary(ask_url){
  const url = yandexGPT(ask_url)
  if (url[0]){
    let res = UrlFetchApp.fetch(url[1])
    let content = res.getContentText()
    let txtStart = content.indexOf('<meta property="og:description" content=')
    let txtEnd = content.indexOf('><meta property="og:type" content="article">')
    let txt = content.substring(txtStart + '<meta property="og:description" content='.length + 1, txtEnd-1)
    return txt.replace(/&quot;/g, '')
  } else {
    return false
  }
}
