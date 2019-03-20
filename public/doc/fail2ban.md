# Use Fail2Ban for SSH Login Protection

[Fail2Ban](http://www.fail2ban.org/wiki/index.php/Main_Page) 是一個 log-parsing 應用程式，它監控系統日誌有無自動化攻擊的徵兆，根據規則封鎖可能嘗試進行攻擊的 IP。當攻擊發生 fail2ban 還能 email 通知你。

Fail2ban 主要專注在 SSH 的攻擊上，不過你可以進一步設定讓它運作於任何使用 log files 的服務。

例如幫助封鎖多次嘗試登入失敗的 IP，以密碼登入通常試錯不超過三次，以 SSH key 認證則是一次，超過這些次數則視為惡意的行為。

Fail2Ban 可以監控多種協定包含：SSH, HTTP 以及 SMTP。Fail2Ban 預設只會監控 SSH，對於安全是很大的幫助，因為主機通常設定開放給任何 IP 連線。

本篇參考 Linode 提供的 [Use Fail2ban to Secure Your Server][fail2bantur]

## Install Fail2ban

> **Note**
>
> The steps required in this guide require root privileges. Be sure to run the steps below as root or with the sudo prefix. For more information on privileges, see our Users and Groups guide.

**Ubuntu:**

Install fail2ban

```bash
sudo apt-get install fail2ban
```

(Optional) If you would like email support, Install Sendmail:

```bash
sudo apt-get install sendmail
```

ufw (Uncomplicated Firewall) 是一個 iptables 的前端設定程式，它的製作目的在於讓一般人很容易的設定 iptables，若想做更複雜的 firewall 設定，還是得回到 iptables 層面。

Allow SSH access through UFW and then enable the firewall:

```bash
ufw allow ssh
ufw enable
```

其他系統[參考這裡](https://www.linode.com/docs/security/using-fail2ban-for-security/#install-fail2ban)

## Configure Fail2ban

Fail2ban 會先讀取 `.conf` 設定檔，然後是 `.local` 會覆蓋任何設定，因此我們通常會在 `.local` 檔進行設定，保持 `.conf` 檔不變。

### Configure fail2ban.local

`fail2ban.conf` 的路徑在 `/etc/fail2ban`

複製一份檔案存成 `.local`，並用這份檔案來進行設定。

```bash
cp fail2ban.conf fail2ban.local
```

可以設定的選項有:

* `loglevel`: The level of detail that Fail2ban’s logs provide can be set to 1 (error), 2 (warn), 3 (info), or 4 (debug).
* `logtarget`: Logs actions into a specific file. The default value of `/var/log/fail2ban.log` puts all logging into the defined file. Alternately, you can change the value to:
  * `STDOUT`: output any data
  * `STDERR`: output any errors
  * `SYSLOG`: message-based logging
  * `FILE`: output to a file
* `socket`: The location of the socket file.
* `pidfile`: The location of the PID file.

## Configure jail.local Settings

在 Debian 和 Ubuntu 下，`jail.conf` 預設允許 Fail2ban SSH，CentOS 則需要[另外設定](https://www.linode.com/docs/security/using-fail2ban-for-security/#configure-jail-local-settings)。

其他協定如 HTTP, FTP 需要另外設定，創建 `jail.local`

```bash
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

### Whitelist IP

將你要忽略的 IP 加入 `ignoreip`，如果你時常使用固定的 IP 可以考慮加入

/etc/fail2ban/jail.local

```js
ignoreip = 127.0.0.1/8 123.45.67.89
```

如果你想將白名單 IP 只套用到特定的 jails (protocal)，可以使用 `fail2ban-client` 指令，例如 ssh

![404](images/fail2ban/jail.jpg)

詳細指令可參考[這裡](https://www.fail2ban.org/wiki/index.php/Commands#JAIL_CONTROL)

### Ban Time and Retry Amount

`bantime`,`findtime`,`maxentry` 設定封鎖的規則

在 `findtime` (seconds) 時間內，同個 IP 登入失敗達到 `maxentry` 次數時，Fail2ban 會封鎖該 IP `bantime` (seconds) 時間

### Email Alerts

當 Fail2ban 觸發時可以發出 email 通知。

* `estemail`: The email address where you would like to receive the emails.
* `sendername`: The name under which the email shows up.
* `sender`: The email address from which Fail2ban will send emails.

![404](images/fail2ban/emailconf.jpg)

## Other configurations

其他相關設定可以參考[這裡](https://www.linode.com/docs/security/using-fail2ban-for-security/#other-jail-configuration)

未完...

## 其他資料

* [Fail2ban 指令](https://www.fail2ban.org/wiki/index.php/Commands)

[fail2ban]:http://www.fail2ban.org/wiki/index.php/Main_Page
[fail2bantur]:https://www.linode.com/docs/security/using-fail2ban-for-security/