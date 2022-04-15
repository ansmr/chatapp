/*
 * メニュー画面
 * 
 */

myApp.controller('main', function ($scope, $rootScope) {
    $scope.username = localStorage.getItem("username");
});

myApp.controller('nameEdit', function ($scope, $rootScope) {
    $scope.user = {};
    $scope.user.name = user_name;
    var user_id = localStorage.getItem("user_id");

    $scope.upd = function () {
        var username = $scope.user.name;

        $.ajax({
            type: 'post',
            url: updUserUrl + user_id + "/" + encodeURI(username),
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: 'JSON',
            scriptCharset: 'utf-8',
        }).done(function (data, status, xhr) {
            ons.notification.alert({message: 'ニックネームを変更しました。', modifier: 'material', title:'Info'});
            localStorage.setItem("username", username);
            $rootScope.get();
        }).fail(function (data, status, xhr) {
            ons.notification.alert({message: 'ニックネーム変更に失敗しました！', modifier: 'material'});
            localStorage.clear();
        }).always(function (data, status, xhr) {
        });
    };
});

myApp.controller('joinRoom', function ($scope, $rootScope) {
    $scope.joinRoom = {};
    $scope.joinRoom.code = "";
    var user_id = localStorage.getItem("user_id");

    $scope.join_room = function () {
        var joinRoomCode = $scope.joinRoom.code;
        if (joinRoomCode == "") {
            ons.notification.alert({message: '招待コードを入力してね', modifier: 'material'});
            return;
        }
        $.ajax({
            'type': 'POST',
            'url': joinRoomUrl + encodeURI(joinRoomCode) + "/" + user_id,
            'headers': {'Content-Type': 'application/json'},
            'dataType': 'JSON'
        }).done(function (data, status, xhr) {
            ons.notification.alert({message: 'グループに参加しました', modifier: 'material', title:'Info'});
        }).fail(function (data, status, xhr) {
            ons.notification.alert({message: 'グループに参加できませんでした', modifier: 'material'});
        }).always(function (data, status, xhr) {
            myNavigator.pushPage('top.html');
        });
    };
});
