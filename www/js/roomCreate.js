/*
 * 部屋作成画面
 * 
 */

myApp.controller('base', function ($scope, $rootScope) {
    $scope.room = {};
    $scope.room.name = "";
    $scope.room.date = "";
    $scope.room.time = "";

    $scope.insert = function () {
        if ($scope.room.name == "") {
            ons.notification.alert({message: 'グループ名を入力してください', modifier: 'material'});
            return;
        }

        var group_name = $scope.room.name;
        var term = $scope.room.limit.toString();
        var user_id = localStorage.getItem("user_id");
        console.log("$scope.room.limit=" + term );
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
            console.log(data);
            ons.notification.alert({message: 'チャットルームを作成しました', modifier: 'material', title:'Info'});
        }).fail(function (data, status, xhr) {
            ons.notification.alert({message: 'チャットルームを作成しました', modifier: 'material'});
        }).always(function (data, status, xhr) {
            myNavigator.pushPage('top.html');
        });
    };
});
