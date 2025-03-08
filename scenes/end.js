// Criar classe "EndScene" 
export class EndScene extends Phaser.Scene {

    alturaJogo = 600; // Definir dimensões da tela do jogo
    larguraJogo = 800;

    constructor() { // Criar "chave de comando" para essa cena, para fazer integralçao de telas
        super("EndScene");
    }

    preload() { // Fazer  carregamento de imagens e áudio
        this.load.image("ganhou", "assets/ganhou.png");
        this.load.image("menu", "assets/botao_menu.png");
        this.load.image("restart", "assets/botao_restart.png");
        this.load.image("fim", "assets/fim.png");
        this.load.image("tiao", "assets/tiao.png");
        this.load.audio("musicaRoca", "../assets/musica.mp3"); 
    }

    create() {
        // Adicionar imagens referentes à composição da tela final
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, 'fim').setScale(1.3);
        this.add.image(this.larguraJogo / 2 - 200, this.alturaJogo / 2 + 100, 'tiao').setScale(1);
        this.add.image(300, 100, "ganhou").setScale(0.7);

        // Adicionar botões e setar sua interação
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

        // Capturar a música ativa, caso esteja tocando em outra cena
        this.musica = this.sound.get("musicaRoca");
    }

    cleanUp() {
        // Parar a música e remove os sons
        if (this.musica && this.musica.isPlaying) {
            this.musica.stop();
            this.musica.destroy(); // Remover o som para evitar conflitos
        }

        // Remover todos os eventos ativos da cena
        this.events.removeAllListeners();
    }

    update() {
        // Não foi necessário criar atualização contínua, mas o update é essencial no código para caso surja a atualização supracitada
    }
}
