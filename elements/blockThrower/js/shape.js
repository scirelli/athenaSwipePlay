var cirelli = cirelli || {};
(function(cirelli) {
    'use strict';
    cirelli.IShape = {
    };

    cirelli.AShape = function AShape(obj) {
        this.width = 0;
        this.height = 0;
        this.position = new cirelli.Vector();
        this.velocity = new cirelli.Vector();
        this.cg = new cirelli.Vector();

        if(obj) {
            this.copy(obj);
        }
    };
    cirelli.AShape.prototype = Object.create(cirelli.IShape);

    cirelli.AShape.prototype.copy = function(obj){
        this.width = obj.width;
        this.height = obj.height;
        this.position = obj.position.clone();
        this.velocity = obj.velocity.clone();
        this.cg = obj.cg.clone();
    }

    cirelli.AShape.prototype.clone = function(){
        return new cirelli.AShape(this);
    }
})(cirelli);
