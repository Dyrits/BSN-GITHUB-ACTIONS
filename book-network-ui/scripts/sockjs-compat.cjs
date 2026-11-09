// Local-only compatibility smoke for the SockJS-scoped UUID override.
const assert = require('node:assert/strict');
const http = require('node:http');
const sockjs = require('sockjs');
const server = http.createServer();
const sessions = new Set();
const echo = sockjs.createServer({ log() {} });
echo.on('connection', connection => {
  assert.match(connection.id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  assert.ok(!sessions.has(connection.id));
  sessions.add(connection.id);
  connection.on('data', message => connection.write(message));
});
echo.installHandlers(server, { prefix: '/echo' });
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const { port } = server.address();
    for (let i = 0; i < 3; i++) {
      await new Promise((resolve, reject) => {
        const client = new WebSocket(`ws://127.0.0.1:${port}/echo/000/fixture-${i}/websocket`);
        const timeout = setTimeout(() => { client.close(); reject(new Error('SockJS echo timed out')); }, 5000);
        client.addEventListener('error', reject);
        client.addEventListener('message', event => {
          if (event.data === 'o') client.send(JSON.stringify(['fixture echo']));
          else if (event.data.startsWith('a')) {
            assert.deepEqual(JSON.parse(event.data.slice(1)), ['fixture echo']);
            clearTimeout(timeout);
            client.close();
            resolve();
          }
        });
      });
    }
    assert.equal(sessions.size, 3);
    console.log('SockJS real WebSocket echo: 3 unique UUIDv4-backed connections passed.');
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
