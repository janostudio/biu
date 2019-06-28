import Biu from "../src/index";

let o = new Biu({
  data: {
    test: "I am test."
  }
});

o._data.test = "hello,test.";

