const { MarkovMachine } = require("./markov")

describe("markov machine", function() {

    let mm;
    let text;
  
    beforeEach(function() {
      mm = new MarkovMachine("the cat in the hat");
      text = mm.makeText();
    });
    
    test("creates chain", function() {
        expect(mm.chains).toEqual(new Map([
            ['the', ['cat', 'hat']],
            ['cat', ['in']],
            ['in', ['the']],
            ['hat', [null]]
        ]))
    })

    test("text output", function() {
        expect(mm.makeText()).toEqual(expect.any(String));
        expect(mm.makeText()).toBeTruthy();
        expect(mm.makeText(50).length).toBeLessThanOrEqual(50);
    })
})