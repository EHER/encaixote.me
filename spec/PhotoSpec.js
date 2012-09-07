'use strict';

var Photo = require("../src/Photo").Photo,
    assert = require("assert");

describe("Photo", function () {
    it("should can set a id in a instance", function () {
        var photoTest = new Photo();
        photoTest.id = "Eher";
        assert.equal("Eher", photoTest.id);
    });
    it("should can set a id in constructor", function () {
        var photoTest = new Photo("Eher");
        assert.equal("Eher", photoTest.id);
    });
    it("should set photo urls by a facebook url", function () {
        var photoTest = new Photo(),
            facebook_url = "http://facebook.com/photos/foto_s.jpg";
        photoTest.set_urls(facebook_url);
        assert.equal(photoTest.url_small, "http://facebook.com/photos/foto_s.jpg");
        assert.equal(photoTest.url_big, "http://facebook.com/photos/foto_b.jpg");
    });
    it("should be able to change position to another using randomly", function () {
        var photoTest = new Photo();
        assert.equal(0, photoTest.position_top);
        assert.equal(photoTest.position_left, 0);
        assert.equal(photoTest.position_rotate, 0);
        photoTest.change_position();
        //assert.equal(photoTest.position_top).toBeLessThan(301);
        //assert.equal(photoTest.position_top).toBeGreaterThan(-1);
        //assert.equal(photoTest.position_left).toBeLessThan(801);
        //assert.equal(photoTest.position_left).toBeGreaterThan(-1);
        //assert.equal(photoTest.position_rotate).toBeLessThan(11);
        //assert.equal(photoTest.position_rotate).toBeGreaterThan(-11);
    });
});

