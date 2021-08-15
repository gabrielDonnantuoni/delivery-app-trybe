/* eslint-disable no-console */
const getServer = require('./app');

const port = process.env.PORT || 3000;

(async () => {
  const server = await getServer();

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Api rodando na porta ${port}`);
  });
})();
