var cirelli = cirelli || {};

(function(cirelli) {
    'use strict';
    const CANVAS_ID       = 'blockThrowerGameCanvas',
          ONE_SECOND      = 1000,
          GRAVITY_SCALOR  = 100, //px/s^2
          GRAVITY         = new cirelli.Vector(0, GRAVITY_SCALOR),
          FIXED_TIME_STEP = 0.01,//s
          MIN_FRAME_TIME  = 0.25;//s

    let Vector = cirelli.Vector,
        Rectangle = cirelli.Rectangle;

    cirelli.BlockThrowerGaffer = class BlockThrowerGaffer extends cirelli.BlockThrower{
        constructor(window) {
            super(window);
            this.accumulator = 0.0;
            this.totalTime = 0.0;
            this.objHistory = new WeakMap();
        }

        createAnimatableObjects(){
            let b = new cirelli.Rectangle();
            b.position.x = 10;
            b.position.y = 10;
            b.velocity.y = 1;
            b.width      = 100;
            b.height     = 100;
            this.animatedObjects.push(b);
            
            b.previousState = b.clone();
            //b itself represents the state you want to render. Or the state between current and prev.
            b.currentState = b.clone();
        }

        calculate(elapsedTime) {
            let accumulator = this.accumulator,
                totalTime = this.totalTime,
                alpha = 0;

            elapsedTime *= 0.001; //in seconds

            if(elapsedTime >= MIN_FRAME_TIME){
                elapsedTime = MIN_FRAME_TIME;
            }

            accumulator += elapsedTime;

            while(accumulator >= FIXED_TIME_STEP){
                accumulator -= FIXED_TIME_STEP;

                for(let i=0, a=this.animatedObjects, l=a.length, obj; i<l; i++){
                    obj = a[i];

                    obj.previousState = obj.currentState.clone();
                    this.integrate(obj.currentState, totalTime, FIXED_TIME_STEP);
                }

                totalTime += FIXED_TIME_STEP;
            }
            
            //Interpolate
            alpha = accumulator/elapsedTime;
            for(let i=0, a=this.animatedObjects, l=a.length, obj, state; i<l; i++){
                obj = a[i];
                obj.position = Vector.mul(obj.currentState.position, alpha).add( 
                    Vector.mul(obj.previousState.position, 1.0 - alpha)
                )
            }

            this.accumulator = accumulator;
            this.totalTime = totalTime;
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

        collision() {
            for(let i=0, l=this.animatedObjects.length, objs=this.animatedObjects, obj, p, v; i<l; i++){
                obj = objs[i];
                p   = objs[i].currentState.position;
                v   = objs[i].currentState.velocity;

                if(p.y <= 0) {
                    p.y = 0;
                    v.y *= -1;
                }else if(p.y+obj.height >= this.height){
                    p.y = this.height - obj.height;
                    v.y *= -1;
                }
            }

            return this;
        }
    };
})(cirelli);
