# 第一次在 github 上被發 issue

我寫的組件 [vuejs-clipper](https://github.com/timtnleeProject/vuejs-clipper) 被發 issue 了，隨意紀念一下

被發 issue 真的是一件值得高興的事情，表示我寫的東西有人在用，雖然自己回頭看已經是看不懂當初在寫什麼了...0.2.7 版是在 2018/10/18 發布的，現在是 2019/2/21，大約相隔四個月

## my first issue

第一個 [#1 issue](https://github.com/timtnleeProject/vuejs-clipper/issues/1) 比較單純，因為我有個 component 包著 file input，他希望加上 `accept` 這個 prop 可以綁定 input 的 `accept` 屬性，就是這樣。

我一開始還不知道 file input 有 `accept` 這個 attribute...，還問發問者他是什麼意思，後來看了他的範例我一查才知道這是 input 的屬性。

## EXIF 檔案

第二個 [#2 issue](https://github.com/timtnleeProject/vuejs-clipper/issues/2)，他一開始是發 email 給我

![""](images/issue/mail1.jpg)

然後我請他去 github 發個 issue

![""](images/issue/mail2.jpg)

這個問題是有些圖片會有 EXIF 屬性，其中有個屬性 Orientation 是紀錄圖片的方向，因為相機可能是用不同方位去拍照，直拍橫拍倒著拍...

![""](images/issue/exif.png)

手機和電腦檔案系統都會處理這個屬性讓圖片正確的顯示，但是瀏覽器並不會去處理這個屬性所以如果圖片的 Orientation 是 1 以外，顯示的圖片就會是翻轉的。

另外發現我的安卓手機拍照，不管怎麼轉一律都是儲存成 Orientation 1 的照片，所以就沒有這個問題。

如果要測試可以上網找 EXIF 圖片有全部 Orientation (1~8) 的圖片可以給你測試。

所以今天就是把這個功能給加上去，我是加在上傳的元件，判斷圖片是否有 Orientation，然後使用 canvas 繪製翻轉再將其轉為圖片 url...有些繁瑣。

## 心得

處理 issue 還挺有趣的，自己覺得這個元件庫設計的不是那麼好，開發的時候有點麻煩，還要手動 build 之類的，所以其他人感覺比較不容易 PR，希望之後設計能更好一些。
