import { settings } from './settings';

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) return response;

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

export const getErrorMsg = err =>
  new Promise(resolve => {
    err.response.json().then(json => {
      resolve(json);
    });
  });

function fetchAnything(method, passedRoute, body, options = {}) {
  let route = passedRoute;
  const token = settings.get('token');
  const request = {
    method,
    headers: {
      // 'content-type': 'application/json; charset=utf-8',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
    credentials: 'include', // or 'include' for cors
  };
  if (body) request.body = body;

  if (method === 'get' && route.indexOf('?') > -1) {
    route = `${route}&t=${new Date().getTime()}`;
  } else if (method === 'get') {
    route = `${route}?t=${new Date().getTime()}`;
  }

  const url = route.indexOf('http') === 0 ? route : `${settings.apiURL}${route}`;

  return fetch(url, request).then(checkHttpStatus);
}

function fetchJSON(method, route, data, options = {}) {
  const extendedOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  const body = data && JSON.stringify(data);
  if (options.noParse) return fetchAnything(method, route, body, extendedOptions);
  return fetchAnything(method, route, body, extendedOptions).then(parseJSON);
}

export function postData(route, data, options = {}) {
  return fetchAnything('post', route, data, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
      ...options.headers,
    },
    ...options,
  });
}

export function putData(route, data, options = {}) {
  return fetchAnything('put', route, data, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
      ...options.headers,
    },
    ...options,
  });
}

export function healthCheck() {
  return fetchAnything('post', '/health-check');
}

export function getJSON(route, options = {}) {
  return fetchJSON('get', route, null, options);
}

export function postJSON(route, data, options = {}) {
  return fetchJSON('post', route, data, options);
}

export function putJSON(route, data, options = {}) {
  return fetchJSON('put', route, data, options);
}

export function delJSON(route, options = {}) {
  return fetchJSON('delete', route, null, options);
}
