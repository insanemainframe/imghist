
function SliderArrow(slider, shift){
    this.slider = slider;

    this.shift = shift;
    this.arrow_class = shift > 0? 'next_arrow' : 'back_arrow';
    this.button = slider.slider_div.find('.' + this.arrow_class);
    this.counter = this.button.find('.counter');

    this.active = false;
    this.on();

}

SliderArrow.prototype.on = function() {
    if (!this.active){
        var self = this;
        // print(this.arrow_class + 'ON');
        this.button.on('click',
                         function () {
                            self.slider.switchSlider(self.shift);
                        });
        this.active = true;
        this.button.css('color', '#000');
    }
};

SliderArrow.prototype.off = function() {
    if (this.active){
        // print(this.arrow_class + 'OFF');
        this.button.off('click');
        this.active = false;
        this.button.css('color', '#888');
    }
};

SliderArrow.prototype.updateCounter = function(count) {
    this.counter.text(count);
};


function Slider(image_service, slider_div){
    this.image_service = image_service;
    this.images = this.image_service.images;
    this.locked = false;

    this.slider_div = slider_div;
    this.slider_img  = slider_div.find('.slider_img');
    this.current_index = 0;

    this.back_arrow = new SliderArrow(this, -1);
    this.next_arrow = new SliderArrow(this, 1);

    this.switchSlider(0);

}


Slider.prototype.show = function() {
    var img_url = this.images[this.current_index];
    this.slider_img.attr('src', img_url);
};

Slider.prototype.getMaxIndex = function() {
    return this.images.length;
};

Slider.prototype.switchSlider = function(shift) {
    if (this.locked) {
        return;
    }
    else {
        this.locked = true;
    }

    var new_index = this.current_index + shift;

    print('switchSlider' + this.current_index + ' + ' + shift);

    if (new_index < 0){
        this.back_arrow.off();
        return;
    }
    else {
        this.back_arrow.on();
    }

    if (new_index > this.getMaxIndex()){
        this.next_arrow.off();
        return;
    }
    else {
        this.next_arrow.on();
    }

    this.current_index = new_index;

    var back_counter = this.current_index;
    var next_counter = this.getMaxIndex() - this.current_index;

    this.back_arrow.updateCounter(back_counter);
    this.next_arrow.updateCounter(next_counter);

    this.show()
    this.locked = false;
};


function view_main(){
    var image_service = new ImageService();
    slider = new Slider(image_service, $('#slider_div'));

    function showResult(){
        slider.show();
    }

    image_service.extractImages(showResult);
}

$(document).ready(view_main);




