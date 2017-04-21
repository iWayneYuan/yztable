/**
 * Created by yuanzhao on 2017/3/14.
 */
var mytable = function(obj){
    var count = 0;
    var option = '';
    var open = obj.open?'open':'';
    //判断本地是否存储
    var storage_name = 'ace-check'+window.location.pathname;
    storage_name = storage_name.substr(storage_name.length-1,1) == '/'?storage_name:storage_name+'/';
    var storage_check =JSON.parse(localStorage.getItem(storage_name));

    if(storage_check){
        if(storage_check.length == $(obj.selector).find('th').length){
            set_table_view(storage_check);
        }else{
            localStorage.clear();
            set_table_view();
        }
    }else{
        set_table_view();
    }
    //创建view
    function set_table_view(storage_check){
        $(obj.selector).find('th').each(function(index){
            if(!$(this).attr('show')){
                var is_checked =storage_check?typeof(storage_check[index])!= "undefined"?storage_check[index]['checked']?'checked':'':'checked':'checked';
            }else{
                var is_checked =storage_check?typeof(storage_check[index])!= "undefined"?storage_check[index]['checked']?'checked':'':'':'';
            }
            option +="        <div>"+
                "            <input type=\"checkbox\" class=\"ace ace-checkbox-2\" index='"+index+"' "+is_checked+">"+
                "            <label class=\"lbl\" for=\"ace-settings-navbar\"> "+$(this).text()+"</label>"+
                "        </div>";
            if(is_checked == ''){
                $(this).hide();//隐藏th
                $(obj.selector).find('tr').each(function(){//隐藏列
                    $(this).find('td:eq('+index+')').hide();
                })
            }
            //遍历结束触发
            if (++count === $(obj.selector).find('th').length) {
                $(obj.selector).show();
                model_action();
            }
        })
    }
    //构建互动操作
    function model_action(){
        var html = "<div class=\"ace-settings-container\" id=\"ace-settings-container\">"+
            "    <div class=\"btn btn-app btn-xs btn-warning ace-settings-btn "+open+"\" id=\"ace-settings-btn\">"+
            "        icon"+
            "    </div>"+
            "    <div class=\"ace-settings-box "+open+"\" id=\"ace-settings-box\">"+
            option+
            "    </div>"+
            "</div>";
        $('body').append(html);
        $('#ace-settings-btn').click(function(){//绑定缩小放大事件
            if($(this).hasClass('open')){
                $(this).removeClass('open');
                $('#ace-settings-box').removeClass('open');
            }else{
                $(this).addClass('open');
                $('#ace-settings-box').addClass('open');
            }
        })
        $('.ace-checkbox-2').click(function(){//控制列显示隐藏
            get_all_ace_check();
            var index = $(this).attr('index');
            if($(this)[0].checked){
                $(obj.selector).find('th:eq('+index+')').show();
                $(obj.selector).find('tr').each(function(){//隐藏列
                    $(this).find('td:eq('+index+')').show();
                })
            }else{
                $(obj.selector).find('th:eq('+index+')').hide();
                $(obj.selector).find('tr').each(function(){//隐藏列
                    $(this).find('td:eq('+index+')').hide();
                })
            }
        })
        //获取
        function get_all_ace_check(){
            if(supports_html5_storage()){
                var checked = [];
                var count = 0;
                $("#ace-settings-container input[type=checkbox]").each(function(index){
                    checked.push({'index':index,'checked':$(this)[0].checked,'name':$(this).siblings('.lvl').text()});
                    //遍历结束触发
                    if (++count === $("#ace-settings-container input[type=checkbox]").length) {
                        checked = JSON.stringify(checked);
                        localStorage.setItem(storage_name,checked);
                    }
                });
            }
        }
        //判断是否支持
        function supports_html5_storage() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        }
    }
}