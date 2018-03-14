/**
 * @author ByDenis / https://github.com/ByDenis/
 */
'use strict';
class Slider {
    
    constructor(element, options) {
      //  this.selector = selector;
        this._name='empty name';
        console.log("init");
    }
    set name(value) {
        this._name=value;
    }
    get name() {
        return this._name;
    }
}

export { Slider };