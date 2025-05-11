export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Load menu assets
        this.load.image('background', 'assets/background.png');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('start-button', 'assets/start-button.png');
    }

    create() {
        // Add menu elements
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // Add title text
        this.add.text(centerX, centerY - 100, 'EduRacer', {
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Add start button
        const startButton = this.add.text(centerX, centerY + 50, 'Start Game', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#4CAF50',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();

        // Add mode selection buttons
        const modes = ['Alphabet', 'Numbers', 'Math', 'Colors'];
        modes.forEach((mode, index) => {
            const button = this.add.text(centerX, centerY + 120 + (index * 50), mode, {
                fontSize: '24px',
                fill: '#fff',
                backgroundColor: '#2196F3',
                padding: { x: 15, y: 8 }
            })
            .setOrigin(0.5)
            .setInteractive();

            button.on('pointerdown', () => {
                this.scene.start('GameScene', { mode });
            });
        });
    }
}
