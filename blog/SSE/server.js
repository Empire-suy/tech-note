import express from 'express';

const app = express();
const PORT = 3000;
const MAX = 10;

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let timer = null;
  const sendMsg = (times = 1) => {
    if (times > MAX) {
      res.write('data: DONE\n\n');
      return;
    }

    const data = {
      code: 'S',
      data: {
        msg: `Message ${times}`,
        time: new Date().toLocaleString(),
      },
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    timer = setTimeout(() => sendMsg(times + 1), 1000);
  };

  sendMsg();

  req.on('close', () => {
    clearTimeout(timer);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
