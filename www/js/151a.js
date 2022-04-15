/*
 * 151a
 * Copyright (c) 2016 151a
 */

// TODO ここもconfigかなにかがいいかなー
var srvUrl = 'http://118.67.96.160/151a'; // 開発環境
// var srvUrl = 'http://27.133.236.166/151a';   // 本番環境

// TODO サーバAPIは各controllerで持つか一元管理するか
var myApp = ons.bootstrap('myApp', ['onsen', 'firebase']);
var regUserUrl      = srvUrl + '/users/add/';           // ユーザ登録
var updUserUrl      = srvUrl + '/users/upd/';           // ユーザ名更新
var getUsersUrl     = srvUrl + '/users/lists/';         // ユーザ一覧取得
var groupJoinUrl    = srvUrl + '/user_groups/joining/'; // 指定のユーザをキーにグループ参加
var groupAddUrl     = srvUrl + '/groups/add/';          // グループ新規作成
var getGroupUrl     = srvUrl + '/user_groups/lists/';   // ユーザ参加グループリスト取得
var deleteGroupUrl  = srvUrl + '/user_groups/del/';     // 参加グループ削除
var invitateUrl     = srvUrl + '/invitations/invitationCode/'; // 招待コード取得
var joinRoomUrl     = srvUrl + '/Invitations/joinRoom/'; // 指定の招待コードをキーにグループ参加
var userListUrl     = srvUrl + '/user_groups/userList/'; // 部屋参加ユーザ一覧取得

var user_name = localStorage.getItem("username");

myApp.controller('index', function ($scope, $rootScope) {
    $rootScope.get = function () {
        var userId = localStorage.getItem("user_id");
        $.ajax({
            type: 'get',
            url: getGroupUrl + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: 'JSON'
        }).done(function (data, status, xhr) {
            $rootScope.someObject = data.result;
        }).fail(function (data, status, xhr) {
            ons.notification.alert({message: 'error', modifier: 'material'});
        }).always(function (data, status, xhr) {
            myNavigator.pushPage('menu/main.html');
        });
    };
    //ニックネームの有無を確認
    var obj = localStorage.getItem("username");
    if (obj == null || obj == undefined) {
        myNavigator.pushPage("firstStart.html");
    } else {
        $rootScope.get();
    }

});

myApp.controller('firstStart', function ($scope, $rootScope) {    
    $scope.user = {};
    $scope.user.name = "";

    $scope.addUserName = function () {
        var username = $scope.user.name;
        $('#add_username_msg').html("");
        if(!$scope.checkTermsSelected)
        {
            var msg = "ERROR：利用規約に同意してください。";
            $('#add_username_msg').html(msg);
            return;
        }
        if (username == "")
        {
            var msg = "ERROR：ニックネームが空です。";
            $('#add_username_msg').html(msg);
            return;
        }
        $.ajax({
            type: 'post',
            url: regUserUrl + encodeURI(username),
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: 'JSON',
            scriptCharset: 'utf-8'
        }).done(function (data, status, xhr) {
            localStorage.setItem("username", username);
            localStorage.setItem("user_id", data.result.id);
            this.username = username;
            ons.notification.alert({message: 'ニックネームを登録しました。', modifier: 'material', title:'Info'});
            console.log(data.result.id);
            $rootScope.get();
        }).fail(function (data, status, xhr) {
            ons.notification.alert({message: 'ユーザ登録に失敗しました！', modifier: 'material'});
            localStorage.clear();
        }).always(function (data, status, xhr) {
        });
    };
});

