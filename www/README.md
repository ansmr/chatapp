# 開発Tipsをここにまとめていきましょう！
- 開発環境構築手順（プロジェクトを圧縮してインポート）
- 開発方法（どういう仕組みで動いているか？など）
- 運用方法（gitのブランチの運用手順も決めないとですね）

などなど気軽に更新してナレッジを溜めていきましょう。

# Getting Started to Onsen UI Minimum Template

This template is using Onsen UI, a HTML5 framework that is focusing on the speed and ease of use.
For details, please check out [Onsen UI Website](http://onsenui.io) and [its documents](http://onsenui.io/guide/overview.html).

## For non-AngularJS Users

Here are the resources that might help you:

- [List of Components](http://onsenui.io/guide/components.html)
- [Onsen UI Guide](http://onsenui.io/guide/overview.html)

## For AngularJS Users

You need to edit `index.html` to have more tighter integration with AngularJS. More precisely, you need to add `ng-app` definition and call `angular.module()` to add `onsen` module to your app.

Here is the code snippet that you can copy & paste for quicker setup.

```
<!DOCTYPE HTML>
<html ng-app="myApp">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <script src="components/loader.js"></script>
    <link rel="stylesheet" href="components/loader.css">
    <link rel="stylesheet" href="css/style.css">
     <script>
        angular.module('myApp', ['onsen']);
    </script>
</head>
<body>
    <ons-navigator var="myNavigator" page="page1.html">
    </ons-navigator> 
</body>
</html>
```
