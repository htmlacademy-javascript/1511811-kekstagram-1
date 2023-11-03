import './util.js';
import './data.js';
import './functions.js';
import './picture.js';
import './comments.js';
import './form.js';
import './scale.js';
import './effect.js';
import './api.js';
import {getData} from './api.js';
import {renderPost} from './picture.js';
import { showAlert } from './util.js';

//загружает данные с сервера и обрабатывает
getData()
  .then((data) => {
    renderPost(data);
  })
  .catch((err) => showAlert(err.message));
