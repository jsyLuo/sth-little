## 模仿云锁注册页面

http://v3.yunsuo.com.cn/register/step1

1. 使用插件判断浏览器版本
jQuery Browser Plugin 0.1.0
插件使用
http://liuviphui.blog.163.com/blog/static/2022730842017314101836699/


2. 居中方式很特别

```
 if ($.browser.msie == true) {

    if ($.browser.versionNumber < 9) {
        Browser_Flag = 1;
    }
  }
tempHeight = Browser_Flag == 0 ? window.innerHeight : $(window).height();
tempHeight = tempHeight > 750 ? tempHeight : 750;
tempWidth = $(window).width();
tempWidth = tempWidth > 1180 ? tempWidth : 1180;

$("#register_wrapper").css({ "height": tempHeight + "px", "width": tempWidth });
tempHeight = tempHeight - $("#register_header").outerHeight() - $("#register_footer").outerHeight() - 12;
$("#register_main").css({ "height": tempHeight + "px" });

```

获得window窗口的宽为容器的宽
内部div左右padding 150整好居中




3. 学习a标签的target几个属性
>_self  默认。在相同的框架中打开被链接文档。
>_blank	在新窗口中打开被链接文档。
>_top	在整个窗口中打开被链接文档。
>_parent 在父框架集中打开被链接文档。 这个应该是不常用。

```
<a target="_top" href="http://www.baidu.com.cn">关于我们</a>

```

4. 免费获取验证码那块
<button>里面套span
text()  和 html()函数的熟悉使用
disable之后回调
可以多留意js的回调函数

