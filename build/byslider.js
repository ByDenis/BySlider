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
	        this.npShow=2;
	        this.imgPreload=true;
	        this.$element = $(element);
	        this.__element = element;
	        this._cIndex=0;
	        this._indexElement=">li:not('.byhide')";

	        this._maxIndex=this.$element.find(this._indexElement).length;
	        
	        $('[data-byslider]').on("click",(e)=>{
	            let $this = $(e.currentTarget);
	            if (typeof this[$this.data('byslider')]==='function') {
	                e.preventDefault();
	                this[$this.data('byslider')](e);
	            }
	        });
	        if (this.imgPreload) {
	            this.$element.find('img[data-src]').each(function() {
	                $(this).attr('src',$(this).data('src'));
	            });
	            this.$element.find('img[data-src]').eq(this.$element.find('img[data-src]').length-1).on('load',(e)=>{
	                this._addEvent("onLoad");
	            });
	        } else {
	            this._addEvent("onLoad");
	        }

	        this._setIndex();
	    }

	    _addEvent(e_name) {
	        let event = new CustomEvent(e_name);
	        this.__element.dispatchEvent(event);
	    }

	    _increment(i) {
	        this._cIndex=this._cIndex+i;
	        if(this._cIndex<0) {
	            this._cIndex=this._maxIndex+this._cIndex;
	        } else if(this._cIndex>=this._maxIndex) {
	            this._cIndex=this._cIndex-this._maxIndex;
	        }
	        this._setIndex();
	    }

	    _setIndex() {
	        this.$element.find(">li").removeClass('bycurrent');
	        this.$element.find(">li").removeClass('bynext');
	        this.$element.find(">li").removeClass('byprev');
	        
	        this.$element.find(this._indexElement).eq(this._cIndex).addClass('bycurrent');
	        for(let q=1;q<=this.npShow;q++) {
	            this.$element.find(">li").removeClass('bynext-'+q);
	            this.$element.find(">li").removeClass('byprev-'+q);

	            let tmp_next=this._cIndex+q;
	            if(tmp_next>=this._maxIndex) tmp_next=tmp_next-this._maxIndex;
	            if(!this.$element.find(this._indexElement).eq(tmp_next).hasClass('bycurrent') 
	            && !this.$element.find(this._indexElement).eq(tmp_next).hasClass('byprev') )
	            {
	                this.$element.find(this._indexElement).eq(tmp_next).addClass('bynext');
	                this.$element.find(this._indexElement).eq(tmp_next).addClass('bynext-'+q);
	            }

	            let tmp_prev=this._cIndex-q;
	            if(tmp_prev<0) tmp_prev=this._maxIndex+tmp_prev;
	            if(!this.$element.find(this._indexElement).eq(tmp_prev).hasClass('bycurrent') 
	            && !this.$element.find(this._indexElement).eq(tmp_prev).hasClass('bynext') ) 
	            {
	                this.$element.find(this._indexElement).eq(tmp_prev).addClass('byprev');
	                this.$element.find(this._indexElement).eq(tmp_prev).addClass('byprev-'+q);
	            }
	        }
	    }

	    next(e) {
	        this._increment(1);
	        
	        this._addEvent("onNext");
	    }

	    prev(e) {
	        this._increment(-1);
	        
	        this._addEvent("onPrev");
	    }
	    
	    filt(e) {
	        if(typeof e !== 'undefined') {
	            let $this = $(e.currentTarget);
	            let type=$this.data('type');
	            
	            this.$element.find(">li").each((i,element)=> {
	                let $el_this = $(element);
	                if ($el_this.data('type')==type) {
	                    if ($el_this.hasClass('byhide')) {
	                        $el_this.show();
	                        $el_this.removeClass('byhide');
	                    }
	                } else if (type=='all') {
	                    $el_this.show();
	                    $el_this.removeClass('byhide');
	                } else {
	                    $el_this.addClass('byhide');
	                    $el_this.hide();
	                }
	            });
	        }
	        
	        this._cIndex=0;
	        this._maxIndex=this.$element.find(this._indexElement).length;
	        this._setIndex();
	        this._addEvent("onFilt");
	    }

	}

	//var new_slider=new Slider("test");


	Slider.DEFAULTS = {};

	plugin('bySlider', Slider);

	//export {new_slider};

})));
