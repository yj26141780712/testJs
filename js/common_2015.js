function writeGoogleADs(adSlot, adW, adH, adNote) {
    document.writeln("<script type=\"text/javascript\"><!--");
    document.writeln("google_ad_client = \"pub-8683919961926629\";");
    document.writeln("google_ad_slot = \"" + adSlot + "\";");
    document.writeln("google_ad_width = " + adW + ";");
    document.writeln("google_ad_height = " + adH + ";");
    document.writeln("//-->");
    document.writeln("</script>");
    document.writeln("<script type=\"text/javascript\" src=\"http://pagead2.googlesyndication.com/pagead/show_ads.js\">");
    document.writeln("</script>");
}

function isTest(t_re, t_t, i_e) {
    if (i_e != null && (t_t == "" || t_t == "undefined" || t_t == null)) { return true; }
    try {
        var regX = new RegExp(t_re, "ig");
        if (regX.test(t_t)) { return true; } else { return false; }
    } catch (e) {
        return false;
    }
}

var gReg = {
    "md5": "^[A-Za-z0-9]{32}$",
    "url": "^(http:\\/)?\\/([A-Za-z0-9]+\\.)?[A-Za-z0-9]+[\\/=\\?%\\-&_~`@[\\]\\':+!]*([^<>\"])*$",
    "urls": "^(http|https):\\/\\/[A-Za-z0-9]+\\.[A-Za-z0-9]+[\\/=\\?%\\-&_~`@[\\]\\':+!]*([^<>\"])*$",
    "mail": "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
    "pass": "^[A-Za-z0-9\\u0391-\\uFFE5]{6,20}$",
    "answer": "^[A-Za-z0-9\\u0391-\\uFFE5]{6,20}$",
    "name": "^[A-Za-z0-9\\u0391-\\uFFE5]{1,16}$"
}


function loadJQuerys(t_u) {
    var _doc = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", t_u);
    _doc.appendChild(script);
    script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
            doneJS();
            //try { doneJS(); } catch (e) { alert("Error: doneJS();"); }
        }
        script.onload = script.onreadystatechange = null;
    }
}

function initJS() { loadJQuerys("/js/jquery-1.10.2.min.js"); }

var gTopCfg = [["grp", false, "/iframe/all.htm", 320, 360], ["grn", false, "/iframe/notice.htm", 240, 260], ["gru", false, "/iframe/my.aspx", 200, 240]];

//初始化顶部右侧
function initTopRight() {
    for (var i = 0; i < gTopCfg.length; i++) {
        $("#" + gTopCfg[i][0]).click(function (event) {
            var o_id = $(this).attr("id");
            var b_s = false;
            var i_i = 0;
            for (var ib = 0; ib < gTopCfg.length; ib++) {
                if (gTopCfg[ib][0] == o_id) {
                    i_i = ib;
                    if ($("#" + gTopCfg[ib][0]).hasClass("curr")) {
                        $("#" + gTopCfg[i][0]).removeClass("curr");
                        $("#" + gTopCfg[i][0] + "s").fadeOut();
                        b_s = true;
                    } else {
                        $("#" + gTopCfg[ib][0]).addClass("curr");
                    }
                } else {
                    $("#" + gTopCfg[ib][0]).removeClass("curr");
                    $("#" + gTopCfg[ib][0] + "s").fadeOut();
                }
            }
            if (!b_s) {
                $("#" + o_id + "s").fadeToggle();
                if (gTopCfg[i_i][1] == false) {
                    gTopCfg[i_i][1] = true;
                    $("#" + o_id + "s").html("<iframe src=\"" + gTopCfg[i_i][2] + "\" name=\"iframe_" + gTopCfg[i_i][1] + "\" id=\"iframe_" + gTopCfg[i_i][1] + "\" frameborder=\"0\" scrolling=\"auto\" style=\"width:" + gTopCfg[i_i][3] + "px;height:" + gTopCfg[i_i][4] + "px;overflow:hidden;\"></iframe>");
                }
            }            
            event.stopPropagation();
        });
    }
    $(document).click(function (event) {
        for (var i = 0; i < gTopCfg.length; i++) {
            if ($("#" + gTopCfg[i][0]).hasClass("curr")) {
                $("#" + gTopCfg[i][0]).removeClass("curr");
                $("#" + gTopCfg[i][0] + "s").fadeOut();
            }
        }
        event.stopPropagation();
    });
    var u_name = getCookie("user", "mail");
    var u_pass = getCookie("user", "pass");
    if (isTest("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$", u_name) && isTest("^[A-Z0-9]{20,50}$", u_pass)) {
        $("#grn").show();
        $("#gru").show();
        $("#gra").hide();
    } else {
        $("#gra").html("<a href=\"/login.aspx\">登录</a><a href=\"/join.aspx\">注册</a>");
    }

}

function getCookie(a, b) {
    var i = document.cookie.match(new RegExp("(^|\\;\\s+)" + a + "\\=(.[^\\;]*)(\\;|$)"), "i");
    i = i ? unescape(i[2]) : "";
    if (i != "" && b) { i = i.match(new RegExp("(\\&|^)" + b + "\\=(.[^\\&]*)(\\&|$)"), "i"); i = i ? i[2] : ""; }
    return i;
}

function getUrls(n) {
    var t_i = decodeURIComponent(window.location.search).match(new RegExp("(^\\?|\\&)" + n + "\\=(.[^\\&]*)(\\&|$)", "i"));
    return t_i ? unescape(t_i[2]) : "";
}

var xmlhttp = null;

function createXmlHttp() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else if (!xmlhttp && window.ActiveXObject) {
        var xmlhttpVer = ["Msxml2.XMLHttp.6.0", "Msxml2.XMLHttp.5.0", "Msxml2.XMLHttp.4.0", "Msxml2.XMLHttp.3.0", "Msxml2.XMLHttp", "Microsoft.XMLHttp"];
        for (var i = 0; i < xmlhttpVer.length; i++) {
            try { xmlhttp = new ActiveXObject(xmlhttpVer[i]); } catch (e) { }
        }
    }
}

function jsAddEvent(o_id, o_name, o_fun) {
    if (!document.getElementById(o_id)) { return; }
    var o_o = document.getElementById(o_id);
    if (window.attachEvent) {
        o_o.attachEvent(o_name, o_fun);
    } else {
        if (window.addEventListener) { o_name = o_name.replace(/^on/ig, ""); o_o.addEventListener(o_name, o_fun, true); }
    }
}

function getID(o_id, t_s) {
    if (!document.getElementById(o_id)) { return ""; }
    var obj = document.getElementById(o_id);
    if (isTest("^(input|textarea|button)$", obj.nodeName)) { return obj.value; }
    if (isTest("^select$", obj.nodeName)) {
        var s_i = obj.selectedIndex;
        if (s_i >= 0) {
            if (t_s == "text") { return obj.options[s_i].text; } else { return obj.options[s_i].value; }
        }
        return "";
    }
    try { return obj.innerHTML; } catch (e) { return ""; }
}

function setID(o_id, t_t) {
    if (!document.getElementById(o_id)) { return; }
    var obj = document.getElementById(o_id);
    if (isTest("^(input|textarea)$", obj.nodeName)) { obj.value = t_t; return; }
    if (isTest("^select$", obj.nodeName)) {
        for (var i = 0; i < obj.options.length; i++) {
            if (obj.options[i].value == t_t) { obj.options[i].selected = true; return; }
        }
        return;
    }
    try { obj.innerHTML = t_t; } catch (e) { return; }
}

function getChecked(o_n) {
    if (document.getElementsByName(o_n) <= 0) { return ""; }
    var obj = document.getElementsByName(o_n);
    var t_r = "";
    if (isTest("^input$", obj[0].nodeName)) {
        if (isTest("^radio$", obj[0].type)) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].checked) { return obj[i].value; }
            }
            return t_r;
        } else if (isTest("^checkbox$", obj[0].type)) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].checked) {
                    t_r += obj[i].value;
                    if (obj.length > 1) { t_r += ","; }
                }
            }
        }
    }
    return t_r;
}

function setChecked(o_n, o_v) {
    if (document.getElementsByName(o_n) <= 0) { return; }
    var obj = document.getElementsByName(o_n);
    var t_r = "";
    if (isTest("^input$", obj[0].nodeName)) {
        if (isTest("^(radio|checkbox)$", obj[0].type)) {
            o_v += ",";
            o_v = o_v.replace(/\,+/g, ",");
            var a_v = o_v.split(",");
            for (var i = 0; i < obj.length; i++) {
                for (var i_a in a_v) {
                    if (a_v[i_a] == "") { break; }
                    if (obj[i].value == a_v[i_a]) { obj[i].checked = true; } else { obj[i].checked = false; }
                }        
            }
        }
    }
}

function showID(o_id, i_t) {
    var obj = document.getElementById(o_id);
    if (obj != null) { obj.style.visibility = "visible"; }
    if (i_t != null) { hideID(o_id, i_t); }
}

function hideID(o_id, i_t) {
    var obj = document.getElementById(o_id);
    if (obj != null) {
        if (isNaN(i_t)) { obj.style.visibility = "hidden"; } else { window.setTimeout(function () { obj.style.visibility = "hidden"; }, i_t); }
    }
}

function viewID(o_id, i_t) {
    var obj = document.getElementById(o_id);
    if (obj != null) { obj.style.display = ""; }
    if (i_t != null) { noneID(o_id, i_t); }
}

function noneID(o_id, i_t) {
    var obj = document.getElementById(o_id);
    if (obj != null) {
        if (isNaN(i_t)) { obj.style.display = "none"; } else { window.setTimeout(function () { obj.style.display = "none"; }, i_t); }
    }
}