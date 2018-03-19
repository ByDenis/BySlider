/**
 * @author ByDenis / https://github.com/ByDenis/
 */
import $ from 'jquery';
'use strict';
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
            let tmp_next=this._cIndex+q;
            if(tmp_next>=this._maxIndex) tmp_next=tmp_next-this._maxIndex;
            this.$element.find(this._indexElement).eq(tmp_next).addClass('bynext');

            let tmp_prev=this._cIndex-q;
            if(tmp_prev<0) tmp_prev=this._maxIndex+tmp_prev;
            this.$element.find(this._indexElement).eq(tmp_prev).addClass('byprev');
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

export { Slider };