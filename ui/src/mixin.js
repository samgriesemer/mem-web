export function get(url) {
  return fetch(url, {
    method:'GET',
    //credentials: 'include' // to include cookies across domains
  }).then(response => {
    return Promise.all([response, response.json()]);
  }).then(([response, body]) => {
    if (response.ok) {
      return body;
    }
    if (body.message != null) {
      throw Error(body.message);
    } else {
      throw Error(response.statusText);
    }
  }).then(data => {
    return data;
  }).catch(error => {
    return error.message;
  });
}

export function post(url, body) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return Promise.all([response, response.json()]);
  }).then(([response, body]) => {
    if (response.ok) {
      return body;
    }
    if (body.message != null) {
      throw Error(body.message);
    } else {
      throw Error(response.statusText);
    }
  }).then(data => {
    return data;
  }).catch(error => {
    return error.message;
  });
}

export function del(url) {
  return fetch(url, {
    method:'DELETE',
  }).then(response => {
    return Promise.all([response, response.json()]);
  }).then(([response, body]) => {
    if (response.ok) {
      return body;
    }
    if (body.message != null) {
      throw Error(body.message);
    } else {
      throw Error(response.statusText);
    }
  }).then(data => {
    return data;
  }).catch(error => {
    return error.message;
  });
}


export function scheduler(url, callback, interval=-1) {
  let prom = get(url).then(data => callback(data));
  if (interval > 0) {
      setTimeout(function() {
        return scheduler(url, callback, interval);
      }, interval);
  }
  return prom;
}

export function http_get(url, callback) {
    return get(url).then(data => callback(data));
}

export function http_delete(url, callback) {
    return del(url).then(data => callback(data));
}

export function http_post(url, body, callback) {
    return post(url, body).then(data => callback(data));
}

export function countdown(
    t,
    ref=null,
    cb=null,
    stop=(t) => t<=0,
    i=1000
) {
    if (ref != null) {
        clearInterval(ref);
    }

    // pre-interval callback breaking? works for my use case
    if (cb != null) cb(t);
    let iid = setInterval(() => {
        t -= i/1000;
        if (stop != null) {
            if (stop(t)) {
                clearInterval(iid);
                return;
            }
        }
        if (cb != null) cb(t);
    }, i);

    return iid;
}

export function process_time(t) {
    let s = t/1000

    let d = Math.floor(s/60/60/24);
    s -= d*24*60*60;

    let h = Math.floor(s/60/60);
    s -= h*60*60;

    let m = Math.floor(s/60);
    s -= m*60;
    
    return [d, h, m, s];
}

export function time_str(t) {
    let ptime = process_time(t);
    let out = '';

    out += ptime[0] != 0 ? ptime[0]+' days, ' : '';
    out += ptime[1] != 0 ? ptime[1]+' hours, ' : '';
    out += ptime[2] != 0 ? ptime[2]+' minutes, ' : '';
    out += ptime[3] != 0 ? ptime[3]+' seconds' : '';

    if (out.slice(-2) == ', ') {
        out = out.slice(0,-2);
    }

    return out;
}
