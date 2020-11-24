export class stringFunctions {
  static titlelize(sentence) {
    const brokenSentence = sentence.trim().split(' ');
    const returnSentence = [];
    for (let i = 0; i < brokenSentence.length; i += 1) {
      const word = brokenSentence[i][0].toUpperCase() + brokenSentence[i].slice(1);
      returnSentence.push(word);
    }
    return returnSentence.join(' ');
  }
}

export default stringFunctions;
