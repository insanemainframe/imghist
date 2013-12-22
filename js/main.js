
function print(text) {
    console.log('Print:');
    console.log(text); }


function ImageService(){
    this.extensions = ['jpg', 'png', 'gif'];
    this.images = [];

}

ImageService.prototype.getQueries = function (){
    var queries = [];
    for (var i in this.extensions){
        var ext = this.extensions[i];
        var query = {'text': ext};
        queries.push(query);

    };

    return queries;
}

ImageService.prototype.getRegExps = function() {

    var patterns = [];
    for (var i in this.extensions){
        var ext = this.extensions[i];
        var re = new RegExp('.+\.' + ext);
        patterns.push(re);

    };

    return patterns;
};

ImageService.prototype.checkImageUrl = function(image_url) {
    var patterns = this.getRegExps();

    for (var i in patterns){
        var re = patterns[i];
        if( !re.test(image_url) ){
            return false;
        }
    }
    return true;
};

ImageService.prototype.pushImages = function (search_items){
    print('pushImages')
    for (var i in search_items){
        var item = search_items[i];

        if (this.checkImageUrl(item.url)){
            continue;
        }
        if ( this.images.indexOf(item.url) < 0){
            this.images.push(item.url);
        }
    }
}

ImageService.prototype.getImages = function (){
    return this.images;
}


ImageService.prototype.extractImages = function (resultHandler){
    var queries = this.getQueries();

    var jobs_count = queries.length;
    var results_count = 0;

    for (var i in queries){
        var query = queries[i];
        var self = this;
        function search_handler(r){
            self.pushImages(r);
            results_count++;
            if (results_count >= jobs_count){
              resultHandler(self.images);
            }
        }
        chrome.history.search(query, search_handler)
    }
}


image_service = new ImageService();


function showResult(images){
    chrome.tabs.create({'url': chrome.extension.getURL('ui/view.html')}, function(tab) {
        print('Tab opened.');
        mytab = tab;
      });
}




onClickHandler = function (tab){
    image_service = new ImageService();
    image_service.extractImages(showResult);
};

// chrome.browserAction.onClicked.addListener(onClickHandler);
