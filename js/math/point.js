var cirelli = cirelli || {};
(function(cirelli) {
    'use strict';

    class Point {
        constructor(x, y){
            this.x = x || 0;
            this.y = y || 0;
        }

        toString(){
            return `($this.x, $this.y)`;
        }

        get x(){
            return this.x;
        }

        set x(x){
            this.x = x || 0;
        }

        get y(){
            return this.y;
        }

        set y(y){
            this.y = y || 0;
        }
    }

    cirelli.Point = Point;
})(cirelli);
