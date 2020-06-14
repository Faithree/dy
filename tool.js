const { runDouyin } = require('./core');
const fs = require('fs');

async function tool() {
  const { videoStream, desc } = await runDouyin(
    'https://v.douyin.com/JdbBqog/'
  );
  videoStream.pipe(fs.createWriteStream(`${desc}(无水印).mp4`)); // 下载到本地
}

tool();
