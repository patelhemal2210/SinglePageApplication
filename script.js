/**
 * Created by Hemal Patel on 31/03/2016.
 */

window.onload = function() {
    $(".nav a").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });
}

var app=angular.module('singlepageapp',['ngRoute']);
app.config(function($routeProvider){


    $routeProvider.when('/',{
        templateUrl: 'home.html',
        controller:'homeController'
    });
    $routeProvider.when('/calculator',{
        templateUrl: 'calculator.html',
        controller:'calculatorController'
    });
    $routeProvider.when('/flickr',{
        templateUrl: 'flickr.html',
        controller:'flickrController'
    });

});

app.controller('homeController',['$scope', function($scope) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'parkingSpot.JSON');
    xhr.onreadystatechange = function () {
        if(xhr.responseText)
        $scope.videos = JSON.parse(xhr.responseText);
    };
    xhr.send();
}]);

app.controller('flickrController',['$scope', function($scope) {
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $('#search').focus();
    $('form').submit(function (evt) {
        var $submitButton = $('#submit');
        var $searchField = $('#search');
        evt.preventDefault();
        var result = "";
        var tag = $searchField.val();
        if(tag === "") {
            result = '<br><p>Please enter search string to find related Images...</p>';
            $('#photos').html(result);
        }
        else {
            $('#photos').html('');
            $.getJSON(flickerAPI, {
                    tags: tag,
                    format: "json"
                },
                function (data) {
                    result = '';
                    var count = 0;

                    if (data.items.length > 0) {

                        $.each(data.items, function (i, photo) {


                            result += count % 5 ? '<td>' : '<tr><td>';
                            result += '<a href="' + photo.link + '" >';
                            result += '<img src="' + photo.media.m + '"></a>';
                            result += (count - 4) % 5 ? '</td>' : '</td></tr>';
                            count++;
                        }); // end each
                    } else {
                        result = "<br><p>No photos found that match: " + tag + ".</p>";
                    }
                    $('#photos').html(result);
                }); // end getJSON
        }
        $('#search').focus();
    }); // end click
}]);

app.controller('calculatorController',['$scope', function($scope) {
    $scope.amoutValue = 0;
    $scope.InterestValue = 0;
   }]);

