var cirelli = cirelli || {};

HTMLImports.whenReady(function() {
    'use strict';

    //@private
    let _game = new WeakMap(),
        _setTimeoutId = new WeakMap(),
        _continueRunning = new WeakMap(),
        _tickCountMS = new WeakMap();
    
    const GAME_NAME = 'block-thrower';

    class BlockThrowerElement extends Polymer.Element {
        static get is() { return GAME_NAME; }
        static get properties() {
            return {
                width: {
                    value:window.innerWidth,
                    type: Number,
                    readOnly: false,
                    notify: true,
                    observer: '_widthChanged'
                },
                height: {
                    value:window.innerHeight,
                    type: Number,
                    readOnly: false,
                    observer: '_heightChange'
                },
                algorithm: {
                    value:'euler',
                    type: String,
                    readOnly: false,
                    observer: '_setAlgorithm'
                },
                'data-algorithm': {
                    value:'euler',
                    type: String,
                    readOnly: false,
                    observer: '_setAlgorithm'
                }
            }
        }
        
        constructor() {
            super();

            console.log(GAME_NAME + ' created');
        }

        ready() {
            super.ready();

            init.call(this)
            //attachEventHandlers.call(this);
            start.call(this);
        }
        
        resize(width, height) {
            let self = this,
                game = _game.get(self);
            
            if(game){
                game.onResize(width, height);
            }

            self.$.blockThrowerGameCanvas.width = width;
            self.$.blockThrowerGameCanvas.height = height;

            return this;
        }

        _heightChange(newValue, oldValue) {
            this.resize(this.width, window.parseInt(newValue));
            return this;
        }
        
        _widthChanged(newValue, oldValue) {
            this.resize(window.parseInt(newValue), this.height);
            return this;
        }

        _setAlgorithm(algorithm) {
            if(_game.get(self)){
                init.call(this);
            }
        }
    }
    
    //@private
    function init() {
        let self = this,
            algorithm = self.getAttribute('data-algorithm') || self.getAttribute('algorithm');

        _game.set(self, cirelli.blockThrowerFactory(algorithm));
        _game.get(self).init(self.shadowRoot, self.width, self.height);
        self.$.blockThrowerGameCanvas.width = self.width;
        self.$.blockThrowerGameCanvas.height = self.height;

        return self;
    }

    //@private
    function attachEventHandlers (){
        let self = this,
            game = _game.get(self);

        window.addEventListener('resize', () => {
            self.width = window.innerWidth;
            self.height = window.innerHeight;
            game.onResize(window.innerWidth, window.innerHeight);
            self.$.blockThrowerGameCanvas.width = window.innerWidth;
            self.$.blockThrowerGameCanvas.height = window.innerHeight;
        });

        return this;
    }
    
    //@private
    function start() {
        let self = this,
            game = _game.get(self);

        game.start();
    }

    window.customElements.define(BlockThrowerElement.is, BlockThrowerElement);
});
