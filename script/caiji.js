// Step1 设定源，
// https://www.zhihu.com/search?type=content&q=%E8%A3%85%E4%BF%AE
//引入需要的包
var http = require('http');
//var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//定义常量
var fileSource = 'https://www.zhihu.com/search?type=content&q=%E8%A3%85%E4%BF%AE';
// Step2 打开Top 3 的文章； copy html 内容，
//数据请求
function dataRequest(dataUrl) {
  console.log('dataRequest-->', dataUrl);

  //发送请求
  request(
    {
      url: dataUrl,
      method: 'GET',
    },
    function(err, red, body) {
      //请求到body
      if (err) {
        console.log(dataUrl);
        console.error('[ERROR]Collection' + err);
        return;
      }
      const fileUrls = getFileUrlsByPraseHtml(body);
      parseSubUrl(fileUrls);
    },
  );
}

/**
 * 获取文件 url 通过解析源文件；
 */
function getFileUrlsByPraseHtml(body) {
  var $ = cheerio.load(body);
  $('.ContentItem-extra')
    .parents('.List-item')
    .remove();
  const contentItems = $('.ContentItem-title');
  const subFileLinks = [];
  if (contentItems.length > 0) {
    for (let i = 0; i < contentItems.length; i++) {
      const contentItem = contentItems[i];
      const a = $('a', contentItem);
      subFileLinks.push('https://www.zhihu.com' + a.attr('href'));
    }
  }
  console.log('subFileLinks', subFileLinks);
  return subFileLinks;
}

/**
 * 解析html
 */
function parseSubUrl(urls) {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    //发送请求
    request(
      {
        url: url,
        method: 'GET',
      },
      function(err, red, body) {
        //请求到body
        if (err) {
          console.log(dataUrl);
          console.error('[ERROR]Collection' + err);
          return;
        }
        var $ = cheerio.load(body);
        const title = $('.QuestionHeader-title')[0];
        const contents = $('.RichContent');
        const contentHtml = [];
        for (let j = 0; j < contents.length; j++) {
          const content = contents[j];
          console.log('c->', content);
          const c = $(content).html();
          console.log('c->', c);
          contentHtml.push(c);
        }

        console.log('title', title);
        console.log('content', contentHtml);

        // 获取主要文章内容， 标题，
      },
    );
  }
}

function doWriteFile(content) {}

// Step3 存储成网页, 并保留源文地址;

/**
 * [writeToLocal description]
 * 将解析的数据 写入本地文件进行备份
 */
function writeToLocal(dataPage, fj, filePath) {
  console.log('-------------准备写入文件------------------------');
  //同步写入文件，一般使用异步好
  fs.appendFileSync(filePath, dataPage);
}

/**
 * 创建web服务器
 * @return {[type]} [description]
 */
// function startServer() {
//   http
//     .createServer(function(req, resp) {
//       console.log('采集服务启动！');
//     })
//     .listen(7000);
// }
// startServer();

console.log('startServer dataRequest..');
// setInterval(() => {
//开始发送请求 并 采集数据
dataRequest(fileSource);
// }, 100000);
