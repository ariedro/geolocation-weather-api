const log = (message) => {
  if (global.isTest) return;
  process.stdout.write(`[${new Date().toISOString()}] `);
  console.log(message);
};

module.exports = log;
