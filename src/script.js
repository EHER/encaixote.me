var magica = function() {
    var preventClick=false;

    $(".pic a").bind("click",function(e){
        /* This function stops the drag from firing a click event and showing the lightbox */
        if (preventClick) {
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

var like = function(element) {
    var id = element.id.replace("pic-", "");
    var photo = new Photo(id);
    photo.like();
    removeElement(element);
    console.log("like");
};

var share = function(element) {
    var id = element.id.replace("pic-", "");
    var url = $(element).find("a:fist-child").attr("href");
    var description = $(element).find("a:fist-child").attr("title");
    var photo = new Photo(id);
    photo.set_urls(url);
    photo.description = description;
    photo.share();
    removeElement(element);
    console.log("share");
};

var nothing = function(element) {
    removeElement(element);
    console.log("nothing");
};

var removeElement = function(element) {
    $("#"+element.id).fadeOut(500, function(e) {
        $(this).remove();
        if ($("#gallery .pic").length === 0) {
            photoRepository.getMore();
        }
    });
};

$(document).ready(function(){
    $('#like').droppable({
        hoverClass: 'active',
        drop:function(event,ui){
            like(ui.draggable[0]);
        }
    });

    $('#share').droppable({
        hoverClass: 'active',
        drop:function(event,ui){
            share(ui.draggable[0]);
        }
    });

    $('#like_share').droppable({
        hoverClass: 'active',
        drop:function(event,ui){
            like(ui.draggable[0]);
            share(ui.draggable[0]);
        }
    });

    $('#nothing').droppable({
        hoverClass: 'active',
        drop:function(event,ui){
            nothing(ui.draggable[0]);
        }
    });
});
