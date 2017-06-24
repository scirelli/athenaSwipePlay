var cirelli = cirelli || {};
(function(cirelli) {
    'use strict';
    cirelli.IShape = {
    };

    cirelli.AShape = function AShape() {
        this.width = 0;
        this.height = 0;
        this.position = new Vector();
        this.cg = new Vector();
    };
    cirelli.AShape = Object.create(cirelli.IShape);
})(cirelli);
