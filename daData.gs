const API_KEY = "ТОКЕН СЕРВИСА ДАДАТА";

function findById(type, query) {
  let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/" 
  + type;
  let payload = '{"query": "' + query + '"}'

  let headers = {
    "Authorization": "Token " + API_KEY
  };

  let fetchArgs = {
    method: "POST",
    contentType: "application/json",
    payload: payload,
    headers: headers,
    muteHttpExceptions: false
  };
  return UrlFetchApp.fetch(url, fetchArgs);
}

function daDataInfo(len, query){
let res = findById('party', query)
let json = res.getContentText();
let parsejson = JSON.parse(json);
if (parsejson.suggestions[0]) {
let data = parsejson.suggestions[0].data
return `<a href="https://www.tinkoff.ru/business/contractor/legal/${data.ogrn}/history/1/">${data.name.full_with_opf}</a>${len < 15 ? '\n' + data.name.short_with_opf : ''}
Адрес: ${data.address.unrestricted_value}
ИНН ${data.inn} ${len < 15 ? '\nКПП ' + data.kpp : ''}
ОГРН ${data.ogrn}
ОКПО ${data.okpo}
ОКАТО ${data.okato}
ОКТМО ${data.oktmo}
ОКОГУ ${data.okogu}
ОКФС ${data.okfs}
ОКВЭД ${data.okved}

${len < 15 ? data.management.post : ''}
${len < 15 ? data.management.name : ''}
`
} else {
  console.log('Нет данных от сервиса')
}
}
