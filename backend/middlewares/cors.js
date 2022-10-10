const allowedCors = [
  // '*',
  // 'http://front-szh-dpl.students.nomorepartiesxyz.ru',
  // 'https://front-szh-dpl.students.nomorepartiesxyz.ru',
  // 'http://www.front-szh-dpl.students.nomorepartiesxyz.ru',
  // 'https://www.front-szh-dpl.students.nomorepartiesxyz.ru',
  // 'https://sergzhikhdev.github.io',
  // 'localhost:3000',
  // 'http://localhost:3000',
  // 'https://localhost:3000',
  // 'http://localhost:3001',
  // 'https://localhost:3001',
  // 'http://localhost:3001/',
  // 'http://localhost:3001/signup',
  // 'https://localhost:3001/signup',
  'https://sergzhikhdev.github.io/movies-explorer-frontend/',
  'https://sergzhikhdev.github.io',
  'http://front-szh-dpl.students.nomorepartiesxyz.ru',
  'https://front-szh-dpl.students.nomorepartiesxyz.ru',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
