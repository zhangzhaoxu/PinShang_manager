function ImgCheck(){                                                            //图片大小以及格式检测
    var t=document.getElementById('img');
    var ext = ['.gif', '.jpg', '.jpeg', '.png'];
    var s = t.value.toLowerCase();
    if(t.files[0].size>=1024*1024*10){
        alert("图片过大");
        return false;
    }
    var r=false;
    for(var i = 0; i < ext.length; i++)
    {
        if (s.indexOf(ext[i]) > 0)
        {
            r=true;
            break;
        }
    }
    if(r==false){
        alert('图片格式不对');
    }
    return r;
}
function test(t){                                                               //将图片在页面展示
    if(ImgCheck()){
        document.getElementById('img1').src=  window.URL.createObjectURL(t.files[0]);
    }
};


var app=angular.module('app', ['ngMaterial','routeApp'])
    .controller('AppCtrl', function($scope) {
    })
    .controller('FreeBottomSheet', function($scope, $timeout, $mdBottomSheet) {

        $scope.showListBottomSheet = function($event) {
            $mdBottomSheet.show({
                templateUrl: 'ScFreeActivity.html',
                controller:'ScActivityCtrl',
                targetEvent: $event
            }).then(function() {
            });
        };
    })
    .controller('SidongBottomSheet', function($scope, $timeout, $mdBottomSheet) {

        $scope.showListBottomSheet = function($event) {
            $mdBottomSheet.show({
                templateUrl: 'ScSidongActivity.html',
                controller:'SidongActivityCtrl',
                targetEvent: $event
            }).then(function() {
            });
        };
    })
    .controller('ReBottomSheet', function($scope, $timeout, $mdBottomSheet) {

        $scope.showListBottomSheet = function($event) {
            $mdBottomSheet.show({
                templateUrl: 'ReActivity.html',
                controller:'RePostActivityCtrl',
                targetEvent: $event
            }).then(function() {
            });
        };
    })
    .controller('ScActivityCtrl', function ($scope) {
        $scope.sub = function () {
            document.getElementById('img').click();
        };

        $scope.textCheck = function () {
            if($scope.freeTitle.length>0&&$scope.freeLink.length>0){
                return true;
            }else{
                alert("不能为空");
                return false;
            }
        };
        $scope.postFreeActivity= function () {                     //上传免费活动图文
            if (ImgCheck()&&$scope.textCheck()){                    //如果图片格式正确，将图片写入
                var oMyForm = new FormData();
                oMyForm.append('img',document.getElementById('img').files[0]);
                oMyForm.append('title',$scope.freeTitle);
                oMyForm.append('link',$scope.freeLink);
                console.log(oMyForm);
                $.ajax({
                    type:'post',
                    url:'',
                    data:oMyForm,
                    processData : false,
                    contentType : false
                })
                    .success(function (data) {
                        alert("success");
                        console.log(data);
                    })
                    .error(function (status) {
                        console.log(status);
                    })
            }
        };
    })
    .controller('SidongActivityCtrl', function ($scope, $http) {
        $scope.sub = function () {
            document.getElementById('img').click();
        };

        $scope.textCheck = function () {
            if($scope.sidongTitle.length>0&&$scope.sidongLink.length>0){
                return true;
            }else{
                alert("不能为空");
                return false;
            }
        };
        $scope.postSidongActivity = function () {                  //上传私董活动图文
            if (ImgCheck()&&$scope.textCheck()){                    //如果图片格式正确，将图片写入
                var oMyForm = new FormData();
                oMyForm.append('img',document.getElementById('img').files[0]);
                oMyForm.append('title',$scope.freeTitle);
                oMyForm.append('link',$scope.freeLink);
                console.log(oMyForm);
                $.ajax({
                    type:'post',
                    url:'',
                    data:oMyForm,
                    processData : false,
                    contentType : false
                })
                    .success(function (data) {
                        alert("success");
                        console.log(data);
                    })
                    .error(function (status) {
                        console.log(status);
                    })
            }
        }
    })
    .controller('RePostActivityCtrl', function ($scope, $http) {
        $scope.sub = function () {
            document.getElementById('img').click();
        };

        $scope.textCheck = function () {
            if($scope.ReTitle.length>0&&$scope.ReLink.length>0){
                return true;
            }else{
                alert("不能为空");
                return false;
            }
        };
        $scope.postReActivity = function () {                  //上传私董活动图文
            if (ImgCheck()&&$scope.textCheck()){                    //如果图片格式正确，将图片写入
                var oMyForm = new FormData();
                oMyForm.append('img',document.getElementById('img').files[0]);
                oMyForm.append('title',$scope.ReTitle);
                oMyForm.append('link',$scope.ReLink);
                console.log(oMyForm);
                $.ajax({
                    type:'post',
                    url:'',
                    data:oMyForm,
                    processData : false,
                    contentType : false
                })
                    .success(function (data) {
                        alert("success");
                        console.log(data);
                    })
                    .error(function (status) {
                        console.log(status);
                    })
            }
        }
    });




