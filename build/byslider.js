(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(factory(global.$));
}(this, (function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	function plugin(pluginName, className, shortHand = false) {
	    let dataName = `__${pluginName}`;
	    let old = $.fn[pluginName];

	    $.fn[pluginName] = function (option,value) {
	        return this.each(function () {
	            let $this = $(this);
	            let data = $this.data(dataName);
	            let options = $.extend({}, className.DEFAULTS, $this.data(), typeof option === 'object' && option);

	            if (!data) {
	                $this.data(dataName, (data = new className(this, options)));
	            }

	            if (typeof option === 'string') {
	                if (value) data[option](value);
	                else data[option]();
	            }
	        });
	    };

	    // - Short hand
	    if (shortHand) {
	        $[pluginName] = (options) => $({})[pluginName](options);
	    }

	    // - No conflict
	    $.fn[pluginName].noConflict = () => $.fn[pluginName] = old;
	}

	/**
	 * @author ByDenis / https://github.com/ByDenis/
	 */
	class Slider {
	    constructor(element, options) {
	        let $element = $(element);
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

	//var new_slider=new Slider("test");


	Slider.DEFAULTS = {};

	plugin('bySlider', Slider);

	//export {new_slider};

})));
