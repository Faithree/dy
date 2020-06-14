const { runDouyin } = require('./core');
const fs = require('fs');

async function tool() {
  const { videoStream, share_title } = await runDouyin(
    'https://v.douyin.com/JdngHhh/'
  );
  videoStream.pipe(fs.createWriteStream(`${share_title}(无水印).mp4`)); // 下载到本地
}

tool();
