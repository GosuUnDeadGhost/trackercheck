import {Env} from '../env.js';

export default function Request(params) {
  let {action, id, cb} = params;
  
  fetch(Env.server.url + `api/trackers/${action}/` + id, {
    crossDomain:true,
  })
  .then(response => response.json())
  .then(data => {
    cb(data);
  });
}
