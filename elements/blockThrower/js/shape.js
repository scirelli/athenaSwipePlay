var cirelli = cirelli || {};
(function(cirelli) {
    'use strict';
    cirelli.IShape = {
    };

    cirelli.AShape = function AShape() {
        this.width = 0;
        this.height = 0;
        this.position = new cirelli.Vector();
        this.velocity = new cirelli.Vector();
        this.cg = new cirelli.Vector();
    };
    cirelli.AShape.prototype = Object.create(cirelli.IShape);
})(cirelli);
