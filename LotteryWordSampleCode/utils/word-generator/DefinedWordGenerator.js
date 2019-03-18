import WordGenerator from './WordGenerator';
import {shuffle} from './../utility';

class DefinedWordGenerator extends WordGenerator {

  constructor( wordsList ) {
    super();
    if(!Array.isArray(wordsList)) {
      throw new TypeError('Parameter "wordsList" must be array');
    }
    if(wordsList.length === 0) {
      throw new Error('Parameter "wordsList" cannot be empty');
    }

    this.words = shuffle( wordsList )[Symbol.iterator]();
  }

  getWord () {
    const nextWord =  this.words.next();
    return nextWord.value;
  }
}
export default DefinedWordGenerator;
