// Criar classe "GameScene"
export class GameScene extends Phaser.Scene {

    //Definir dimensões do  jogo
    alturaJogo = 600;
    larguraJogo = 800;
    plataformas = []; // Acrescentar array de plataformas para utilizá-las de maneira dinâmica

    constructor() {
        super("GameScene"); // Criar "chave de comando" para essa cena, para fazer integralçao de telas
    }

    preload() { //Fazer carregamento de imagens, sprite e áudio
        this.load.image('mg', 'assets/background_mg.png');
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.spritesheet("fazendeiro", "assets/fazendeiro_sprite.png", { frameWidth: 463.5, frameHeight: 480});
        this.load.audio("musicaRoca", "assets/musicaRoca.mp3");
        this.load.image('queijin', 'assets/queijin.png');
    }

    create() { //Criar elementos da tela do jogo

        //Criar variável pontuação
        this.pontuacao = 0;

        //Adicionar música
        this.musica = this.sound.add("musicaRoca");
        this.musica.play({
            loop: true,  
            volume: 1 
        });

        //Adicionar background
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, 'mg').setScale(0.5);

        // Adicionar sprite da personagem
        this.player = this.physics.add.sprite(this.larguraJogo/2, 100, 'fazendeiro').setScale(0.2);
        this.player.setCollideWorldBounds(true);


        // Adicionar plataformas 1 e 2, dimensão e marcação de colisão
        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        this.plataformas[0].body.setSize(150, 100, true);
        this.plataformas[0].setScale(0.5);

        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
        this.plataformas[1].body.setSize(150, 100, true);
        this.plataformas[1].setScale(0.5);

        // Adicionar colisão das plataformas do array, começando pela 0
        for (let i = 0; i < this.plataformas.length; i++){
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        // Adicionar os controles do teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // Adicionar placar 
        this.placar = this.add.text(50, 50, 'Pontuação:' + this.pontuacao, {fontSize:'45px', fill:'#495613'});

        // Adicionar o queijin
        this.queijin = this.physics.add.sprite(this.larguraJogo/3, 0, 'queijin');
        this.queijin.setCollideWorldBounds(true).setSize(400, 400); // "borda no mundo"
        this.queijin.setScale(0.13);
        this.physics.add.collider(this.queijin, this.plataformas[0]); // faz com que o queijin n consiga se sobrepor a plataforma
        this.physics.add.collider(this.queijin, this.plataformas[1]);


        // Quando o player encostar no queijin
        this.physics.add.overlap(this.player, this.queijin, () => { 

            this.queijin.setVisible(false); //o queijin fica invisível

            // Número sorteado entre 50 e 650
            var posicaoQueijin_Y = Phaser.Math.RND.between(50, 650);
            // Ajustar a posição do queijin de acordo com o número sorteado
            this.queijin.setPosition(posicaoQueijin_Y, 100); 

            this.pontuacao += 1; //Somar pontuação
            this.placar.setText('Pontuacao: ' + this.pontuacao); // Atualizar o placar

            this.queijin.setVisible(true); // Tornar o queijin visível

        });

        // Animações da personagem
        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('fazendeiro', { start: 1, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('fazendeiro', { start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'parada',
            frames: [{ key: 'fazendeiro', frame: 0 }],
            frameRate: 20
        });

        }


    update() {

        //Criar atualizações contínuas para movimentação do personagem
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            if (this.player.anims.currentAnim?.key !== 'esquerda') {
                this.player.anims.play('esquerda', true);
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            if (this.player.anims.currentAnim?.key !== 'direita') {
                this.player.anims.play('direita', true);
            }
        } else {
            this.player.setVelocityX(0);
            if (this.player.anims.currentAnim?.key !== 'parada') {
                this.player.anims.play('parada', true);
            }
        }

        // Lógica de pulo (vertical) 
        if (this.cursors.up.isDown) { 
            this.player.setVelocityY(-400);
        }

        if (this.cursors.down.isDown) {
            this.player.setVelocityY(400); // Acelera a descida 
        }

        if (this.pontuacao >= 5){ // Caso a pontuação atinja 5, ocorre a troca de cena
            this.scene.stop('GameScene');
            this.scene.start('EndScene', "ganhou");
        }
    }
}