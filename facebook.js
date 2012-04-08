var checkFacebookLogin = function() {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                $("#login").hide();
                $("#logout").show();
                $("#gallery").show();
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token 
                // and signed request each expire
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook, 
                // but has not authenticated your app
                $("#login").show();
                $("#logout").hide();
                $("#gallery").hide();
            } else {
                // the user isn't logged in to Facebook.
                $("#login").show();
                $("#logout").hide();
                $("#gallery").hide();
            }
        });
};

var addPhoto = function(id, url) {
    photo  = '<div id="pic-" class="pic" style="top:px;left:px;background:url('+url+') no-repeat 50% 50%; -moz-transform:rotate(deg); -webkit-transform:rotate(deg);">';
    photo += '<a class="fancybox" rel="fncbx" href="'+url+'" target="_blank"></a>';
    photo += '</div>';
    $("#gallery").append(photo);
};

var getPhotos = function() {
    FB.api('me/home/photos', function(response) {
        $(response.data).each(function(index, data) {
            console.log(data);
            addPhoto(data.id, data.picture);
        });
    });
};

window.fbAsyncInit = function() {
    FB.init({
        appId      : '340748665982158', // App ID
        channelUrl : '//localhost/src/facebox/channel.php', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });

    // Additional initialization code here
    FB.Event.subscribe('auth.authResponseChange', function(response) {
        checkFacebookLogin();
    });
    checkFacebookLogin();
};

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/pt_BR/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));
