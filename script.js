var magica = function() {
    var preventClick=false;

    $(".pic a").bind("click",function(e){
        /* This function stops the drag from firing a click event and showing the lightbox */
        if(preventClick)
    {
        e.stopImmediatePropagation();
        e.preventDefault();
    }
    });

    $(".pic").draggable({
        /* Converting the images into draggable objects */
        containment: 'parent',
        start: function(e,ui){
            /* This will stop clicks from occuring while dragging */
            preventClick=true;
        },

        stop: function(e, ui) {
            /* Wait for 250 milliseconds before re-enabling the clicks */
            setTimeout(function(){ preventClick=false; }, 250);
        }
    });


    $('.pic').mousedown(function(e){

        /* Executed on image click */

        var maxZ = 0;

        /* Find the max z-index property: */

        $('.pic').each(function(){
            var thisZ = parseInt($(this).css('zIndex'))
            if(thisZ>maxZ) maxZ=thisZ;
        });

        /* Clicks can occur in the picture container (with class pic) and in the link inside it */
        if($(e.target).hasClass("pic"))
    {
        /* Show the clicked image on top of all the others: */
        $(e.target).css({zIndex:maxZ+1});
    }
        else $(e.target).closest('.pic').css({zIndex:maxZ+1});
    });

    /* Converting all the links to a fancybox gallery */
    $("a.fancybox").fancybox({
        zoomSpeedIn: 300,
        zoomSpeedOut: 300,
        overlayShow:false
    });
};

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
                FB.api('/me', function(response) {
                    $("#name").html(response.name);
                });
                if ($("#gallery .pic").length === 0) {
                    getPhotos();
                }
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
    if(id !== undefined && url !== undefined) {
        url_small = url;
        url_big = url.replace("_s.jpg", "_b.jpg");

        position_top = Math.floor(Math.random()*100)*3;
        position_left = Math.floor(Math.random()*100)*8;
        position_rotate = Math.floor(Math.random()*20)-10;

        photo  = '<div id="pic-'+id+'" class="pic" style="top:'+position_top+'px;left:'+position_left+'px;background:#eee url('+url_small+') no-repeat 50% 50%; -moz-transform:rotate('+position_rotate+'deg); -webkit-transform:rotate('+position_rotate+'deg);">';
        photo += '<a class="fancybox" rel="fncbx" href="'+url_big+'" target="_blank"></a>';
        photo += '</div>';
        $("#gallery").append(photo);
    }
};

var getPhotos = function() {
    get_photos_url = 'me/home/photos?limit=10';
    if (monster.get("until")) {
        get_photos_url += "&" + monster.get("until");
    }
    FB.api(get_photos_url, function(response) {
        $(response.data).each(function(index, data) {
            addPhoto(data.id, data.picture);
        });
        monster.set(
            'until',
            getUntilFromUrl(response.paging.next)
            );
        magica();
    });
};

var getUntilFromUrl = function(url) {
    return /until=[0-9]*/.exec(url);
};

var removeElement = function(element) {
    $("#"+element.id).fadeOut(500, function(e) {
        $(this).remove();
        if ($("#gallery .pic").length === 0) {
            getPhotos();
        }
    });
};

var likePicture = function(element) {
    graph_id = element.id.replace("pic-", "");

    FB.api(graph_id + '/likes', 'post', function(response) {
        console.log(response);
    });
};

var sharePicture = function(element) {
    graph_id = element.id.replace("pic-", "");

    url_photo = $(element).find("a:fist-child").attr("href");
    url_proxy = 'http://encaixote.me/photo/'+ Base64.encode(url_photo);
    url_share = 'http://www.facebook.com/' + graph_id.replace('_', '/posts/');

    FB.api('me/feed', 'post', {
        'name': 'http://www.encaixote.me/',
        'picture': url_proxy,
        'link': url_share
    },function(response) {
        console.log(response);
    });
};

$(document).ready(function(){
    // Executed once all the page elements are loaded
    magica();

    $("#magica").bind("click",function(e){
        magica();
    });

    $("#login").bind("click",function(e){
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {'scope': 'read_stream,publish_stream'});
    });

    $("#logout").bind("click",function(e){
        FB.logout(function(response) {
            $("#name").html("");
            // user is now logged out
        });
    });

    $("#get_photos").bind("click",function(e){
        getPhotos();
    });

    $('#like').droppable({
        hoverClass: 'active',
        drop:function(event,ui){
            element = ui.draggable[0];
            removeElement(element);
            likePicture(element);
            console.log("like");
        }
    });

    $('#share').droppable({
        hoverClass: 'active',
        drop:function(event,ui){
            element = ui.draggable[0];
            removeElement(element);
            sharePicture(element);
            console.log("share");
        }
    });

    $('#like_share').droppable({
        hoverClass: 'active',
        drop:function(event,ui){
            element = ui.draggable[0];
            removeElement(element);
            likePicture(element);
            sharePicture(element);
            console.log("like + share");
        }
    });

    $('#nothing').droppable({
        hoverClass: 'active',
        drop:function(event,ui){
            element = ui.draggable[0];
            removeElement(element);
            console.log("nothing");
        }
    });
});
