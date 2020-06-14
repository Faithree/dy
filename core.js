// import axios from 'axios';
const axios = require('axios');
const userAgent =
  'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Mobile Safari/537.36';
async function request(url, type) {
  const option = {
    url,
    method: 'get',
    headers: {
      'user-agent': userAgent,
    },
  };
  if (type) {
    option.responseType = type;
  }
  return axios(option);
}

async function runDouyin(shareUrl) {
  const { data: html } = await request(shareUrl);
  const itemId = html.match(/(?<=itemId:\s\")\d+(?=\")/g)[0];
  const dytk = html.match(/(?<=dytk:\s\")(.*?)(?=\")/g)[0];
  const long_url = `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${itemId}&dytk=${dytk}`;
  const { data: videoJson } = await request(long_url);
  const uriId = videoJson.item_list[0].video.play_addr.uri;
  const desc = videoJson.item_list[0].desc;
  const noWatermarkUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${uriId}&line=0&ratio=540p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&is_support_h265=0&source=PackSourceEnum_PUBLISH`;
  const { data: videoStream } = await request(noWatermarkUrl, 'stream');
  return { videoStream, desc };
}

module.exports = {
  runDouyin,
};
