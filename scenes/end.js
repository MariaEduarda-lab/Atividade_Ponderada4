export class EndScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("EndScene");
    }

    init(data) {
        this.resultado = data.resultado;
    }

    preload() {
        this.load.image("ganhou", "assets/ganhou.png");
        this.load.image("menu", "assets/botao_menu.png");
        this.load.image("restart", "assets/botao_restart.png");
        this.load.image("fim", "assets/fim.png");
        this.load.image("tiao", "assets/tiao.png");

        this.load.audio("musicaRoca", "../assets/musica.mp3"); // Se necessário, carregue o áudio aqui
    }

    create() {
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, 'fim').setScale(1.3);
        this.add.image(this.larguraJogo / 2 - 200, this.alturaJogo / 2 + 100, 'tiao').setScale(1);
        this.add.image(300, 100, "ganhou").setScale(0.7);

        this.botaoMenu = this.add.image(this.larguraJogo / 2 + 50, 320, "menu").setScale(0.7).setInteractive();
        this.botaoRestart = this.add.image(this.larguraJogo / 2 + 230, 320, "restart").setScale(0.7).setInteractive();

        // Troca o cursor ao passar o mouse sobre o botão
        this.botaoMenu.on("pointerover", () => this.input.setDefaultCursor("pointer"));
        this.botaoMenu.on("pointerout", () => this.input.setDefaultCursor("default"));

        this.botaoRestart.on("pointerover", () => this.input.setDefaultCursor("pointer"));
        this.botaoRestart.on("pointerout", () => this.input.setDefaultCursor("default"));

        // Botão para voltar ao menu
        this.botaoMenu.on("pointerdown", () => {
            this.cleanUp(); // Parar música e limpar eventos
            this.scene.stop("EndScene");
            this.scene.start("WelcomeScene");
        });

        // Botão para reiniciar o jogo
        this.botaoRestart.on("pointerdown", () => {
            this.cleanUp(); // Parar música e limpar eventos
            this.scene.stop("EndScene");
            this.scene.start("GameScene");
        });

        // Se ganhou, exibe a imagem
        if (this.resultado === "ganhou") {
            this.add.image(this.larguraJogo / 2, 130, "ganhou").setScale(0.25);
        }

        // Captura a música ativa, caso esteja tocando em outra cena
        this.musica = this.sound.get("musicaRoca");
    }

    cleanUp() {
        // Para a música e remove os sons
        if (this.musica && this.musica.isPlaying) {
            this.musica.stop();
            this.musica.destroy(); // Remove o som para evitar conflitos
        }

        // Remove todos os eventos ativos da cena
        this.events.removeAllListeners();
    }

    update() {
        // Se precisar de alguma atualização contínua, insira aqui
    }
}
