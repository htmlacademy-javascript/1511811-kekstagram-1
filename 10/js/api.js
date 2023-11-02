const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((responce) => {
      if (!responce.ok) { //если ответ от сервера отрицательный то исключаем ошибку в catch
        throw new Error();
      }
      return responce.json(); //если ответ положительный, возвращает результат извлечения полученных данных с сервера, а именно объект
    })
    .catch(() => {
      throw new Error(errorText);
    });

//получает данные
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

//отправляет данные
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {
  getData,
  sendData
};
