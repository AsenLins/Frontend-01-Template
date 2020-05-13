/*匹配所有Number字面量/直接量 */
/*
Number的所有字面量:
https://tc39.es/ecma262/#prod-HexDigits 

*/
/*匹配0-9 */
/*匹配.xx小数 */
/*匹配x.xx小数*/
/*匹配科学计数 e+x*/
/*匹配0|b|B */
/*匹配0|o|O */
/*匹配16进制0|x|X */
/*匹配二进制010101 */


const Integer = /^[\d]+$/; //整型
const Decimal = /^[.]?[\d]+$|^[\d]+[.]?[\d]+$/; //小数
const ExponentIndicator = /^[\d]+[eE]\+[\d]+$/; //科学计数
const BinaryInteger = /^0[bB]+[0-1]+$/; //二进制
const BigInt = /^\d+n{0,1}$/; //bigInt
const OctalInteger = /^0[oO]+[0-7]+$/; //八进制
const HexInteger = /^0[xX]+[0-9a-fA-F]+$/; //十六进制

const NumberLiterals = /^[\d]*$|^[\.]{1}[\d]+$|^[\d]*[\.]{1}[\d]*$|^[\d]0+[eE]\+[\d]+$|^0[bB]+[0-1]+$|^\d+n{0,1}$|^0[oO]+[0-7]+$|^0[xX]+[0-9a-fA-F]+$/;
console.log("整数1:", NumberLiterals.test("1"));
console.log("小数:1.1", NumberLiterals.test("1.111"));
console.log("小数.11:", NumberLiterals.test(".11"));
console.log("科学计数:100e+10", NumberLiterals.test("100e+10"));
console.log("bigInter:10n", NumberLiterals.test("10n"));
console.log("二进制0b1010", NumberLiterals.test("0b1010"));
console.log("八进制:0o123", NumberLiterals.test("0o123"));
console.log("十六进制:0x1afa", NumberLiterals.test("0x1afa"));



console.log('match','.2'.match(numberLiteralRegx));

console.log('test',/^[+-]?([\d]*[.]{0,1}[\d]*)(e[+-])?[\d]*$/g.test('1.2'));

