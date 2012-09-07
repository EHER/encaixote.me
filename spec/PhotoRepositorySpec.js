'use strict';

var sinon = require('sinon'),
    assert = require('assert'),
    monster = require('../lib/monster').monster,
    Photo = require('../src/Photo').Photo,
    Base64 = require('../lib/Base64').Base64,
    PhotoRepository = require('../src/PhotoRepository').PhotoRepository;


describe("PhotoReposiory", function () {
    it("should can get last photos", function () {
        var photoRepository, monsterMock, facebook;

        monsterMock = sinon.mock(monster).expects("get").once();

        facebook = {};
        facebook.api = sinon.stub();

        photoRepository = new PhotoRepository(facebook);
        photoRepository.getLatest();

        assert.equal(true, facebook.api.called);
        monsterMock.verify();
    });

    it("should can like a photo", function () {
        var photo, photoRepository, facebook;

        photo = new Photo("1234");
        photo.set_urls("http://mock.org/logo_s.jpg");

        facebook = {};
        facebook.api = sinon.stub();

        photoRepository = new PhotoRepository(facebook);
        photoRepository.like(photo);

        assert.equal(true, facebook.api.called);
    });

    it("should can share a photo", function () {
        var photo, photoRepository, base64Mock, facebook;

        base64Mock = sinon.mock(Base64).expects("encode").once();

        photo = new Photo("1234");
        photo.set_urls("http://mock.org/logo_s.jpg");

        facebook = {};
        facebook.api = sinon.stub();

        photoRepository = new PhotoRepository(facebook);
        photoRepository.share(photo);

        assert.equal(true, facebook.api.called);
        base64Mock.verify();
    });
});
