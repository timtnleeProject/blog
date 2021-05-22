# Interesting JS

## Resting & Spreding Objects

[各種好用](https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83)，很爽...

## && 返回值

&& 如果比對結果是 `false`, 會返回 `== false` 的那個值

```javascript
1 && 0 //0
0 && 1 //1
undefined && true //undefined
false && 1 //false
```

&& 如果比對結果是 `true`, 會返回後面的那個值

```javascript
1 && true //true
true && 1 //1
```

## Object.values, Object.keys

`for ... in` 也會迭代原型(prototype)屬性!

```javascript
function A () {
  this.a = "a"
}
A.prototype.b = "b"

const a = new A();
for (k in a) {
  // a, b
}

```

使用 `Object.values`, `Object.keys` 較正確:

```javascript
const obj = {
  a: 1,
  b: 2
}

Object.keys(obj).forEach(k => {
  // ...
})
```

## MAX_SAFE_INTEGER

js 超過 MAX_SAFE_INTEGER 運算會不正確

```javascript
Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MAX_SAFE_INTEGER + 10 //9007199254741000
```

超過可使用 `BigInt` 型態來運算

BigInt 顯示後面會有一個 n

```javascript
BigInt(Number.MAX_SAFE_INTEGER) // 9007199254740991n
BigInt(Number.MAX_SAFE_INTEGER) + 10n // 9007199254741001n
```