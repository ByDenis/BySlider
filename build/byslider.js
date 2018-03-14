(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(factory(global.$));
}(this, (function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	/**
	 * Generate a jQuery plugin
	 * @param pluginName [string] Plugin name
	 * @param className [object] Class of the plugin
	 * @param shortHand [bool] Generate a shorthand as $.pluginName
	 *
	 * @example
	 * import plugin from 'plugin';
	 *
	 * class MyPlugin {
	 *     constructor(element, options) {
	 *         // ...
	 *     }
	 * }
	 *
	 * MyPlugin.DEFAULTS = {};
	 *
	 * plugin('myPlugin', MyPlugin');
	 */
	function plugin(pluginName, className, shortHand = false) {
	    let dataName = `__${pluginName}`;
	    let old = $.fn[pluginName];

	    $.fn[pluginName] = function (option) {
	        return this.each(function () {
	            let $this = $(this);
	            let data = $this.data(dataName);
	            let options = $.extend({}, className.DEFAULTS, $this.data(), typeof option === 'object' && option);

	            if (!data) {
	                $this.data(dataName, (data = new className(this, options)));
	            }

	            if (typeof option === 'string') {
	                data[option]();
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

	        if ($element.hasClass("ishide")) {
	            $element.fadeIn(1000);
	            $element.removeClass("ishide");
	        } else {
	            $element.fadeOut(1000);
	            $element.addClass("ishide");
	        }
	    }


	    set name(value) {
	        this._name=value;
	    }
	    get name() {
	        return this._name;
	    }
	}

	//var new_slider=new Slider("test");


	Slider.DEFAULTS = {};

	plugin('slider', Slider,true);

	//export {new_slider};

})));
