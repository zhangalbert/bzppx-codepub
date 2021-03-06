$(function() {
    if (parent != self) {
        parent.location = location
    }

    function errorMsg(msg) {
        $(".error-box h1").text("登录出错：" + msg);
        $(".error-box").show();
    }
    var refreshCode = function() {
        $(".captcha")[0].src = "/login/captcha?_=" + (Math.random() + "").substring(1)
    };
    $(".captcha").click(refreshCode);
    $("#login-button").click(function(event) {
        event.preventDefault();
        var u = $("[name='username']").val();
        var p = $("[name='password']").val();
        var c = $("[name='captcha']").val();
        if (!u) {
            errorMsg("用户名不能为空！");
            return
        }
        if (!p) {
            errorMsg("密码不能为空！");
            return
        }
        if (!c) {
            errorMsg("验证码不能为空！");
            return
        }
        $.post("", {
            "username": u,
            "password": p,
            "captcha": c,
        }, function(data) {
            if (data.code) {
                $(".error-box").hide();
                $('form').slideUp(500, function() {
                    $('.welcome-text').show().addClass("animated").addClass("bounceInUp");
                    setTimeout(function() {
                        location = data.redirect.url;
                    }, data.redirect.sleep * 3);
                });
            } else {
                errorMsg(data.message);
                // alert(data.message);
                $("[name='captcha']").val("");
                refreshCode();
            }
        }, "json");
        return
    });
    $(".form-tab li").on("click", function() {
        var index = $(this).index();
        $(this).addClass("cur").siblings().removeClass("cur");
        $(".form-con>div").hide().eq(index).show();
        if (index == 0) {
            $(".form-foot").hide();
        } else {
            $(".form-foot").show();
        }
        $(".form-error").hide();
    });
    $('form').on("keydown", function(event) {
        if (event.which == 13) {
            $("#login-button").click();
        }
    });
});