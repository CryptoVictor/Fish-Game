var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var peixinho, tubarao, concha;
let velocidade = 1;
let vida = true;
let pontuacao = 1;
let nivel = 1;
let scoretext, niveltext;

function preload() {
    this.load.image('mar', './assets/bg_azul-escuro.png');
    this.load.image('logo', './assets/logo-inteli_branco.png');
    this.load.image('tubarao', './assets/peixes/tubarao.png');
    this.load.image('peixe', './assets/peixes/peixinho_laranja.png');
    this.load.image('concha', './assets/peixes/concha.png');
    this.load.image('reload', './assets/reload.png');
}

function create() {
    this.add.image(400, 300, 'mar');
    this.add.image(400, 525, 'logo').setScale(0.5);

    peixinho = this.add.image(400, 300, 'peixe');
    peixinho.setFlip(true, false);

    tubarao = this.add.image(400, 100, 'tubarao');
    tubarao.setFlip(true, false);

    concha = this.add.image(400, 500, 'concha');
    concha.setFlip(true, false);

    scoretext = this.add.text(100, 100, 'Pontuação: ' + pontuacao, { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);
    niveltext = this.add.text(100, 130, 'Nível: ' + nivel, { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);
}

function update() {

    if (!vida) {
        peixinho.destroy();
        tubarao.destroy();
        concha.destroy();
        this.add.text(400, 200, 'Game Over', { fontSize: '50px', fill: '#fff' }).setOrigin(0.5);
        this.add.image(400, 300, 'reload').setScale(0.5, 0.5).setInteractive().on(
            "pointerdown",
            function () {
              window.location.reload();
            },
            this
          );
        return;
    }

    if (Phaser.Geom.Intersects.RectangleToRectangle(peixinho.getBounds(), concha.getBounds())) {
        pontuacao++;
        scoretext.setText('Pontuação: ' + pontuacao);
        concha.x = Phaser.Math.Between(0, 800);
        concha.y = Phaser.Math.Between(0, 600);
    }

    if (pontuacao % 10 == 0) {
        nivel++;
        niveltext.setText('Nível: ' + nivel);
        velocidade++;
        pontuacao = 1;
        scoretext.setText('Pontuação: ' + pontuacao);
    }

    peixinho.x = this.input.x;
    peixinho.y = this.input.y;

    tubarao.x = tubarao.x + velocidade;

    if (tubarao.x > 800) {
        tubarao.x = 0;
        tubarao.y = Phaser.Math.Between(0, 600);
    }

    if (Phaser.Geom.Intersects.RectangleToRectangle(peixinho.getBounds(), tubarao.getBounds())) {
        vida = false;
    }
}

function destroy() {
    Phaser.Game.destroy();
}