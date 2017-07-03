var cirelli = cirelli || {};

(function(cirelli) {
    'use strict';
    const CANVAS_ID      = 'blockThrowerGameCanvas',
          ONE_SECOND     = 1000,
          GRAVITY_SCALOR = 100, //px/s^2
          GRAVITY        = new cirelli.Vector(0, GRAVITY_SCALOR);//ms

    cirelli.BlockThrower = class BlockThrower {
        constructor(window) {
            this.window          = window;
            this.document        = window.document;
            this.shadowRoot      = null;
            this.canvas          = null;
            this.width           = 0;
            this.height          = 0;
            this.ctx             = null;
            this.animatedObjects = [];
        }

        init(shadowRoot, width, height) {
            this.shadowRoot = shadowRoot;
            this.canvas     = this.shadowRoot.querySelector('#' + CANVAS_ID);
            this.ctx        = this.canvas.getContext('2d');
            this.width      = width;
            this.height     = height;

            let b = new cirelli.Rectangle();
            b.position.x = 50;
            b.position.y = 20;
            b.velocity.y = 1;
            b.width      = 100;
            b.height     = 100;
            this.animatedObjects.push(b);
        }
        
        start() {
            this.loop();            
        }
        
        loop() {
            let self = this,
                prevTimeMS = self.window.performance.now(),
                curTimeMS = 0;

            self.window.setTimeout(() => {
                self.window.requestAnimationFrame(() => {
                    curTimeMS = self.window.performance.now();
                    self.calculate(curTimeMS - prevTimeMS);
                    self.collision();
                    self.clear();
                    self.draw()
                    self.loop();
                });
            }, 0);
        }

        calculate(elapsedTime) {
            let delta = elapsedTime/ONE_SECOND;

            for(let i=0, l=this.animatedObjects.length, objs= this.animatedObjects, obj; i<l; i++){
                obj = objs[i];
                obj.velocity.add(
                    cirelli.Vector.mul(
                        cirelli.Vector.add(obj.acceleration, GRAVITY),
                        delta)
                );
                obj.position.add(cirelli.Vector.mul(obj.velocity, delta));
            }

            return this;
        }
        
        collision() {
            for(let i=0, l=this.animatedObjects.length, objs=this.animatedObjects, obj; i<l; i++){
                obj = objs[i];

                if(obj.position.y <= 0) {
                    obj.position.y = 0;
                    obj.velocity.y *= -1;
                }else if(obj.position.y+obj.height >= this.height){
                    obj.position.y = this.height - obj.height;
                    obj.velocity.y *= -1;
                }
            }

            return this;
        }
        
        clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            return this;
        }

        draw() {
            let ctx = this.ctx;
            
            ctx.strokeStyle = '#0000FF';
            ctx.fillStyle   = '#FF0000';
            ctx.lineWidth   = 4;

            for(let i=0, l=this.animatedObjects.length, objs=this.animatedObjects, obj; i<l; i++){
                obj = objs[i];
                ctx.beginPath();
                ctx.rect(obj.position.x, obj.position.y, obj.width, obj.height);
                ctx.fill();
                ctx.stroke();
            }

            return this;
        }

        onResize(width, height) {
            this.width = width;
            this.height = height;
        }
    };
})(cirelli);
