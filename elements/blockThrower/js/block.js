var cirelli = cirelli || {};
(function(cirelli) {
    'use strict';
    cirelli.Block = function Block() {
        cirelli.AShape.apply(this, arguments);
    };
    cirelli.Block.prototpye = new cirelli.AShape();
})(cirelli);
