var cirelli = cirelli || {};

(function(cirelli) {
    'use strict';
    const CANVAS_ID      = 'blockThrowerGameCanvas',
          ONE_SECOND     = 1000,
          GRAVITY_SCALOR = 100, //px/s^2
          GRAVITY        = new cirelli.Vector(0, GRAVITY_SCALOR);//ms

    cirelli.BlockThrowerEuler = class BlockThrowerEuler extends cirelli.BlockThrower{
        constructor(window) {
            super(window);
        }

        createAnimatableObjects() {
            let b = new cirelli.Rectangle();
            b.position.x = 10;
            b.position.y = 10;
            b.velocity.y = 1;
            b.width      = 100;
            b.height     = 100;
            this.animatedObjects.push(b);
        }

        /*
         *  semi-implicit Euler's (pronounced "Oiler") Integration Method
        */
        calculate(elapsedTime) {
            let delta = elapsedTime/ONE_SECOND;

            for(let i=0, l=this.animatedObjects.length, objs= this.animatedObjects, obj; i<l; i++){
                obj = objs[i];
                obj.velocity.add(
                    cirelli.Vector.mul(GRAVITY, delta)
                );
                obj.position.add(cirelli.Vector.mul(obj.velocity, delta));
            }

            return this;
        }
    };
})(cirelli);
