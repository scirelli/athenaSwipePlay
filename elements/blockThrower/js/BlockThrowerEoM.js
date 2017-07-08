var cirelli = cirelli || {};

(function(cirelli) {
    'use strict';
    const GRAVITY_SCALOR = 100, //px/s^2
          GRAVITY        = new cirelli.Vector(0, GRAVITY_SCALOR);//s

    let Vector = cirelli.Vector; 

    cirelli.BlockThrowerEoM = class BlockThrowerEoM extends cirelli.BlockThrower{
        constructor(window) {
            super(window);
            this.totalTime = 0;
        }

        calculate(elapsedTime) {
            elapsedTime *= 0.001;//In seconds

            for(let i=0, a=this.animatedObjects, l=a.length, obj; i<l; i++){
                obj = a[i];

                obj.velocity.add(
                    Vector.mul(GRAVITY, 0.5).mul(elapsedTime*elapsedTime)
                );
                obj.position.add( 
                    Vector.mul(obj.velocity, elapsedTime),
                )
            }

            this.totalTime += elapsedTime;
            return this;
        }
    };
})(cirelli);
