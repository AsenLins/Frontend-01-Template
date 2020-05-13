/*匹配所有String字面量 */
/*
String的所有字面量
https://tc39.es/ecma262/#sec-literals-string-literals
*/


const LSPS=/[\u2028|\u2029]+/;
const SourceCharacter=/[^\\\\n\\r]/;
const EscapeSequence=/^\\['"\\bfnrtv0-9xu]+/;
const HexEscapeSequence=/\\[x]+[0-9a-fA-F]{2}/
const UnicodeEscapeSequence=/^\\u[0-9a-fA-F]{4}/
const NonEscapeCharacter=/^\\[^'"\\bfnrtv0-9xu]/

const StringDoubleLiterals=/"([\\u2028|\\u2029]+|[^"\\\r\n\u2028\u2029]+|\\['"\\bfnrtv0-9xu]|\\[x]{1}[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^'"\\bfnrtv0-9xu])"/;
const StringSingleLiterals=/'([\\u2028|\\u2029]+|[^"\\\r\n\u2028\u2029]+|\\['"\\bfnrtv0-9xu]|\\[x]{1}[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^'"\\bfnrtv0-9xu])'/;


console.log(StringDoubleLiterals.test('"\\u2028"'));
console.log(StringDoubleLiterals.test('"a"'));
console.log(StringDoubleLiterals.test('"\b"'));
console.log(StringDoubleLiterals.test('"\\x12"'));
console.log(StringDoubleLiterals.test('"\\u1234"'));
console.log(StringDoubleLiterals.test('"\\z"'));
console.log(StringDoubleLiterals.test('"0123456789qwertyuiop[]asdfghjkl;zxcvbnm,."'));



console.log(StringSingleLiterals.test("'\\u2028'"));
console.log(StringSingleLiterals.test("'a'"));
console.log(StringSingleLiterals.test("'\b'"));
console.log(StringSingleLiterals.test("'\\x12'"));
console.log(StringSingleLiterals.test("'\\u1234'"));
console.log(StringSingleLiterals.test("'\\z'"));
console.log(StringSingleLiterals.test("'0123456789qwertyuiop[]asdfghjkl;zxcvbnm,.'"));