/*
 * メッセージ送信画面
 * 
 */

myApp.controller("chat", function ($scope, $rootScope, $firebase) {

    var ref = new Firebase("https://151a.firebaseio.com/" + $rootScope.chatId);
    var sync = $firebase(ref);

    $scope.messages = sync.$asArray();
    var obj = localStorage.getItem("username");
    if (obj == null || obj == undefined) {
        myNavigator.pushPage("firstStart.html");
    }
    $scope.user = obj;

    $scope.addMessage = function (message) {
        if (message) {
            var sendtime = new Date(jQuery.now());
            // 日付関連関数は今度共通化しよう
            sendtime = sendtime.getFullYear() + "年" +
                    (sendtime.getMonth() + 1) + "月" +
                    sendtime.getDate() + "日 " +
                    sendtime.getHours() + ":" +
                    sendtime.getMinutes();
            $scope.messages.$add({from: $scope.user, content: message, sendtime: sendtime});
            $scope.message = "";
        }
    };
    // 招待コードを取得
    data = "";
    $.ajax({
        'type': 'POST',
        'url': invitateUrl + $rootScope.chatId,
        'data': JSON.stringify(data),
        'dataType': 'JSON',
        'headers': {'Content-Type': 'application/json'}
    }).done(function (data, status, xhr) {
        $rootScope.invitationCode = data.result;
    });
    $(".subBar").hide();
    $scope.showSubBar = function () {
        $(".subBar").animate({height: "toggle", opacity: "toggle"}, "slow");
    };
});

myApp.controller('joinUsers', function ($scope, $rootScope) {
    $.ajax({
        type: 'get',
        url: userListUrl + $rootScope.chatId,
        headers: {
            'Content-Type': 'application/json'
        },
        dataType: 'JSON'
    }).done(function (data, status, xhr) {
        var arr = [];
        for (var i = 0; data.result.length > i; i++) {
            arr[i] = JSON.parse(JSON.stringify(data.result[i]));
        }
        $scope.prefs = arr;
    }).fail(function (data, status, xhr) {
        ons.notification.alert({message: status, modifier: 'material'});
    }).always(function (data, status, xhr) {
    });
    
    $scope.oneOnOne = function(userId, userName) {
        if(userId == localStorage.getItem("user_id")) {
            // 自分の選択はスルー
            return;
        }
        
        ons.notification.confirm(
            {message: userName + 'さんと2人のチャットルームを作成しますか？', 
             modifier: 'material', 
             title:'確認',
             callback: function(answer) {
                console.log(answer);
                if(! answer) {
                    return;
                }
                var group_name = user_name + '＆' + userName;
                var term = $rootScope.limitTime.toString();
                var user_id = localStorage.getItem("user_id");
                var data = {
                    "term":term
                };
                $.ajax({
                    'type': 'POST',
                    'url': groupAddUrl + encodeURI(group_name) + "/" + user_id + "/" + term,
                    'data': JSON.stringify(data),
                    'dataType': 'JSON',
                    'headers': {'Content-Type': 'application/json'}
                }).done(function (data, status, xhr) {
                    // 部屋作成に成功したらalwaysで招待
                }).fail(function (data, status, xhr) {
                    ons.notification.alert({message: '2人のチャットルームの作成に失敗しました', modifier: 'material'});
                }).always(function (data, status, xhr) {

                    $.ajax({
                        type: 'post',
                        url: groupJoinUrl + data.result.group_id + '/' + userId,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        dataType: 'JSON',
                        scriptCharset: 'utf-8',
                    }).done(function (data, status, xhr) {
                        ons.notification.alert({message: "2人のチャットルームを作成しました:" + status, modifier: 'material', title:'Info'});
                    }).fail(function (data, status, xhr) {
                        ons.notification.alert({message: 'ユーザ招待に失敗しました:', modifier: 'material'});
                    });

                    myNavigator.pushPage('top.html');
                });

             }}
        );
        
    };
});

myApp.controller('invite', function ($scope, $rootScope) {
    $.ajax({
        type: 'get',
        url: getUsersUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        dataType: 'JSON'
    }).done(function (data, status, xhr) {
        var arr = [];
        for (var i = 0; data.result.length > i; i++) {
            arr[i] = JSON.parse(JSON.stringify(data.result[i]));
        }
        $scope.prefs = arr;
    }).fail(function (data, status, xhr) {
        alert("error!");
    }).always(function (data, status, xhr) {
    });

    // TODO 今は使ってないかなー
    $scope.selectUsers = function () {
        var checks = [];
        angular.forEach($scope.prefs, function (item) {
            if (item.checked)
                checks.push(item.User.uniqid);
        });
        console.log("登録group_id : " + $rootScope.chatId);
        $.each(checks, function (i, val) {
            console.log("登録user_id " + i + ": " + val);
            $.ajax({
                type: 'post',
                url: groupJoinUrl + $rootScope.chatId + '/' + val,
                headers: {
                    'Content-Type': 'application/json'
                },
                dataType: 'JSON',
                scriptCharset: 'utf-8',
            }).done(function (data, status, xhr) {
                if (i == checks.length - 1) {
                    ons.notification.alert({message: "ユーザを招待しました。:" + status, modifier: 'material', title:'Info'});
                }
                console.log("ユーザ招待結果：" + status);
            }).fail(function (data, status, xhr) {
                if (i == checks.length - 1) {
                    ons.notification.alert({message: 'ユーザを招待しました。:。', modifier: 'material'});
                }
                console.log("ユーザ招待結果：" + status);
            }).always(function (data, status, xhr) {
            });
        });
        myModal.hide();
    };
});
