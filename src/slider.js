/**
 * @author ByDenis / https://github.com/ByDenis/
 */
import $ from 'jquery';
'use strict';
class Slider {
    constructor(element, options) {
        let $element = $(element);

        if ($element.hasClass("ishide")) {
            $element.fadeIn(1000);
            $element.removeClass("ishide");
        } else {
            $element.fadeOut(1000);
            $element.addClass("ishide")
        }
    }


    set name(value) {
        this._name=value;
    }
    get name() {
        return this._name;
    }
}

export { Slider };