var layers = [];
var visibleLayers = []
var cursors;

function currentLayer() {
    return visibleLayers.length - 1;
}

module.exports = {
    init: function() {
    },
    preload: function() {
        game.load.baseURL = '/';

        game.load.tilemap('map', 'assets/test.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/generic.png');
        game.load.spritesheet('person', 'assets/person.png', 32, 32);
    },
    create: function() {
        game.map = game.add.tilemap('map');
        game.map.addTilesetImage('generic', 'tiles');

        //game.layer = game.map.createLayer('Tile Layer 1');

        visibleLayers[0] = game.map.createLayer('Tile Layer 1');
        layers[3] = game.map.createLayer('Tile Layer 1');
        layers[2] = game.map.createLayer('Tile Layer 1');
        layers[1] = game.map.createLayer('Tile Layer 1');
        layers[0] = game.map.createLayer('Tile Layer 1');

        for(var l in visibleLayers) {
            var layer = visibleLayers[l];
        }

        visibleLayers[0].resizeWorld();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.person = game.add.sprite(game.width / 2, game.height / 2, 'person');
        game.person.animations.add('walk');
        game.person.animations.play('walk', 10, true);
        game.person.scale.x /= 2;
        game.person.scale.y /= 2;
        game.person.anchor.set(0.5, 0.5);

        game.physics.arcade.enable(game.person);
        game.person.body.setSize(16, 16, 0, 0);
        game.person.body.maxAngular = 500;
        game.person.body.angularDrag = 50;

        game.camera.follow(game.person);

        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function() {

        game.physics.arcade.collide(game.person, visibleLayers[visibleLayers.length - 1]);

        game.person.body.velocity.x = 0;
        game.person.body.velocity.y = 0;
        game.person.body.angularVelocity = 0;

        if(cursors.left.isDown)
            game.person.body.angularVelocity -= 300;

        if(cursors.right.isDown)
            game.person.body.angularVelocity += 300;

        if(cursors.up.isDown)
            game.physics.arcade.velocityFromAngle(game.person.angle - 90, 100, game.person.body.velocity);

        var changeLayer = false;
        if(game.input.keyboard.isDown(Phaser.Keyboard.PAGE_UP) && layers.length > 0) {
            visibleLayers.push(layers.pop());
            changeLayer = true;
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.PAGE_DOWN) && visibleLayers.length > 1) {
            layers.push(visibleLayers.pop());
            changeLayer = true;
        }

        if(changeLayer) {
            var visibleCount = visibleLayers.length;
            for(var l = 0; l < visibleCount; l++) {
                var layer = visibleLayers[l];
                var factor = (l + 1) / visibleCount;
                console.log(layer.scrollFactorX, layer.scrollFactorY);
                layer.scrollFactorX = factor;
                layer.scrollFactorY = factor;
                layer.renderable = true;
                console.log(l, visibleCount, factor);
            }

            for(var l in layers) {
                var layer = layers[l];
                layer.renderable = false;
            }
        }
    },
    render: function() {
        if(game.person.body.velocity.x !== 0 && game.person.body.velocity.y !== 0) {
            game.person.animations.play('walk', 10, true);
        }
        else
            game.person.animations.stop('walk');
    }
};
