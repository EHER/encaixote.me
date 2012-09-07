/*jslint browser: true*/
/*global head: true, FB: true, $: true, PhotoRepository: true*/
'use strict';
var photoRepository, isUserLogged, checkFacebookLogin;

photoRepository = new PhotoRepository("#gallery");

isUserLogged = function (logged) {
    if (logged) {
        $("#login").hide();
        $("#logout").show();
        $("#gallery").show();
        FB.api('/me', function (response) {
            $("#name").html(response.name);
        });
        if ($("#gallery .pic").length === 0) {
            photoRepository.getMore();
        }
    } else {
        $("#login").show();
        $("#logout").hide();
        $("#gallery").hide();
        $("#name").html("");
    }
};

checkFacebookLogin = function () {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            isUserLogged(true);
        } else {
            isUserLogged(false);
        }
    });
};

$(document).ready(function () {
    $("#login").bind("click", function (e) {
        FB.login(function (response) {
            console.log(response);
        }, {'scope': 'read_stream,publish_stream'});
    });

    $("#logout").bind("click", function (e) {
        FB.logout(function (response) {
            console.log(response);
        });
    });
});

window.fbAsyncInit = function () {
    FB.init({
        appId      : '340748665982158', // App ID
        channelUrl : '//localhost/encaixote.me/channel.php', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });

    // Additional initialization code here
    FB.Event.subscribe('auth.authResponseChange', function (response) {
        checkFacebookLogin();
    });
};

// Load the SDK Asynchronously
(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/pt_BR/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

