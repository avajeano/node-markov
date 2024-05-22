/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // iterate over a map
    let chains = new Map();

    // for each word in the text
    for (let i = 0; i < this.words.length; i+= 1) {

      // retrieves the first word in the text
      let word = this.words[i];

      // gets the next or last word 
      let nextWord = this.words[i + 1] || null;

      // checks if the chain already has a word and if it does it adds nextWord
      // if the chain doesn't alreayd have a word a new entry is created 
      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }
    this.chains = chains;
  }

   /** Pick random choice from array */
   static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // convert the keys from the Map to an array 
    let keys = Array.from(this.chains.keys());
    
    // a random key is selected to use as a starting point 
    let key = MarkovMachine.choice(keys);

    // intialize an empty array to store the words 
    let out = []

    while (out.length < numWords && key !== null) {
      // current key is added to the array s
      out.push(key);

      // loop runs until there are no more words or it's reached the 100 word limit 
      key = MarkovMachine.choice(this.chains.get(key))
    }
    // join the words from the array into one string seperating each word with a space 
    return out.join(" ");
  }
}

module.exports = { MarkovMachine };
