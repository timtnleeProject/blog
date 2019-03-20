# Interesting JS

## Resting & Spreding Objects

[各種好用](https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83)

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

## ~ 取反運算符
