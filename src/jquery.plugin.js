import $ from 'jquery';

export default function plugin(pluginName, className) {
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


    // - No conflict
    $.fn[pluginName].noConflict = () => $.fn[pluginName] = old;
}