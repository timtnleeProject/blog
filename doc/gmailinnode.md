# Postfix 使用 gmail SMTP 送信

使用 linode 這篇，[Configure Postfix to Send Mail Using Gmail and Google Apps on Debian or Ubuntu](https://www.linode.com/docs/email/postfix/configure-postfix-to-send-mail-using-gmail-and-google-apps-on-debian-or-ubuntu/)

設定好 postfix 並用 sendmail 指令發送成功後

來寫個 script 呼叫，因為之後要在 nodejs 應用程式呼叫

參考[這個](https://stackoverflow.com/questions/28181177/smtp-send-mail-via-postfix-and-nodejs-nodemailer-connection-closed)

```javascript
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  name: 'localhost',
  port: 25,
  tls:{
    rejectUnauthorized: false
  }
})

transporter.sendMail({
    from: 'tim@tanya.serveblog.net', // sender address
    to: 'timtnlee1995@gmail.com', // list of receivers
    subject: 'Please vertify your email', // Subject line
    html: '<div>1334</div>'// plain text body
})
.then(res => {
  console.log(res)
})
.catch(e=>{
  console.log(e)
})
```

## spam!!!

如果信中含有連結 google 可能會 reject 送信請求，信件會直接退回寄信者信箱！

我實驗使用免費網域都會被封鎖，如果是有認證的付費網域像是 .com .tw 就不會