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


const numberLiteralRegx=/^([+-])?([\d]*[.]{0,1}[\d]*)(e[+-])?[\d]*$|^0[bBoO]+[0-7]*$|^0[xX]+[0-9a-fA-f]*$/g;

console.log('整数:1',numberLiteralRegx.test('1')) 
console.log('小数:1.2',numberLiteralRegx.test('1.2')) 
console.log('小数:.2',numberLiteralRegx.test('.2')) 
console.log('小数:2.',numberLiteralRegx.test('2.')) 
console.log('科学计数',numberLiteralRegx.test('1000e+12')) 
console.log('0bxx',numberLiteralRegx.test('0b232')) 
console.log('0oxx',numberLiteralRegx.test('0o1234')) 
console.log('0x',numberLiteralRegx.test('0x12')) 
console.log('二进制010101',numberLiteralRegx.test('010101')) 

