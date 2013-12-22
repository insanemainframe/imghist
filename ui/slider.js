function SliderArrow(slider, shift){
    this.slider = slider;

    this.shift = shift;
    this.arrow_class = shift > 0 ? 'next' : 'back';
    this.button = slider.slider_div.find('.arrow.' + this.arrow_class);
    this.counter = slider.slider_div.find('.counter.' + this.arrow_class);

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


function Slider(slider_div){
    var self = this;
    this.locked = false;

    this.slider_div = slider_div;
    this.slider_img  = slider_div.find('.slider_img');
    this.current_index = 0;

    this.back_arrow = new SliderArrow(this, -1);
    this.next_arrow = new SliderArrow(this, 1);

    this.image_service = getImageService(function() {self.switchSlider(0);});
    this.updateCounters();

}

Slider.prototype.update = function() {
    this.switchSlider(0);
}

Slider.prototype.show = function() {
    var img_url = this.image_service.getImage(this.current_index);
    this.slider_img.attr('src', img_url);
};

Slider.prototype.getMaxIndex = function() {
    return this.image_service.getMaxIndex();
};

Slider.prototype.switchSlider = function(shift) {
    if (this.locked) {
        return;
    }
    else {
        this.locked = true;
    }

    var new_index = this.current_index + shift;
    var is_valid;

    print('switchSlider' + this.current_index + ' + ' + shift);

    if (new_index > 0){
        this.back_arrow.on();
        is_valid = true;
    }
    else {
        this.back_arrow.off();
        is_valid = false;
    }

    if (new_index < this.getMaxIndex()){
        this.next_arrow.on();
        is_valid = true;
    }
    else {
        this.next_arrow.off();
        is_valid = false;
    }

    if (is_valid){
        this.current_index = new_index;
    }
    this.updateCounters();
}


Slider.prototype.updateCounters = function(shift) {
    var back_counter = this.current_index;
    var next_counter = this.getMaxIndex() - this.current_index;

    this.back_arrow.updateCounter(back_counter);
    this.next_arrow.updateCounter(next_counter);

    this.show()
    this.locked = false;
};
