import fs from 'fs';
import path from 'path';

type BingoCard = {
    cardNumber: number;
    winningNumbers: number[];
    yourNumbers: number[];
    yourWon: number[];
    double: boolean;
    points: number;
    instances?: number;
};

class DayFour {
    // Shared
    private bingoCards: BingoCard[];
    private filePath: string;

    // Part One
    private totalPoints: number;

    // Part Two
    private copiedCards: number;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public init() {
        this.bingoCards = this.readingBingoCard(this.filePath);

        this.totalPoints = this.calculateTotalPoints(this.bingoCards);

        this.copiedCards = this.calculateCopiedCards(this.bingoCards);
    }

    private readingBingoCard(filePath: string): BingoCard[] {
        try {
            const fileContent = fs.readFileSync(
                path.resolve(filePath),
                'utf-8',
            );
            const lines = fileContent.split('\n');

            const bingoCards: BingoCard[] = [];

            for (const line of lines) {
                const parts = line.split(': ');

                if (parts.length !== 0) {
                    const cardNumber = parseInt(
                        parts[0].replace('Card', '').trim(),
                    );

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

                        bingoCards.push({
                            cardNumber,
                            winningNumbers,
                            yourNumbers,
                            yourWon: [],
                            double: false,
                            points: 0,
                        });
                    }
                }
            }

            return bingoCards;
        } catch (error) {
            console.error('Error reading file:', error);
            return [];
        }
    }

    private findWonNumbers(bingoCard: BingoCard) {
        bingoCard.winningNumbers.forEach((el) => {
            if (bingoCard.yourNumbers.includes(el)) {
                bingoCard.yourWon.push(el);
            }
        });
    }

    private isDouble(bingoCard: BingoCard) {
        if (bingoCard.yourWon.length > 3) bingoCard.double = true;
    }

    private sumBingoCardPoints(bingoCard: BingoCard) {
        let points = 0;

        bingoCard.yourWon.forEach((_, id) => {
            if (id !== 0) {
                points *= 2;
                return;
            }

            points++;
        });

        bingoCard.points = points;
        return points;
    }

    private calculateTotalPoints(bingoCards: BingoCard[]) {
        let totalPoints = 0;

        for (let card = 0; card < bingoCards.length; card++) {
            const element = bingoCards[card];

            this.findWonNumbers(element);

            this.isDouble(element);

            const cardPoints = this.sumBingoCardPoints(element);

            totalPoints += cardPoints;
        }

        return totalPoints;
    }

    private calculateCopiedCards(bingoCards: BingoCard[]) {
        let copiedCards = 0;

        return copiedCards;
    }

    public logs() {
        console.log('Reading file:', this.bingoCards);
        console.log('[Logs] Part One | Total Points: ', this.totalPoints);

        console.log('[Logs] Part Two | Copied Cards: ', this.copiedCards);
    }

    public remove() {}
}

// export const dayFour = new DayFour('./src/challenges/dayFour/demo.txt');
export const dayFour = new DayFour('./src/challenges/dayFour/input.txt');
