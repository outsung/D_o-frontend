import history from './browserHistory';
import callCookie from './cookie';

type fetchMethod = 'get' | 'post' | 'put' | 'delete';

const errorHandling = async function (
  response: Response,
): Promise<boolean> {
  const { text, ok, status } = response;

  if (!ok) {
    if (status === 401) {
      callCookie.delete('jwt');
      history.push('/login');
      return ok;
    }

    const responseText = await text();
    throw new Error(`Internal error : ${responseText}`);
  }

  return ok;
};
const callFetch = function <I>(
  url: string,
  method: fetchMethod,
  body: I | undefined = undefined,
): Promise<Response> {
  const jwt = callCookie.get('jwt');

  const init: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      authorization: jwt || '',
    },
    method,
    body: method !== 'get' ? JSON.stringify(body) : undefined,
  };
  return fetch(url, init);
};
const toJson = async function <O>(response: Response): Promise<O> {
  let body: O;

  try {
    body = await response.json();
  } catch (err) {
    const responseText = await response.text();
    throw new Error(`Error converting to json : ${responseText}`);
  }

  return body;
};
const callApiBase = async function <I, O>(
  url: string,
  method: fetchMethod,
  body: I | undefined = undefined,
): Promise<O | undefined> {
  const serverUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const response: Response = await callFetch<I>(
    `${serverUrl}${url}`,
    method,
    body,
  );

  const ok = await errorHandling(response);

  if (ok) return toJson<O>(response);

  // console.log('Available after login');
  return undefined;
};

export default {
  get: <I, O>(url: string): Promise<O | undefined> => callApiBase<I, O>(url, 'get'),
  post: <I, O>(url: string, body: I): Promise<O | undefined> =>
    callApiBase<I, O>(url, 'post', body),
  put: <I, O>(url: string, body: I): Promise<O | undefined> =>
    callApiBase<I, O>(url, 'put', body),
  delete: <I, O>(url: string, body: I): Promise<O | undefined> =>
    callApiBase<I, O>(url, 'delete', body),
};
