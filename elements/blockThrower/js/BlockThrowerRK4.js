var cirelli = cirelli || {};

(function(cirelli) {
    'use strict';
    const ONE_SECOND     = 0.001,
          GRAVITY_SCALOR = 100, //px/s^2
          GRAVITY        = new cirelli.Vector(0, GRAVITY_SCALOR);//ms

    let Vector = cirelli.Vector,
        Rectangle = cirelli.Rectangle;

    cirelli.BlockThrowerRK4 = class BlockThrowerRK4 extends cirelli.BlockThrower{
        constructor(window){
            super(window);

            this.totalTime = 0.0;
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

        calculate(elapsedTime){
            elapsedTime *= 0.001;//In seconds

            for(let i=0, a=this.animatedObjects, l=a.length; i<l; i++){
                this.integrate(a[i], this.totalTime, elapsedTime);
            }

            this.totalTime += elapsedTime;
            return this;
        }

        integrate(object, totalTime, deltaTime){
            let derivativeA, derivativeB, derivativeC, derivativeD,
                dxdt, dvdt,
                halfDeltaTime = deltaTime*0.5;

            const ONE_SIXTH = 1.0/6.0; //One sixth for the weighted average.
                                       //              ( An + 2Bn + 2Cn + Dn )
                                       //yn+1 = yn + h ( ------------------- )
                                       //              (          6          )
                                       //xn+1 = xn + h    //Where h is your step size
                                       //
                                       //~~~
                                       //yn+1 = yn + hAn
                                       //              ~~~
                                       //Bn = f( xn+1, yn+1 )

            derivativeA = this.evaluate(object, totalTime, 0.0          , new Rectangle());
            derivativeB = this.evaluate(object, totalTime, halfDeltaTime, derivativeA);
            derivativeC = this.evaluate(object, totalTime, halfDeltaTime, derivativeB);
            derivativeD = this.evaluate(object, totalTime, deltaTime    , derivativeC);

            dxdt = Vector.add( derivativeA.position,
                               Vector.add(derivativeB.position, derivativeC.position).mul(2.0))
                          .add(derivativeD.position)
                          .mul(ONE_SIXTH);
            dvdt = Vector.add( derivativeA.velocity,
                               Vector.add(derivativeB.velocity, derivativeC.velocity).mul(2.0))
                          .add(derivativeD.velocity)
                          .mul(ONE_SIXTH);

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
