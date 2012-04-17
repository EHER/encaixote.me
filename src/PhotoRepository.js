var PhotoRepository = function() {};

PhotoRepository.prototype.getMore = function() {
    this.getLatest();
    this.getOld();
};

PhotoRepository.prototype.getLatest = function() {
    var get_photos_url = 'me/home/photos?limit=5';
    if (monster.get("since")) {
        get_photos_url += "&" + monster.get("since");
    }
    FB.api(get_photos_url, function(response) {

        $(response.data).each(function(index, data) {
            PhotoRepository.prototype.toGallery(
                data.id,
                data.picture,
                data.description || data.message || data.name || data.story
                );
        });
        if (response.paging !== undefined) {
            monster.set(
                'since',
                /since=[0-9]*/.exec(response.paging.previous),
                0
                );
        }
        magica();
    });
};

PhotoRepository.prototype.getOld = function() {
    var get_photos_url = 'me/home/photos?limit=5';
    if (monster.get("until")) {
        get_photos_url += "&" + monster.get("until");
    }
    FB.api(get_photos_url, function(response) {
        $(response.data).each(function(index, data) {
            PhotoRepository.prototype.toGallery(
                data.id,
                data.picture,
                data.description || data.message || data.name || data.story
                );
        });
        monster.set(
            'until',
            /until=[0-9]*/.exec(response.paging.next),
            0
            );
        magica();
    });
};

PhotoRepository.prototype.toGallery = function(id, url, description) {
    if(id !== undefined && url !== undefined) {
        var photo = new Photo(id);
        photo.set_urls(url);
        photo.description = description;
        console.log(photo);
        photo.change_position();
        $("#gallery").append(photo.to_html());
    }
};
