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
	        this.npShow=options.npshow || 2;
	        this.isClear=options.isсlear || false;
	        this.imgPreload=options.imgpreload || true;
	        this.$element = $(element);
	        this.__element = element;
	        this._cIndex=0;
	        this._indexElement=">li:not('.byhide')";

	        this._jpattern=options.jpattern || "<li>undefined</li>";
	        
	        $('[data-byslider]').on("click",(e)=>{
	            let $this = $(e.currentTarget);
	            if (typeof this[$this.data('byslider')]==='function') {
	                e.preventDefault();
	                this[$this.data('byslider')](e);
	            }
	        });

	        if (typeof options.jload!=="undefined") {
	            this._jget(options.jload).then(
	                result => {
	                    if (this.isClear) $('[data-byslider=init]').html("");
	                    $(result).each((index,elemnt) => {
	                        $('[data-byslider=init]').append(this._parseTpl(this._jpattern,elemnt));
	                    });
	                    
	                    this._addImgPreloader();
	                    this._setIndex();
	                },
	                error => {
	                    console.error(error);
	                }
	            );
	        }
	        this._addImgPreloader();
	        this._setIndex();
	    }

	    _parseTpl(template, map) {
	        return template.replace(/\$\{.+?}/g, (match) => {
	            const path = match.substr(2, match.length - 3).trim();
	            return path.split('.').reduce((res, key) => res[key], map);
	        });
	    }

	    //send ajax, return Promise
	    _jget(url) {
	        return new Promise(function(resolve, reject) {
	            let req = new XMLHttpRequest();
	            req.open('GET', url, true);
	            req.responseType = 'json';
	            req.onload = function() {
	                if (req.status == 200) {
	                    resolve(req.response);
	                }
	                else {
	                    reject(Error(req.statusText));
	                }
	            };
	            req.onerror = function() {
	                reject(Error("Network Error"));
	            };
	            req.send();
	        });
	    }
	    
	    _addImgPreloader() {
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
	        this._maxIndex=this.$element.find(this._indexElement).length;

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
