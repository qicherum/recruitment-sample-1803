class WordGenerator {
    constructor() {
        if (this.constructor === WordGenerator) {
            throw new TypeError('Abstract class "WordGenerator" cannot be instantiated directly.');
        }
    }
    getWord () {
      throw new Error('You must implement this method');
  }
}
export default WordGenerator;
