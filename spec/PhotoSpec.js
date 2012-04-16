describe("Photo", function() {
    it("should can set a id in a instance", function() {
        var photoTest = new Photo();
        photoTest.id = "Eher"
        expect(photoTest.id).toEqual("Eher");
    });
    it("should can set a id in constructor", function() {
        var photoTest = new Photo("Eher");
        expect(photoTest.id).toEqual("Eher");
    });
    it("should set photo urls by a facebook url", function() {
        var photoTest = new Photo();
        var facebook_url = "http://facebook.com/photos/foto_s.jpg";
        photoTest.set_urls(facebook_url);
        expect(photoTest.url_small).toEqual("http://facebook.com/photos/foto_s.jpg");
        expect(photoTest.url_big).toEqual("http://facebook.com/photos/foto_b.jpg");
    });
    it("should be able to change position to another using randomly", function() {
        var photoTest = new Photo();
        expect(photoTest.position_top).toEqual(0);
        expect(photoTest.position_left).toEqual(0);
        expect(photoTest.position_rotate).toEqual(0);
        photoTest.change_position();
        expect(photoTest.position_top).toBeLessThan(301);
        expect(photoTest.position_top).toBeGreaterThan(-1);
        expect(photoTest.position_left).toBeLessThan(801);
        expect(photoTest.position_left).toBeGreaterThan(-1);
        expect(photoTest.position_rotate).toBeLessThan(11);
        expect(photoTest.position_rotate).toBeGreaterThan(-11);
    });
});

