HTMLImports.whenReady(function() {
    'use strict';

    //@private
    let _game = new WeakMap(),
        _setTimeoutId = new WeakMap(),
        _continueRunning = new WeakMap(),
        _tickCountMS = new WeakMap();
    
    const GAME_NAME = 'slider-game';

    class SliderGameElement extends Polymer.Element {
        static get is() { return GAME_NAME; }
        static get properties() {
            return {
                width: {
                    value:100,
                    type: Number,
                    readOnly: false,
                    notify: true,
                    observer: '_widthChanged'
                },
                height: {
                    value:100,
                    type: Number,
                    readOnly: false,
                    observer: '_heightChange'
                }
            }
        }
        
        constructor() {
            super();

            _game.set(this, new slider.Game(document));

            console.log(GAME_NAME + ' created');
        }

        ready() {
            super.ready();
            
            this.$.gameCanvas.width = this.width;
            this.$.gameCanvas.height = this.height;
        }

        init() {
            let self = this,
                game = _game.get(self);

            game.init(self.shadowRoot, self.width, self.height);

            return self;
        }

        _heightChange(newValue, oldValue) {
            this.$.gameCanvas.height = newValue;
            return this;
        }
        
        _widthChanged(newValue, oldValue) {
            this.$.gameCanvas.width = newValue;
            return this;
        }
    }

    window.customElements.define(SliderGameElement.is, SliderGameElement);
});
