function test() {
    console.log("yoyoyo");
}
var testStr = 'test()'
this[testStr]

eval("test()");