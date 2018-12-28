$(document).ready(function() {
    debugger;
    $("#ReasonLook").click(function() {
        var lbresoncount = 0;
        $("*[id^='lblReason_']").each(function() {
            lbresoncount++;
        });
        var RightCount = 0;
        for (var i = 1; i < lbresoncount + 1; i++) {
            var blid = "lblReason_" + i;
            if (document.getElementById(blid).value == "") {
                RightCount = i;
                break;
            }
        }
        if (parseInt(RightCount) == 0) {
            RightCount = lbresoncount;
        }
        window.open('ReasonLook.aspx?lbresoncount=' + RightCount, 'ReasonLook', 'height=400,width=480,scrollbars=no,resizable=no,status=yes,toolbar=no,menubar=no,location=no', '_black')
    });
    $("#DelDiv").click(function() {
        debugger;
        var lbresoncount = 0;
        $("*[id^='lblReason_']").each(function() {
            lbresoncount++;
        });
        $("#div_" + lbresoncount).remove();

        $("#ControlCount").val(lbresoncount - 1);
    });

    $("#ItemCodeLook").click(function() {
        var lbItemcount = 0;
        $("*[id^='lblItemCode_']").each(function() {
            lbItemcount++;
        });
        var RightCount = 0;
        for (var i = 1; i < lbItemcount + 1; i++) {
            var blid = "lblItemCode_" + i;
            if (document.getElementById(blid).value == "") {
                RightCount = i;
                break;
            }
        }
        if (parseInt(RightCount) == 0) {
            RightCount = lbItemcount;
        }
        var Newlist_main = document.getElementById("strWhere_bmt").value
        var mainKey = document.getElementById("txtMoPartNo").value;
        var gongdanMain = document.getElementById("txtMO").value;
        window.open('CodeLook.aspx?lbCodecount=' + RightCount + '&ItemCode=' + mainKey + '&gongdan=' + gongdanMain + '&list_main=' + Newlist_main, 'CodeLook', 'height=400,width=425,scrollbars=no,resizable=no,status=yes,toolbar=no,menubar=no,location=no', '_black')
    });

    $('#ErrorPhotofileAdd').click(function() {
        var idcount = 1;
        $("*[id^='lblReason_']").each(function() {
            idcount++;
        });
        var ReId = "lblReason_" + idcount;
        var ItemId = "lblItemCode_" + idcount;
        var PicId = "lbpicname_" + idcount;
        var aa = "<div  align='left' id='div_" + idcount + "'><tr><td>不良原因" + parseInt(idcount) + "：</td><td><input  id='" + ReId + "' name='" + ReId + "' /></td><td>零件位置代碼" + parseInt(idcount) + "：</td><td><input id='" + ItemId + "' name='" + ItemId + "' /></td><td>圖片名稱：</td><td><input  readonly='readonly' id='" + PicId + "' name='" + PicId + "' /></td></tr></div>";
        $(ErrorPhotouploadPhoto).before(aa);
        $("#" + ReId).die().live("change", function(e) {
            debugger;
            alert($(this).attr('id'));
        });
        $("#ControlCount").val(idcount);
    });

    $("#<%=rbljixiustate.ClientID %>").change(function() {
        var SelectVal = $("#rbljixiustate").find("[checked]").val();
        if (SelectVal == 3) {
            $("#Label1").css("display", "inline");
            $("#RadioButtonList1").css("display", "inline");
        } else if (SelectVal == 5) {
            $("#Label1").css("display", "none");
            $("#RadioButtonList1").css("display", "none");
            $("#lblChaiPosition").css("display", "inline");
            $("#txtChaiPosition").css("display", "block");
        } else {
            $("#Label1").css("display", "none");
            $("#RadioButtonList1").css("display", "none");
            $("#txtChaiPosition").val("");
            $("#lblChaiPosition").css("display", "none");
            $("#txtChaiPosition").css("display", "none");
        }

        $.post("RepairHandler1.ashx", {
                action: "rbljixiustate_change",
                txtjizhong: $("#txtjizhong").val(),
                rbljixiustate: $("#rbljixiustate").find("[checked]").val()
            },
            function(data) {
                if (data.batVol == "true") {
                    $("#batVol").css("display", "block");
                    $("#<%= this.hidFlag2.ClientID %>").val("1");
                } else {
                    $("#batVol").css("display", "none");
                    $("#<%= this.hidFlag2.ClientID %>").val("0");
                }
            }, "json");

        $.post("RepairHandler1.ashx", {
                action: "sn_change",
                sn: $("#txtsn").val(),
                rbljixiustate: $("#rbljixiustate").find("[checked]").val()
            },
            function(data) {
                var statusCode = data.split(";")[0].split(":")[1];
                if (statusCode == 300) {
                    var count = data.split(";")[1].split(":")[1];
                    if (count == 1) {
                        var empno = data.split(";")[2].split(":")[1];
                        alert("SN板卡指派?了！" + empno + ",?确?SN是否正确！");
                    } else if (count == 2) {
                        alert("SN板卡狀態不為維修中！");
                    }
                    $("#txtrid").val("");
                    $("#txtgongdan").val("");
                    $("#txtjizhong").val("");
                    $("#txttouchan").val("");
                    $("#txtbadcode").val("");
                } else if (statusCode == 200) {
                    var txtjizhong = data.split(";")[1].split(":")[1];
                    var txtgongdan = data.split(";")[2].split(":")[1];
                    var txttouchan = data.split(";")[3].split(":")[1];
                    var txtbadcode = data.split(";")[4].split(":")[1];
                    var banwan = data.split(";")[5].split(":")[1];
                    var batVol = data.split(";")[6].split(":")[1];

                    $("#txtgongdan").val(txtgongdan);
                    $("#txtjizhong").val(txtjizhong);
                    $("#<%= this.hidFlag3.ClientID %>").val(txtjizhong);
                    $("#txttouchan").val(txttouchan);
                    $("#txtbadcode").val(txtbadcode);
                    if (banwan == "true") {
                        $("#banwan").css("display", "block");
                        $("#<%= this.hidFlag1.ClientID %>").val("1");
                    } else {
                        $("#banwan").css("display", "none");
                        $("#<%= this.hidFlag1.ClientID %>").val("0");
                    }
                    if (batVol == "true") {
                        $("#batVol").css("display", "block");
                        $("#<%= this.hidFlag2.ClientID %>").val("1");
                    } else {
                        $("#batVol").css("display", "none");
                        $("#<%= this.hidFlag2.ClientID %>").val("0");
                    }
                }
            }, "text");
    });

    $("#<%=RadioButtonList1.ClientID %>").change(function() {
        var RadioButtonList1 = $("#RadioButtonList1").find("[checked]").val();
        if (RadioButtonList1 == 1) {
            $("#lblChaiPosition").css("display", "inline");
            $("#txtChaiPosition").css("display", "block");
        } else {
            $("#lblChaiPosition").css("display", "none");
            $("#txtChaiPosition").css("display", "none");
        }
    });
    var rbljixiustate = $("#rbljixiustate").find("[checked]").val();
    if (rbljixiustate != "" && rbljixiustate != null) {
        if (SelectVal == 3) {
            $("#Label1").css("display", "inline");
            $("#RadioButtonList1").css("display", "inline");
            var RadioButtonList1 = $("#RadioButtonList1").find("[checked]").val();
            if (RadioButtonList1 == 1) {
                $("#lblChaiPosition").css("display", "inline");
                $("#txtChaiPosition").css("display", "block");
            } else {
                $("#lblChaiPosition").css("display", "none");
                $("#txtChaiPosition").css("display", "none");
            }
        } else if (SelectVal == 5) {
            $("#Label1").css("display", "none");
            $("#RadioButtonList1").css("display", "none");
            $("#lblChaiPosition").css("display", "inline");
            $("#txtChaiPosition").css("display", "block");
        } else {
            $("#Label1").css("display", "none");
            $("#RadioButtonList1").css("display", "none");
            $("#txtChaiPosition").val("");
            $("#lblChaiPosition").css("display", "none");
            $("#txtChaiPosition").css("display", "none");
        }

        $.post("RepairHandler1.ashx", {
                action: "rbljixiustate_change",
                txtjizhong: $("#txtjizhong").val(),
                rbljixiustate: $("#rbljixiustate").find("[checked]").val()
            },
            function(data) {
                if (data.batVol == "true") {
                    $("#batVol").css("display", "block");
                    $("#<%= this.hidFlag2.ClientID %>").val("1");
                } else {
                    $("#batVol").css("display", "none");
                    $("#<%= this.hidFlag2.ClientID %>").val("0");
                }
            }, "json");
    }



});