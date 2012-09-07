/*jslint browser: true*/
'use strict';

var $ = require('jquery'),
    PhotoRepository = require('../src/PhotoRepository').PhotoRepository,
    Photo = require('../src/Photo').Photo;

function removeElement(element) {
    var photoRepository;

    $("#" + element.id).fadeOut(500, function (e) {
        $(this).remove();
        if ($("#gallery .pic").length === 0) {
            photoRepository = new PhotoRepository(FB);
            photoRepository.getMore();
        }
    });
}

function likeAction(element) {
    var id, photo, photoRepository;

    id = element.id.replace("pic-", "");
    photo = new Photo(id);

    photoRepository = new PhotoRepository(FB);
    photoRepository.like(photo);

    removeElement(element);
}

function shareAction(element) {
    var id, url, description, photo, photoRepository;

    id = element.id.replace("pic-", "");
    url = $(element).find("a:fist-child").attr("href");
    description = $(element).find("a:fist-child").attr("title");

    photo = new Photo(id);
    photo.set_urls(url);
    photo.description = description;

    photoRepository = new PhotoRepository(FB);
    photoRepository.share(photo);

    removeElement(element);
}

function nothingAction(element) {
    removeElement(element);
}

function makeDraggable() {
    var preventClick = false;

    $(".pic a").bind("click", function (e) {
        /* This function stops the drag from firing a click event and showing the lightbox */
        if (preventClick) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    });

    $(".pic").draggable({
        /* Converting the images into draggable objects */
        containment: 'parent',
        start: function (e, ui) {
            /* This will stop clicks from occuring while dragging */
            preventClick = true;
        },
        stop: function (e, ui) {
            /* Wait for 250 milliseconds before re-enabling the clicks */
            setTimeout(function () { preventClick = false; }, 250);
        }
    });

    $('.pic').mousedown(function (e) { /* Executed on image click */
        var maxZ = 0;

        /* Find the max z-index property: */
        $('.pic').each(function () {
            var thisZ = parseInt($(this).css('zIndex'), 10);
            if (thisZ > maxZ) {
                maxZ = thisZ;
            }
        });

        /* Clicks can occur in the picture container (with class pic) and in the link inside it */
        if ($(e.target).hasClass("pic")) {
            /* Show the clicked image on top of all the others: */
            $(e.target).css({zIndex: maxZ + 1});
        } else {
            $(e.target).closest('.pic').css({zIndex: maxZ + 1});
        }
    });

    /* Converting all the links to a fancybox gallery */
    $("a.fancybox").fancybox({
        zoomSpeedIn: 300,
        zoomSpeedOut: 300,
        overlayShow: false
    });
}

function makeDroppable() {
    $('#like').droppable({
        hoverClass: 'active',
        drop: function (event, ui) {
            likeAction(ui.draggable[0]);
        }
    });

    $('#share').droppable({
        hoverClass: 'active',
        drop: function (event, ui) {
            shareAction(ui.draggable[0]);
        }
    });

    $('#like_share').droppable({
        hoverClass: 'active',
        drop: function (event, ui) {
            likeAction(ui.draggable[0]);
            shareAction(ui.draggable[0]);
        }
    });

    $('#nothing').droppable({
        hoverClass: 'active',
        drop: function (event, ui) {
            nothingAction(ui.draggable[0]);
        }
    });
}
