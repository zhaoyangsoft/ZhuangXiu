// Step1 设定源，
// https://www.zhihu.com/search?type=content&q=%E8%A3%85%E4%BF%AE
//引入需要的包
var http = require('http');
var path = require('path');
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
      console.log('body->', body);
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

  $('.ContentItem-actions').remove();
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
        let title = $('.QuestionHeader-title').text();
        const contents = $('.RichContent');
        const imgs = $(contents).find('img');
        for (let ii = 0; ii < imgs.length; ii++) {
          const img = imgs[ii];
          $(img).attr('src', $(img).attr('data-actualsrc'));
        }
        const contentHtml = [];
        for (let j = 0; j < contents.length; j++) {
          const content = contents[j];
          const c = $(content).html();
          contentHtml.push(c);
        }

        if (title) {
          title = title.replace(/\?/g, '');
          title = title.replace(/\？/g, '');

          console.log('title-->', title);
          // console.log('content', contentHtml);
          doWriteFile(title, contentHtml, url);
          // 获取主要文章内容， 标题，
        }
      },
    );
  }
}

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
  let isExists = await getStat(dir);
  //如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) {
    return true;
  } else if (isExists) {
    //如果该路径存在但是文件，返回false
    return false;
  }
  //如果该路径不存在
  let tempDir = path.parse(dir).dir; //拿到上级路径
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await dirExists(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}

async function doWriteFile(title, content, oldUrl) {
  content = unescape(`${content}`.replace(/&#x/g, '%u').replace(/;/g, ' '));

  title = title.replace('?', '');
  const htmlTpl = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>装修转载</title>
        <style>
          .origin_image.zh-lightbox-thumb {
            cursor: -webkit-zoom-in;
            cursor: zoom-in;
          }
          img{
            display: block;
            max-width: 60%;
          }
        </style>
      </head>
      <body>
      ${content}
      <div><a href='${oldUrl}' target="_blank">原文链接</a></div>
      </body>
    </html>

  `;
  const curDay = new Date()
    .toLocaleString()
    .substring(0, 9)
    .replace(/\//g, '-');
  await dirExists(`./tempHtml/${curDay}`);
  fs.writeFile(`./tempHtml/${curDay}/${title.replace('?', '')}.html`, htmlTpl, err => {
    console.log('err-->', err);
  });
}

// Step3 存储成网页, 并保留源文地址;

/**
 * [writeToLocal description]
 * 将解析的数据 写入本地文件进行备份
 */
function writeToLocal(dataPage, fj, filePath) {
  console.log('-------------准备写入文件------------------------');
  //同步写入文件，一般使用异步好
  fs.writeFile(filePath, dataPage);
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
