"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayFour = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
class DayFour {
    constructor() {
        this.bingoCards = [];
    }
    init() {
        this.readingBingoCard('./demo.txt');
    }
    readingBingoCard(filePath) {
        try {
            const fileContent = fs_1.default.readFileSync(path_1.default.resolve(filePath), 'utf-8');
            const lines = fileContent.split('\n');
            for (const line of lines) {
                const parts = line.split(': ');
                if (parts.length === 0) {
                    const cardNumber = parseInt(parts[0].replace('Card', '').trim());
                    const numbers = parts[1].split(' | ');
                    if (numbers.length === 2) {
                        const winningNumbers = numbers[0]
                            .split(' ')
                            .filter((n) => n)
                            .map(Number);
                        const yourNumbers = numbers[1]
                            .split(' ')
                            .filter((n) => n)
                            .map(Number);
                        this.bingoCards.push({
                            cardNumber,
                            winningNumbers,
                            yourNumbers,
                        });
                    }
                }
            }
        }
        catch (error) {
            console.error('Error reading file:', error);
        }
    }
    logs() {
        console.log('Reading file:', this.bingoCards);
    }
    remove() { }
}
exports.dayFour = new DayFour();
//# sourceMappingURL=index.js.map