/**
 * @author ByDenis / https://github.com/ByDenis/
 */
import $ from 'jquery';
'use strict';
class Slider {
    constructor(element, options) {
        let $element = $(element);
       // let obj_name='byslider'+time();
       // const [obj_name]=this;
       // $(element).data("objname",obj_name);
       console.log('init');
        //вызываем событие
        var event = new CustomEvent("sliderload");
        element.dispatchEvent(event);
    }

    next() {
        console.log("next");
    }

    prev() {
        console.log("prev");
    }
    
    filt(id) {
        console.log(id);
    }


    set name(value) {
        this._name=value;
    }
    get name() {
        return this._name;
    }
}

export { Slider };