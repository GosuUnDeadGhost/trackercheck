import {Env} from '../env.js';

export default function Request(data) {
  let {action, cb, method, body} = data;

  const params = {
    crossDomain:true,
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  }

  fetch(Env.server.url + `api/${action}`, params)
  .then(response => response.json())
  .then(data => {
    cb(data);
  });
}
