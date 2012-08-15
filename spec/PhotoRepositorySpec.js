/*global describe:true, it:true, xit: true, expect: true, PhotoRepository: true,
 Photo: true, beforeEach: true, jasmine: true, spyOn: true*/
'use strict';
describe("PhotoReposiory", function () {
    beforeEach(function () {
        jasmine.Ajax.useMock();
        jasmine.getFixtures().containerId = '#gallery';
    });
    xit("should can get last photos", function () {
        var monsterSpy, FBSpy, photoRepository;

        monsterSpy = jasmine.createSpy('monster');
        monsterSpy.get = function () {};
        spyOn(monsterSpy, 'get');

        FBSpy = jasmine.createSpy('FB');
        FBSpy.api = function () {};
        spyOn(FBSpy, 'api');

        photoRepository = new PhotoRepository();
        photoRepository.getLatest();

        expect(monsterSpy.get).toHaveBeenCalled();
        expect(monsterSpy.get.callCount).toEqual(1);
        expect(FBSpy.api).toHaveBeenCalled();
        expect(FBSpy.api.callCount).toEqual(1);
    });
    xit("should can share a photo", function () {
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

