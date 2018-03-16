/**
 * @author ByDenis / https://github.com/ByDenis/
 */
import $ from 'jquery';
'use strict';
class Slider {
    constructor(element, options) {
        this.$element = $(element);
        this.__element = element;
       // let obj_name='byslider'+time();
       // const [obj_name]=this;
       // $(element).data("objname",obj_name);
       
        //вызываем событие
        this._addEvent("onLoad");
    }

    _addEvent(e_name) {
        let event = new CustomEvent(e_name);
        this.__element.dispatchEvent(event);
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

}

export { Slider };