# 2020-4-26本周总结 

## 编程语言通识
总结:https://mubu.com/doc/31MOWlk433

## unicode
unicode(万国码、国际码、统一码、单一码),是计算机科学领域里的一项业界标准。它对世界上大部分的文字系统进行了整理、编码，使得电脑可以用更为简单的方式来呈现和处理文字。

**UTF-8** 就是在互联网上使用最广的一种 Unicode 的实现方式。其他实现方式还包括 UTF-16（字符用两个字节或四个字节表示）和 UTF-32（字符用四个字节表示,互联网上基本不用,因为太大），**UTF-8 是 Unicode 的实现方式之一。**


**JavaScript 是区分大小写的，并使用 Unicode 字符集**

## JavaScript 词法 

#### 什么是JavaScript词法?
JavaScript词法组成:
- WhiteSpace:空格
- LineTerminator:换行
- Comment:注释
- Token:有效输入

其中**Token**由已下几部分组成
##### Punctuator
```
一些符号:
+,-,*,;等等
```
##### IdentifierName
IdentifierName又包含:
- KeyWords
- identifier
- Feture
```
var a; //标识符
console.log("a") //这里的a是标识符
if //keywords
```
##### Literal
**字面量/值/直接量**

- String literals
```
var a="str";
```
- Array literals
```
var a=[1,2,3,4];
```
- Integers literals
```
var a=1;
var b=0o;
var c=0x
var d=0b
```
- Boolean literals
```
var a=true;
```
- Floating-point literals
```
var a=1.0
```
- Object literals
```
var a={
    name:'asen'
}
```
- RegExp literals
```
var a=/a/g;
```




### 本周学到的知识
- JavaScript的基本词法
- JavaScript的各种数据类型的字面量
- unicode,码点
### 学到的API
```
String.fromChatCode
String.charCodeAt
```
