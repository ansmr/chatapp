/*
 * 部屋一覧画面
 * 
 */

myApp.controller('list', function ($scope, $rootScope) {

    $scope.goChat = function (chatId, chatName, limitTime) {
        $rootScope.chatId = chatId;
        $rootScope.chatName = chatName;
        $rootScope.limitTime = limitTime;
        myNavigator.pushPage('message/chat.html');
    };
    $scope.deleteChat = function (chatId) {
        var user_id = localStorage.getItem('user_id');
        $.ajax({
            type: 'post',
            url: deleteGroupUrl + chatId + "/" + user_id,
            headers: {
                'Content-Type': 'application/json',
                'X-APPIARIES-TOKEN': 'appb15655d8ce9f55f95e91e6ae7f'
            },
            dataType: 'JSON'
        }).done(function (data, status, xhr) {
        }).fail(function (data, status, xhr) {
            ons.notification.alert({message: '削除に失敗しました。', modifier: 'material'});
            console.log(status);
        }).always(function (data, status, xhr) {
            myNavigator.pushPage('top.html');
        });
    };
});
