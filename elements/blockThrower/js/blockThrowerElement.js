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
                }
            }
        }
        
        constructor() {
            super();

            _game.set(this, new cirelli.BlockThrower(window));

            console.log(GAME_NAME + ' created');
        }

        ready() {
            super.ready();

            init.call(this)
            attachEventHandlers.call(this);
            start.call(this);
        }

        _heightChange(newValue, oldValue) {
            return this;
        }
        
        _widthChanged(newValue, oldValue) {
            return this;
        }
    }
    
    //@private
    function init() {
        let self = this,
            game = _game.get(self);

        game.init(self.shadowRoot, self.width, self.height);
        self.$.blockThrowerGameCanvas.width = self.width;
        self.$.blockThrowerGameCanvas.height = self.height;

        return self;
    }

    //@private
    function attachEventHandlers (){
        let self = this,
            game = _game.get(self);

        window.addEventListener('resize', () => {
            game.onResize(window.innerWidth, window.innerHeight);
            self.width = window.innerWidth;
            self.height = window.innerHeight;
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
