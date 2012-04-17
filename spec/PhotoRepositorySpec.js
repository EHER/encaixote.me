describe("PhotoReposiory", function() {
    it("should can get last photos", function() {
        var monster = function() {
            get = function(name) { return !name },
            set = function() {}
        };
        spyOn(monster, 'get').andCallThrough();
        spyOn(monster, 'set');

        photoRepository = new PhotoRepository();
        photoRepository.getLatest();

    });
});

