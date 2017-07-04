var cirelli = cirelli || {};

(function(cirelli) {
    'use strict';
    const CANVAS_ID      = 'blockThrowerGameCanvas',
          ONE_SECOND     = 1000,
          GRAVITY_SCALOR = 100, //px/s^2
          GRAVITY        = new cirelli.Vector(0, GRAVITY_SCALOR);//ms

    cirelli.BlockThrowerGaffer = class BlockThrowerGaffer extends cirelli.BlockThrower{
        constructor(window) {
            super(window);
        }

        calculate(elapsedTime) {
            return this;
        }
    };
})(cirelli);
