import WordGenerator from './word-generator/WordGenerator';
class LotteryWord {
    constructor( wordGenerator, existWords = [] ) {
      this.setGenerator( wordGenerator );
      this.setExistWords( existWords )
    }
    setGenerator( ob ) {
      if( !(ob instanceof WordGenerator) ) {
          throw new TypeError('This class must be instance of abstract class "WordGenerator"');
      }
        this.wordGenerator = ob;
    }

    setExistWords( words ) {
      if(!Array.isArray(words)) {
        throw new TypeError('Parameter "words" must be array');
      }
      this.existWords = words;
    }
    getRandomWords( numberOfRandomWords = 1 ) {
      if(!Number.isInteger(numberOfRandomWords)) {
        throw new TypeError('Parameter "numberOfRandomWords" must be integer');
      }
        let nextLottery;
        let randomWords = [];
        let randomWord = '';
        for( let i =1; i<=numberOfRandomWords; i++) {
          nextLottery = true;
          do {
            randomWord = this.wordGenerator.getWord();
            if( !this.existWords.includes( randomWord) )
                nextLottery = false;
          } while( nextLottery );

           randomWords.push(randomWord);
        }

      return randomWords;
    }
}
export default LotteryWord;
