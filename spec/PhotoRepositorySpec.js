describe("PhotoReposiory", function() {
    it("should can get last photos", function() {
        monster = {};
        monster.get = function() {};
        spyOn(monster, 'get');

        FB = jasmine.createSpy('FB');
        FB.api = function() {};
        spyOn(FB, 'api');

        photoRepository = new PhotoRepository();
        photoRepository.getLatest();

        expect(monster.get).toHaveBeenCalled();
        expect(monster.get.callCount).toEqual(1);
        expect(FB.api).toHaveBeenCalled();
        expect(FB.api.callCount).toEqual(1);
    });
});

