// Criar classe WelcomeScene
export class WelcomeScene extends Phaser.Scene {

    alturaJogo = 600; // Definir dimenões da tela do jogo
    larguraJogo = 800;

    constructor() {
        super("WelcomeScene"); // Criar "chave de comando" para essa cena, para fazer integralçao de telas
    }

    preload() { //Fazer carregamento de imagens
        this.load.image("fazenda", "assets/background_fazenda.png");
        this.load.image("mg", "assets/background_mg.png");
        this.load.image("ajude", "assets/ajude.png");
        this.load.image("caca", "assets/caca.png");
        this.load.image("play", "assets/botao_play.png");
        this.load.image("teclas", "assets/teclas.png");
        this.load.image("comandos", "assets/comandos.png");
    }

    create() {
        // Adicionar imagens que compõe a tela inicial
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "fazenda").setScale(0.3);
        this.add.image(this.larguraJogo/2, 80, "caca").setScale(1);
        this.add.image(this.larguraJogo/2, 180, "ajude").setScale(0.4);
        this.add.image(100, 450, "teclas").setScale(0.2);
        this.add.image(110, 350, "comandos").setScale(0.47);

        //Adicionar botão interativo para iniciar o jogo
        this.botaoJogar = this.add.image(this.larguraJogo/2, 450, "play").setScale(0.9).setInteractive();

        //Trocar cursor quando passar o mouse
        this.botaoJogar.on("pointerover", () => { 
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoJogar.on("pointerdown", () => { // Quando clicar no botão, ocorre troca de cena
            this.scene.start("GameScene")
        })
    }

    update() {
        // Não foi necessário criar atualização contínua, mas o update é essencial no código para caso surja a atualização supracitada
    }
}