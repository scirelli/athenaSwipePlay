var cirelli = cirelli || {};

(function(cirelli) {
    'use strict';
    const CANVAS_ID      = 'blockThrowerGameCanvas';

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
            b.position.x = 10;
            b.position.y = 10;
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
                elapsedTime = 0;

            self.window.setTimeout(() => {
                self.window.requestAnimationFrame(() => {
                    elapsedTime = self.window.performance.now() - prevTimeMS;

                    self.calculate(elapsedTime);
                    self.collision();
                    self.clear();
                    self.draw()
                    self.loop();
                });
            }, 0);
        }

        //@abstract
        calculate(elapsedTime) {
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
