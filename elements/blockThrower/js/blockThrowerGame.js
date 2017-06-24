var cirelli = cirelli || {};

(function(cirelli) {
    'use strict';
    const CANVAS_ID = 'blockThrowerGameCanvas';

    cirelli.BlockThrower = class BlockThrower {
        constructor(window) {
            this.window = window;
            this.document = window.document;
            this.shadowRoot = null;
            this.canvas = null;
            this.width = 0;
            this.height = 0;
            this.ctx = null;
            this.animatedObjects = [];
        }

        init(shadowRoot, width, height) {
            this.shadowRoot = shadowRoot;
            this.canvas = this.shadowRoot.querySelector('#' + CANVAS_ID);
            this.ctx = this.canvas.getContext('2d');
            this.width = width;
            this.height = height;
        }
        
        start() {
            this.loop();            
        }
        
        loop() {
            let self = this;

            self.window.setTimeout(() => {
                self.window.requestAnimationFrame(() => {
                    self.calculate();
                    self.draw()
                    self.loop();
                });
            }, 0);
        }

        calculate() {
        }

        draw() {
            let ctx = this.ctx;

            ctx.strokeStyle = 'blue';
            ctx.strokeRect(10, 10, 100, 100);
        }

        onResize(width, height) {
            this.width = width;
            this.height = height;
        }
    };
})(cirelli);
