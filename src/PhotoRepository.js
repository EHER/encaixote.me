'use strict';

var PhotoRepository = null,
    Photo = require('../src/Photo').Photo,
    Base64 = require('../lib/Base64').Base64,
    cookieManager = require('../lib/monster').monster,
    script = require('../src/script'),
    $ = require('jquery');

PhotoRepository = function (facebook) {
    this.cookieManager = cookieManager;
    this.facebook = facebook;
};

PhotoRepository.prototype.getMore = function () {
    this.getLatest();
    this.getOld();
};

PhotoRepository.prototype.getLatest = function () {
    var get_photos_url = 'me/home/photos?limit=5';
    if (this.cookieManager.get("since")) {
        get_photos_url += "&" + this.cookieManager.get("since");
    }
    this.facebook.api(get_photos_url, function (response) {
        $(response.data).each(function (index, data) {
            PhotoRepository.prototype.toGallery(
                data.id,
                data.picture,
                data.description || data.message || data.name || data.story
            );
        });
        if (response.paging !== undefined) {
            this.cookieManager.set(
                'since',
                /since=[0-9]*/.exec(response.paging.previous),
                0
            );
        }
        script.magica();
    });
};

PhotoRepository.prototype.getOld = function () {
    var get_photos_url = 'me/home/photos?limit=5';
    if (this.cookieManager.get("until")) {
        get_photos_url += "&" + this.cookieManager.get("until");
    }
    this.facebook.api(get_photos_url, function (response) {
        $(response.data).each(function (index, data) {
            PhotoRepository.prototype.toGallery(
                data.id,
                data.picture,
                data.description || data.message || data.name || data.story
            );
        });
        this.cookieManager.set(
            'until',
            /until=[0-9]*/.exec(response.paging.next),
            0
        );
        script.magica();
    });
};

PhotoRepository.prototype.toGallery = function (id, url, description) {
    if (id !== undefined && url !== undefined) {
        var photo = new Photo(id);
        photo.set_urls(url);
        photo.description = description;
        console.log(photo);
        photo.change_position();
        $("#gallery").append(photo.to_html());
    }
};

//PhotoRepository.prototype.share = function (photo) {
//    var photoHash = Base64.encode(photo.url_big);
//    $.get("share/".photoHash);
//};

PhotoRepository.prototype.like = function (photo) {
    this.facebook.api(photo.id + '/likes', 'post', function (response) {
        console.log(response);
    });
};

PhotoRepository.prototype.share = function (photo) {
    var url_proxy = 'http://encaixote.me/photo/' + Base64.encode(photo.url_small),
        url_share = 'http://www.facebook.com/' + photo.id.replace('_', '/posts/');

    this.facebook.api('me/feed', 'post', {
        'name': photo.description,
        'picture': url_proxy,
        'link': url_share
    }, function (response) {
        console.log(response);
    });
};

exports.PhotoRepository = PhotoRepository;
