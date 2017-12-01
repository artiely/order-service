const utils = require('utility') // 加密模块

module.exports = {
  md5: function (password) {
    return utils.md5(utils.md5(utils.md5(utils.md5(password))))
  },
  iGetInnerText: function (testStr) {
    var resultStr = testStr.replace(/\ +/g, ""); //去掉空格
    resultStr = testStr.replace(/[ ]/g, ""); //去掉空格
    resultStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换行
    return resultStr;
  },
  getRandomColor: function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16); 
  }
}

/**
 * 不点燃智慧的火花，聪明的头脑也会变为愚蠢；不践行确立的目标，浪漫的理想也会失去光彩；不珍惜宝贵的时间，人生的岁月也会变得短暂；不总结失败的经验，简单的事情也会让你办砸。宠爱的出发点是爱，落脚点却是恨；嫉妒的出发点是进，落脚点却是退；梦幻的出发点是绚（烂），落脚点却是空；贪婪的出发点是盈，落脚点却是亏。
 */