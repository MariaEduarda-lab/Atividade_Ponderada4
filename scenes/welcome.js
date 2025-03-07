export class WelcomeScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("WelcomeScene");
    }

    preload() {
        this.load.image("fazenda", "../assets/background_fazenda.png");
        this.load.image("mg", "../assets/background_mg.png");
        this.load.image("ajude", "../assets/ajude.png");
        this.load.image("caca", "../assets/caca.png");
        this.load.image("play", "../assets/botao_play.png");
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "fazenda").setScale(0.3);
        this.add.image(this.larguraJogo/2, 80, "caca").setScale(1);
        this.add.image(this.larguraJogo/2, 180, "ajude").setScale(0.4);
        this.botaoJogar = this.add.image(this.larguraJogo/2, 450, "play").setScale(0.9).setInteractive();

        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("GameScene")
        })
    }

    update() {

    }
}