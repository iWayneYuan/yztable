# yztable
超简单可自定义html table 列 显示隐藏的jquery插件

###引入资源文件
jquery版本无要求

    <link href="./assets/css/bootstrap.min.css"  rel='stylesheet' />
    <link href="./assets/css/ace.min.css"  rel='stylesheet'/>
    <script src="./assets/js/jquery-3.1.0.min.js"></script>
	 <script src="./assets/js/ace.js"></script>
	 
	 
###使用
####html代码
```html
<table class="ace-table" id="test">
    <tr>
        <th>id</th>
        <th show="false">姓名</th>
        <th>age</th>
    </tr>
    <tr>
        <td>1</td>
        <td>way</td>
        <td>23</td>
    </tr>
    <tr>
        <td>2</td>
        <td>小兔子</td>
        <td>17</td>
    </tr>
    <tr>
        <td>3</td>
        <td>wayne</td>
        <td>23</td>
    </tr>
</table>
```
####js代码
```js
$(function(){
    mytable({
        selector:'#test',//选择器
        open:true,//是否展开
    });
})
```    
