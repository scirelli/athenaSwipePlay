var cirelli = cirelli || {};

(function(cirelli) {
    'use strict';
    const CANVAS_ID      = 'blockThrowerGameCanvas',
          ONE_SECOND     = 1000,
          GRAVITY_SCALOR = 100, //px/s^2
          GRAVITY        = new cirelli.Vector(0, GRAVITY_SCALOR);//ms

    let Vector = cirelli.Vector,
        Rectangle = cirelli.Rectangle;

    cirelli.BlockThrowerRK4 = class BlockThrowerRK4 extends cirelli.BlockThrower{
        constructor(window){
            super(window);

            this.totalTime = 0.0;
        }

        calculate(elapsedTime){
            elapsedTime /= 1000;
            this.totalTime += elapsedTime;

            for(let i=0, a=this.animatedObjects, l=a.length; i<l; i++){
                this.integrate(a[i], this.totalTime, elapsedTime);
            }

            return this;
        }

        integrate(object, totalTime, deltaTime){
            let derivativeA, derivativeB, derivativeC, derivativeD,
                dxdt, dvdt;

            derivativeA = this.evaluate(object, totalTime, 0.0          , new Rectangle());
            derivativeB = this.evaluate(object, totalTime, deltaTime*0.5, derivativeA);
            derivativeC = this.evaluate(object, totalTime, deltaTime*0.5, derivativeB);
            derivativeD = this.evaluate(object, totalTime, deltaTime    , derivativeC);

            dxdt = Vector.add( derivativeA.position,
                               Vector.add(derivativeB.position, derivativeC.position).mul(2.0))
                          .add(derivativeD.position)
                          .mul(1.0/6.0);
            dvdt = Vector.add( derivativeA.velocity,
                               Vector.add(derivativeB.velocity, derivativeC.velocity).mul(2.0))
                          .add(derivativeD.velocity)
                          .mul(1.0/6.0);

            object.position.add(dxdt.mul(deltaTime));
            object.velocity.add(dvdt.mul(deltaTime));

            return this;
        }

        evaluate(object, totalTime, deltaTime, derivative){
            let state  = new Rectangle(),
                output = new Rectangle();

            state.position = Vector.add(object.position, Vector.mul(derivative.position, deltaTime));
            state.velocity = Vector.add(object.velocity, Vector.mul(derivative.velocity, deltaTime));

            output.position = state.velocity;
            output.velocity = this.acceleration(state, totalTime+deltaTime);

            return output;
        }

        acceleration(object, time) {
            return GRAVITY.clone();
        }
    };
})(cirelli);
