import './util.js';
import './picture.js';
import './comments.js';
import './form.js';
import './scale.js';
import './effect.js';
import './api.js';
import './sort.js';
import {getData} from './api.js';
import {renderPost} from './picture.js';
import { showAlert } from './util.js';
import { initFilter } from './sort.js';

getData()
  .then((data) => {
    renderPost(data);
    initFilter(data);
  })
  .catch((err) => showAlert(err.message));
