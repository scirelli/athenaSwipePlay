var cirelli = cirelli || {};
(function(cirelli, window) {
    'use strict';

    cirelli.blockThrowerFactory = function blockThrowerFactory(algorithm, pwindow) {
        window = pwindow || window;

        switch(algorithm){
            case 'rk4':
                return new cirelli.BlockThrowerRK4(window);
            case 'gaffer':
                return new cirelli.BlockThrowerGaffer(window);
            case 'euler':
                return new cirelli.BlockThrowerEuler(window);
            case 'verlet':
                return new cirelli.BlockThrowerVerlet(window);
            case 'eom':
                return new cirelli.BlockThrowerEoM(window);
            default:
                return new cirelli.BlockThrower(window);
        }
    };
})(cirelli, window);
