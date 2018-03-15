import plugin from "./jquery.plugin.js";
import { Slider } from "./slider";
import $ from 'jquery';

//var new_slider=new Slider("test");


Slider.DEFAULTS = {};

plugin('slider', Slider, true);

//export {new_slider};