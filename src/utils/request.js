const request = async (route, options = {}) => {
  const opts = { ...options };
  if (!opts.headers) opts.headers = { 'Content-Type': 'application/json' };
  else opts.headers['Content-Type'] = 'application/json';

  if (opts.body) opts.body = JSON.stringify(opts.body);

  if (!opts.method) opts.method = 'GET';

  const resp = await fetch(`/api/${route}`, opts);
  const userObj = await resp.json();
  return userObj;
};

export default request;
