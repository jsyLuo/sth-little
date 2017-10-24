
// 简单的配置
require.config({


    baseUrl: "./scripts/helper",    // ./指的是html文件目录
    paths: {

        "jquery": "jquery",
        "func":"func",
        "lodash":"lodash.core"
    }

});


require(["jquery","func"], function($,func) {
   console.log( $('body'));
   func.add();
   //func.tools.add();
    //console.log(func);
$('body').css('background','pink')


});