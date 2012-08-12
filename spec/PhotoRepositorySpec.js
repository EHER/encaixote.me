/*global describe:true, it:true, expect: true, PhotoRepository: true,
 Photo: true, beforeEach: true, jasmine: true, spyOn: true*/
'use strict';
describe("PhotoReposiory", function () {
    beforeEach(function () {
        jasmine.Ajax.useMock();
        jasmine.getFixtures().containerId = '#gallery';
    });
    it("should can get last photos", function () {
        var monster, FB, photoRepository;

        monster = {};
        monster.get = function () {};
        spyOn(monster, 'get');

        FB = jasmine.createSpy('FB');
        FB.api = function () {};
        spyOn(FB, 'api');

        photoRepository = new PhotoRepository();
        photoRepository.getLatest();

        expect(monster.get).toHaveBeenCalled();
        expect(monster.get.callCount).toEqual(1);
        expect(FB.api).toHaveBeenCalled();
        expect(FB.api.callCount).toEqual(1);
    });
    it("should can share a photo", function () {
        var base64, photo, photoRepository;

        base64 = {};
        base64.encode = function () {};
        spyOn(base64, 'encode');

        photo = new Photo("1234");
        photo.set_urls("http://mock.org/logo_s.jpg");

        photoRepository = new PhotoRepository();
        photoRepository.share(photo);

        expect(base64.encode).toHaveBeenCalled();
    });
});

