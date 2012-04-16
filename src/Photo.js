var Photo = function(id) {
    this.id                = "";
    this.url_small         = "";
    this.url_big           = "";
    this.description       = "";
    this.position_top      = 0;
    this.position_left     = 0;
    this.position_rotate   = 0;

    if (id !== undefined) {
        this.id = id;
    }
};


Photo.prototype.set_urls = function(url) {
    if (url !== "undefined") {
        this.url_small = url;
        this.url_big = url.replace("_s.jpg", "_b.jpg");
    }
};

Photo.prototype.change_position = function() {
    this.position_top = Math.floor(Math.random()*100)*3;
    this.position_left = Math.floor(Math.random()*100)*8;
    this.position_rotate = Math.floor(Math.random()*20)-10;
};

Photo.prototype.to_html = function(element) {
    var html = '';
    html += '<div id="pic-'+this.id+'" class="pic" style="top:'+this.position_top+'px;left:'+this.position_left+'px;background:#eee url('+this.url_small+') no-repeat 50% 50%; -moz-transform:rotate('+this.position_rotate+'deg); -webkit-transform:rotate('+this.position_rotate+'deg);">';
    html += '<a class="fancybox" rel="fncbx" href="'+this.url_big+'" title="'+this.description+'" target="_blank"></a>';
    html += '</div>';
    return html;
};

Photo.prototype.share = function() {
    url_proxy = 'http://encaixote.me/photo/'+ Base64.encode(this.url_small);
    url_share = 'http://www.facebook.com/' + this.id.replace('_', '/posts/');

    FB.api('me/feed', 'post', {
        'name': this.description,
        'picture': url_proxy,
        'link': url_share
    },function(response) {
        console.log(response);
    });
};

Photo.prototype.like = function() {
    FB.api(this.id + '/likes', 'post', function(response) {
        console.log(response);
    });
};
