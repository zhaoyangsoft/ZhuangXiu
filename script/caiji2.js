var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');

//需要爬的页面
var url = 'http://daily.zhihu.com';

function fetchPage(url) {
  startRequest(url);
}

//获取故事标题、内容链接和图片链接
function startRequest(url) {
  http.get(url, function(res) {
    var html = '';
    var storys = [];

    res.setEncoding('utf-8');
    res.on('data', function(chunk) {
      html += chunk;
    });

    //1. 现将列表爬下来，列表包含每一个故事的标题、详细内容的链接等
    res.on('end', function() {
      var $ = cheerio.load(html);
      $('.main-content-wrap .row .col-lg-4').each(function(index, item) {
        var wraps = $(item).children();
        wraps.each(function(index, box) {
          var item_box = $(box).find('a');
          var story = {};
          story.title = item_box.text();
          story.link = url + item_box.attr('href');
          story.img = item_box.find('img').attr('src');
          var length = storys.length;
          story.index = length;
          storys[length] = story;
        });
      });

      //2. 遍历列表，获取详细内容
      storys.forEach(function(item) {
        fetchStoryContent(item.link, function(content, author) {
          item.content = content;
          item.author = author;

          //3. 将内容存储到本地文件
          fs.open('./data/' + item.title, item.content, 'utf-8', function(error) {
            if (error) {
              console.log('出错了，=', error);
            }
          });
        });
      }, this);
    });
  });
}

//获取故事内容
function fetchStoryContent(url, callbackFunc) {
  var html = '';
  http.get(url, function(res) {
    res.on('data', function(chunk) {
      html += chunk;
    });

    res.on('end', function() {
      $ = cheerio.load(html);
      var title = $('title').text();
      var author = $('span.author').text();
      var contentDom = $('.answer .content');
      var content = '';
      contentDom.each(function(index, item) {
        var text = $(this).text();
        content += text;
      });
      //console.log(author);
      callbackFunc(content, author);
    });
  });
}

//开始请求
fetchPage(url);
