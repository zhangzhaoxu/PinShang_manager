var app=angular.module('routeApp',['ngRoute','ngMaterial']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/member', {
                templateUrl: 'template/member.html',
                controller:'memberCtrl'
            }).
            when('/sidong',{
                templateUrl:'template/sdMemeber.html',
                controller:'sdMemberCtrl'
            }).
            when('/audit',{
                templateUrl:'template/audit.html',
                controller:'auditCtrl'
            }).
            when('/freeActivity',{
                templateUrl:'template/freeActivity.html',
                controller:'freeActivityCtrl'
            }).
            when('/sidongActivity',{
                templateUrl:'template/sidongActivity.html',
                controller:'sidongCtrl'
            }).
            when('/ActivityReview',{
                templateUrl:'template/ActivityReview.html',
                controller:'ReActivityCtrl'
            }).
            otherwise({
                redirectTo: '/member'
            });
    }]);

app.factory('LoadService', function () {
    return {
        MemberData:'',
        auditData:'',
        freeActivityData:'',
        sidongActivityData:'',
        ReviewActivityData:'',
        sdMemberData:''
    }
});

app.filter('change', function () {
    return function (input) {
        if(input=='1'){
            return '是';
        }else{
            return '否';
        }
    }
});


//会员控制器
app.controller('memberCtrl', function ($mdDialog,$http,$scope,LoadService) {
    $scope.LoadService = LoadService;



    $scope.Request = function () {                           //初次进入页面加载所有会员数据
        $http({
            method:'get',
            url:'test.js',
            dataType:'json'
        }).success(function (data) {
            $scope.fenye(data);
            $scope.LoadService.MemberData=data;                      //将data值传到LoadService服务
        }).error(function () {
            alert("error");
        });
    };
    $scope.Request();



    $scope.pageNum=1;
    $scope.pageData=new Array();
    $scope.fenye = function (value) {
        $scope.pageNumMax=Math.ceil(value.length/8);
        if(value.length<=8){
            $scope.pageData=value;
        }else{
            for(var i=0;i<8;i++){
                $scope.pageData[i]=value[i];
            }
        }
    };


    $scope.goNext = function () {
        if($scope.pageNum>=$scope.pageNumMax){
            alert("已是最后一页");
            return;
        }else if($scope.pageNum==($scope.pageNumMax-1)){
            $scope.pageNum+=1;
            var x=$scope.LoadService.MemberData.length%8;
            $scope.pageData=[];
            for(var j=0;j<x;j++){
                $scope.pageData[j]=$scope.LoadService.MemberData[($scope.pageNum-1)*8+j]
            }
        }else if($scope.pageNumMax==1){
            $scope.pageData=$scope.LoadService.MemberData;
        }
        else{
            $scope.pageNum+=1;
            for(var j=0;j<8;j++){
                $scope.pageData[j]=$scope.LoadService.MemberData[($scope.pageNum-1)*8+j]
            }
        };

    };

    $scope.showAdvanced = function(ev,data) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'template/AllMessage.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                member: data
            }
        })
            .then();
    };

    function DialogController($scope, $mdDialog,member) {
        $scope.member=member;
        $scope.hide = function() {
            $mdDialog.hide();
        };
    }

    $scope.goBefore = function () {                                  //向前  翻页
        if($scope.pageNum<=1){
            alert("已是第一页");
            return;
        }else{
            $scope.pageNum-=1;
        }
        for(var j=0;j<8;j++){
            $scope.pageData[j]=$scope.LoadService.MemberData[($scope.pageNum-1)*8+j]
        }
    }
});


app.controller('sdMemberCtrl', function ($mdDialog,$http,$scope,LoadService) {
    $scope.LoadService = LoadService;



    $scope.Request = function () {                           //初次进入页面加载所有会员数据
        $http({
            method:'get',
            url:'text2.js',
            dataType:'json'
        }).success(function (data) {
            $scope.fenye(data);
            $scope.LoadService.sdMemberData=data;                      //将data值传到LoadService服务
        }).error(function () {
            alert("error");
        });
    };
    $scope.Request();



    $scope.pageNum=1;
    $scope.pageData=new Array();
    $scope.fenye = function (value) {
        $scope.pageNumMax=Math.ceil(value.length/8);
        if(value.length<=8){
            $scope.pageData=value;
        }else{
            for(var i=0;i<8;i++){
                $scope.pageData[i]=value[i];
            }
        }
    };


    $scope.goNext = function () {
        if($scope.pageNum>=$scope.pageNumMax){
            alert("已是最后一页");
            return;
        }else if($scope.pageNum==($scope.pageNumMax-1)){
            $scope.pageNum+=1;
            var x=$scope.LoadService.sdMemberData.length%8;
            $scope.pageData=[];
            for(var j=0;j<x;j++){
                $scope.pageData[j]=$scope.LoadService.sdMemberData[($scope.pageNum-1)*8+j]
            }
        }else if($scope.pageNumMax==1){
            $scope.pageData=$scope.LoadService.sdMemberData;
        }
        else{
            $scope.pageNum+=1;
            for(var j=0;j<8;j++){
                $scope.pageData[j]=$scope.LoadService.sdMemberData[($scope.pageNum-1)*8+j]
            }
        };

    };

    $scope.showAdvanced = function(ev,data) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'template/AllsdMessage.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                member: data
            }
        })
            .then();
    };

    function DialogController($scope, $mdDialog,member) {
        $scope.member=member;
        $scope.hide = function() {
            $mdDialog.hide();
        };
    }

    $scope.goBefore = function () {                                  //向前  翻页
        if($scope.pageNum<=1){
            alert("已是第一页");
            return;
        }else{
            $scope.pageNum-=1;
        }
        for(var j=0;j<8;j++){
            $scope.pageData[j]=$scope.LoadService.sdMemberData[($scope.pageNum-1)*8+j]
        }
    }
});


//审核控制器
app.controller('auditCtrl', function ($scope, $http, LoadService,$mdDialog) {
    $scope.LoadService=LoadService;


    $scope.Request = function () {                           //初次加载待审核会员数据
        $http({
            method:'get',
            url:'test.js',
            dataType:'json'
        }).success(function (data) {
            $scope.fenye(data);
            $scope.LoadService.auditData=data;                      //将data值传到LoadService服务
        }).error(function () {
            alert("error");
        });
    };
    $scope.Request();



    $scope.pageNum=1;
    $scope.pageData=new Array();
    $scope.fenye = function (value) {
        $scope.pageNumMax=Math.ceil(value.length/5);
        if(value.length<=5){
            $scope.pageData=value;
        }else{
            for(var i=0;i<5;i++){
                $scope.pageData[i]=value[i];
            }
        }
    };


    $scope.goNext = function () {
        if($scope.pageNum>=$scope.pageNumMax){
            alert("已是最后一页");
            return;
        }else if($scope.pageNum==($scope.pageNumMax-1)){
            $scope.pageNum+=1;
            var x=$scope.LoadService.auditData.length%5;
            $scope.pageData=[];
            for(var j=0;j<x;j++){
                $scope.pageData[j]=$scope.LoadService.auditData[($scope.pageNum-1)*5+j]
            }
        }else if($scope.pageNumMax==1){
            $scope.pageData=$scope.LoadService.auditData;
        }
        else{
            $scope.pageNum+=1;
            for(var j=0;j<5;j++){
                $scope.pageData[j]=$scope.LoadService.auditData[($scope.pageNum-1)*5+j]
            }
        };


    };

    $scope.goBefore = function () {                                  //向前  翻页
        if($scope.pageNum<=1){
            alert("已是第一页");
            return;
        }else{
            $scope.pageNum-=1;
        }
        for(var j=0;j<5;j++){
            $scope.pageData[j]=$scope.LoadService.auditData[($scope.pageNum-1)*5+j]
        }
    };

    $scope.showAdvanced = function(ev,data) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'template/AllMessage.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                member: data
            }
        })
            .then();
    };

    function DialogController($scope, $mdDialog,member) {
        $scope.member=member;
        $scope.hide = function() {
            $mdDialog.hide();
        };
    }


    $scope.MemberConfirm = function (index) {
        alert(index);
        $http({
            method:'post',
            url:'',
            data:{                                                   //确认审核发送id
                id:index
            }
        }).success(function () {
            for(var i=0;i<$scope.pageData.length;i++){
                if(index==$scope.pageData[i].id){
                    $scope.pageData.splice(i,1);
                    for(var j=0;j<$scope.LoadService.auditData.length;j++){
                        if(index==$scope.LoadService.auditData[j].id){
                            $scope.LoadService.auditData.splice(j,1);
                            $scope.pageNum=1;
                            $scope.fenye($scope.LoadService.auditData);
                        }
                    }
                    return;
                }
            }
        }).error(function (status) {
            alert("错误"+status);
        })
    }

});


//免费活动控制器
app.controller('freeActivityCtrl', function ($http, $scope, LoadService,$mdDialog) {
    $scope.LoadService = LoadService;

    $scope.Request = function () {                                      //加载所有免费活动数据
        $http({
            method:'get',
            url:'test1.js',
            dataType:'json'
        }).success(function (data) {
            $scope.fenye(data);
            $scope.LoadService.freeActivityData=data;
        }).error(function () {
            alert("error");
        });
    };
    $scope.Request();



    $scope.pageNum=1;
    $scope.pageData=new Array();
    $scope.fenye = function (value) {
        $scope.pageNumMax=Math.ceil(value.length/10);
        if(value.length<=10){
            $scope.pageData=value;
        }else{
            for(var i=0;i<10;i++){
                $scope.pageData[i]=value[i];
            }
        }
    };


    $scope.goNext = function () {
        if($scope.pageNum>=$scope.pageNumMax){
            alert("已是最后一页");
            return;
        }else if($scope.pageNum==($scope.pageNumMax-1)){
            $scope.pageNum+=1;
            var x=$scope.LoadService.freeActivityData.length%10;
            $scope.pageData=[];
            for(var j=0;j<x;j++){
                $scope.pageData[j]=$scope.LoadService.freeActivityData[($scope.pageNum-1)*10+j]
            }
        }else if($scope.pageNumMax==1){
            $scope.pageData=$scope.LoadService.freeActivityData;
        }
        else{
            $scope.pageNum+=1
            for(var j=0;j<10;j++){
                $scope.pageData[j]=$scope.LoadService.freeActivityData[($scope.pageNum-1)*10+j]
            }
        };
    };

    $scope.goBefore = function () {
        if($scope.pageNum<=1){
            alert("已是第一页");
            return;
        }else{
            $scope.pageNum-=1;
        }
        for(var j=0;j<10;j++){
            $scope.pageData[j]=$scope.LoadService.freeActivityData[($scope.pageNum-1)*10+j]
        }
    };

    $scope.showAdvanced = function(ev,data) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'template/AllActivity.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                activity: data
            }
        })
            .then();
    };

    function DialogController($scope, $mdDialog,activity) {
        $scope.activity=activity;
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.delete= function () {
            alert("Boom");
            console.log("Boom");
        };
    }

    $scope.showConfirm = function(ev,index) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('确定删除')
            .content('')
            .ariaLabel('Lucky day')
            .ok('Yes')
            .cancel('No')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            $http({
                method:'post',
                url:'',
                dataType:'json'
            }).success(function (data) {
                alert("删除成功");
            }).error(function () {
                alert("删除失败");
                return;
            });
            for(var j=0;j<$scope.LoadService.freeActivityData.length;j++){
                if(index==$scope.LoadService.freeActivityData[j].id){
                    $scope.LoadService.freeActivityData.splice(j,1);
                    $scope.pageNum=1;
                    $scope.fenye($scope.LoadService.freeActivityData);
                    return;
                }
            }
        }, function() {
        });
    };

});


app.controller('sidongCtrl', function ($http,$scope,LoadService,$mdDialog) {

    $scope.LoadService = LoadService;

    $scope.Request = function () {
        $http({
            method:'get',
            url:'test1.js',                              //加载所有私董活动数据
            dataType:'json'
        }).success(function (data) {
            $scope.fenye(data);
            $scope.LoadService.sidongActivityData=data;
        }).error(function () {
            alert("error");
        });
    };
    $scope.Request();



    $scope.pageNum=1;
    $scope.pageData=new Array();
    $scope.fenye = function (value) {
        $scope.pageNumMax=Math.ceil(value.length/10);
        if(value.length<=10){
            $scope.pageData=value;
        }else{
            for(var i=0;i<10;i++){
                $scope.pageData[i]=value[i];
            }
        }
    };


    $scope.goNext = function () {
        if($scope.pageNum>=$scope.pageNumMax){
            alert("已是最后一页");
            return;
        }else if($scope.pageNum==($scope.pageNumMax-1)){
            $scope.pageNum+=1;
            var x=$scope.LoadService.sidongActivityData.length%10;
            $scope.pageData=[];
            for(var j=0;j<x;j++){
                $scope.pageData[j]=$scope.LoadService.sidongActivityData[($scope.pageNum-1)*10+j]
            }
        }else if($scope.pageNumMax==1){
            $scope.pageData=$scope.LoadService.sidongActivityData;
        }
        else{
            $scope.pageNum+=1
            for(var j=0;j<10;j++){
                $scope.pageData[j]=$scope.LoadService.sidongActivityData[($scope.pageNum-1)*10+j]
            }
        };


    };

    $scope.goBefore = function () {
        if($scope.pageNum<=1){
            alert("已是第一页");
            return;
        }else{
            $scope.pageNum-=1;
        }
        for(var j=0;j<10;j++){
            $scope.pageData[j]=$scope.LoadService.sidongActivityData[($scope.pageNum-1)*10+j]
        }
    };

    $scope.showAdvanced = function(ev,data) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'template/AllActivity.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                activity: data
            }
        })
            .then();
    };

    function DialogController($scope, $mdDialog,activity) {
        $scope.activity=activity;
        $scope.hide = function() {
            $mdDialog.hide();
        };
    }

    $scope.showConfirm = function(ev,index) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('确定删除')
            .content('')
            .ariaLabel('Lucky day')
            .ok('Yes')
            .cancel('No')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            for(var j=0;j<$scope.LoadService.sidongActivityData.length;j++){
                if(index==$scope.LoadService.sidongActivityData[j].id){
                    $scope.LoadService.sidongActivityData.splice(j,1);
                    $scope.pageNum=1;
                    $scope.fenye($scope.LoadService.sidongActivityData);
                    return;
                }
            }
        }, function() {
        });
    };
});


app.controller('ReActivityCtrl', function ($http,$scope,LoadService,$mdDialog) {

    $scope.LoadService = LoadService;

    $scope.Request = function () {
        $http({
            method:'get',
            url:'test1.js',
            dataType:'json'                                  //加载所有活动回顾数据
        }).success(function (data) {
            $scope.fenye(data);
            $scope.LoadService.ReviewActivityData=data;
        }).error(function () {
            alert("error");
        });
    };
    $scope.Request();



    $scope.pageNum=1;
    $scope.pageData=new Array();
    $scope.fenye = function (value) {
        $scope.pageNumMax=Math.ceil(value.length/10);
        if(value.length<=10){
            $scope.pageData=value;
        }else{
            for(var i=0;i<10;i++){
                $scope.pageData[i]=value[i];
            }
        }
    };


    $scope.goNext = function () {
        if($scope.pageNum>=$scope.pageNumMax){
            alert("已是最后一页");
            return;
        }else if($scope.pageNum==($scope.pageNumMax-1)){
            $scope.pageNum+=1;
            var x=$scope.LoadService.ReviewActivityData.length%10;
            $scope.pageData=[];
            for(var j=0;j<x;j++){
                $scope.pageData[j]=$scope.LoadService.ReviewActivityData[($scope.pageNum-1)*10+j]
            }
        }else if($scope.pageNumMax==1){
            $scope.pageData=$scope.LoadService.ReviewActivityData;
        }
        else{
            $scope.pageNum+=1
            for(var j=0;j<10;j++){
                $scope.pageData[j]=$scope.LoadService.ReviewActivityData[($scope.pageNum-1)*10+j]
            }
        };


    };

    $scope.goBefore = function () {
        if($scope.pageNum<=1){
            alert("已是第一页");
            return;
        }else{
            $scope.pageNum-=1;
        }
        for(var j=0;j<10;j++){
            $scope.pageData[j]=$scope.LoadService.ReviewActivityData[($scope.pageNum-1)*10+j]
        }
    };

    $scope.showAdvanced = function(ev,data) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'template/AllActivity.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                activity: data
            }
        })
            .then();
    };

    function DialogController($scope, $mdDialog,activity) {
        $scope.activity=activity;
        $scope.hide = function() {
            $mdDialog.hide();
        };
    }

    $scope.showConfirm = function(ev,index) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('确定删除')
            .content('')
            .ariaLabel('Lucky day')
            .ok('Yes')
            .cancel('No')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            for(var j=0;j<$scope.LoadService.ReviewActivityData.length;j++){
                if(index==$scope.LoadService.ReviewActivityData[j].id){
                    $scope.LoadService.ReviewActivityData.splice(j,1);
                    $scope.pageNum=1;
                    $scope.fenye($scope.LoadService.ReviewActivityData);
                    return;
                }
            }
        }, function() {
        });
    };
});

