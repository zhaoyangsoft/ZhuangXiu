/**
 * 采集脚本
 */

//引入需要的包
var http = require('http');
var url = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

const isImg = true;
const htmlTag = 'img';
const htmlAttr = 'src';

//定义常量
var filePrefix = 'http://demo221.ym79.com';
// Step2 打开Top 3 的文章； copy html 内容，
//数据请求
async function dataRequest(dataUrl) {
  console.log('dataRequest-->', dataUrl);

  //发送请求(可以请求 网络 js/css 文件)
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

  const subFileLinks = [];
  const ss = $(htmlTag);
  console.log('links->', ss);
  for (let i = 0; i < ss.length; i++) {
    const scriptItem = ss[i];
    const url = $(scriptItem).attr(htmlAttr);
    if (url && url !== 'undefined') {
      console.log('cur link->', subFileLinks.push(url));
    }
  }
  return subFileLinks;
}

/**
 * 解析html
 */
async function parseSubUrl(urls) {
  for (let i = 0; i < urls.length; i++) {
    const urlTemp = urls[i];
    const fileName = urlTemp.substr(urlTemp.lastIndexOf('/') + 1);
    const filePath = urlTemp.replace(fileName, '');

    let url = urls[i] + '';
    if (url.indexOf('/wp-') !== -1) {
      url = filePrefix + url;
    }

    if (!isImg) {
      //发送请求
      request(
        {
          url: url,
          method: 'GET',
        },
        function(err, red, body) {
          console.log('fileName-->', fileName);
          console.log('body-->', body);
          // console.log('content', contentHtml);
          doWriteFile(fileName, body, filePath);
          // 获取主要文章内容， 标题，
        },
      );
    } else {
      url = filePrefix + url;
      console.log('img url-->', url);

      // TODO IMG
      http.get(url, function(req, res) {
        //path为网络图片地址
        var imgData = '';
        req.setEncoding('binary');
        req.on('data', function(chunk) {
          imgData += chunk;
        });
        req.on('end', function() {
          // TODO IMG.....
          doWriteImg(fileName, imgData, filePath);
        });
      });
    }
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
  let tempDir = url.parse(dir).dir; //拿到上级路径
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await dirExists(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}

async function doWriteFile(fileName, content, filePath) {
  const htmlTpl = `${content}`;
  await dirExists(`./caijiNeiRong${filePath}`);
  fs.writeFile(`./caijiNeiRong${filePath}/${fileName}`, htmlTpl, err => {
    console.log('err-->', err);
  });
}

async function doWriteImg(fileName, imgData, filePath) {
  await dirExists(`./caijiNeiRong${filePath}`);
  fs.writeFile(`./caijiNeiRong${filePath}/${fileName}`, imgData, 'binary', function(err) {
    //path为本地路径例如public/logo.png
    if (err) {
      console.log('保存出错！');
    } else {
      console.log('保存成功!', url);
    }
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
dataRequest(filePrefix);
// }, 100000);
