
function ImageService(resultHandler){
    this.image_extractor = new ImageExtractor();
    this.images = [];

    var self = this;

    function setResult(images){
        self.images = images;
        print('setResult');
        resultHandler(images);
    }

    this.image_extractor.extractImages(setResult);
}

ImageService.prototype.getImage = function(index){
        if (this.images.length > 0){
            return this.images[index];
        }
        else{
            return '../var/no_image.png'
        }
    }

ImageService.prototype.getMaxIndex = function(index){
    return this.images.length - 1;
}


function getImageService(resultHandler){
    return new ImageService(resultHandler);
}
