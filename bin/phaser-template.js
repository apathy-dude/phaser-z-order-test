(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var states = require('./states');
window.game = new Phaser.Game(800, 600, Phaser.AUTO);

states();
game.state.start('boot');


},{"./states":2}],2:[function(require,module,exports){
module.exports = function() { game.state.add("boot", require("./states/boot"));game.state.add("load", require("./states/load"));game.state.add("menu", require("./states/menu"));game.state.add("play", require("./states/play")); };
},{"./states/boot":3,"./states/load":4,"./states/menu":5,"./states/play":6}],3:[function(require,module,exports){
var text;
var count;

function updateText() {
    count++;
    text.setText("- You have clicked -\n" + count + " times !");
}

module.exports = {
    create: function() {
        count = 0;
        text = game.add.text(game.world.centerX, game.world.centerY, "- You have clicked -\n0 tiles !", {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        });

        text.anchor.setTo(0.5, 0.5);
    },
    update: function() {
        game.input.onDown.addOnce(updateText, this);
    }
};

},{}],4:[function(require,module,exports){
module.exports = {
    create: function() {
    },
    update: function() {
    },
};

},{}],5:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],6:[function(require,module,exports){
module.exports = {
    preload: function() {
    },
    create: function() {
    },
    update: function() {
    },
    render: function() {
    }
};

},{}]},{},[1,3,4,5,6]);
