Promise.all(
  [
    Promise.reject({ code: 500, msg: '微服务异常' }),
    Promise.resolve({ code: 200, list: [] }),
    Promise.resolve({ code: 200, list: [] }),
  ].map((p) => p.catch((e) => e))
)
  .then((res) => {
    console.log('res => ', res);
  })
  .catch((err) => {
    console.log('error => ', err);
  });

Promise.all(
  [
    Promise.reject({ code: 502, msg: '微服务异常' }),
    Promise.resolve({ code: 200, list: [] }),
    Promise.resolve({ code: 200, list: [] }),
  ].map((p) => p.catch((e) => e))
).then((res) => {
  console.log('res => ', res);
});
