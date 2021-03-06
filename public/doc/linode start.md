# Let's start Linode

開始學習伺服器架設(我選擇使用 Linode VPS)和一些 Linux/Ubuntu 知識

## Linode Get Start

首先就是註冊、Email 認證、登入、填寫基本資料和信用卡資訊，然後選擇方案，我選擇最便宜的 $5/month

接下來就可以開始設定你的 linux 主機了，參考 [Linode Get Start][get start]，有很詳細的步驟。

注意 linode 的 dashboard 有兩種

* https://cloud.linode.com
* https://manager.linode.com

後者應該是舊版的，Get Start 示範的介面也是這個，但現在從官網進去會到新的 cloud.linode.com。

如果比較喜歡用舊的介面，可以手動打網址進入 manager。

### Deploy an image

首先要部署映像檔，這裡選擇你要的 linux 發行版 (linux distribution)，像是 CentOS、Ubuntu 等等，上網查了一些資料看他們有什麼不同但還是沒什麼感覺...就先照 linode 建議選了 ubuntu。

![404](images/linode1/distribution.jpg)

### Swap space

上圖可以看到有個選項是 [swap space][swap]，簡單來說：

CPU 無法直接存取 Hard drives 的資料和應用，要先複製到 RAM。

在 Linux 系統，當你的應用使用的 RAM 超過記憶體，系統會判斷哪些 blocks/pages(分頁) 的記憶體使用率較低，將他們移到硬碟特殊的 paging/swapping 分割區來釋放 RAM，當需要時這些分頁會再被放回 RAM。

RAM 加上 swap space 就是所謂的 *virtual memory*。

### SSH

成功部署 Linux 發行版之後，按下 boot 便可啟動機器，開始用 [SSH][ssh] 連線主機。

SSH 簡單介紹就是主機那邊會給你他的公鑰，你將自己的使用者密碼加密候傳過去給主機解密對照身分。但是這個公鑰都是自己發行的，不像 https 有第三方的 CA，所以要小心有人假冒主機發公鑰。

因此第一次認證時會跳出警告，問你是否信任這組公鑰

```linux
The authenticity of host 'host (xx.xxx.xxx.xx)' can't be established.

RSA key fingerprint is 98:2e:d7:e0:de:9f:ac:67:28:c2:42:2d:37:16:58:4d.

Are you sure you want to continue connecting (yes/no)?
```

需要自己去比對主機提供的 fingerprint。

可以使用 Linode 的 console ，或本機的 SSH tool 或是 windows 內建 ssh 連線

```bash
ssh <user>@<ip>
```

接著照範例 `update the Linux distribution’s software`

```bash
apt-get update && apt-get upgrade
```

再來繼續照[範例](https://www.linode.com/docs/getting-started/#set-the-hostname)設定 host file 以及 timezone，基本設定大致完成。

## 如何確保伺服器的安全

參考[官網教學][secure]

### 時常更新系統

對任何作業系統來說，保持軟體更新都是一項最大的安全防護措施。軟體更新可能修補資安漏洞、修正程式錯誤。

### 自動化安全性更新

自動更新有好有壞，但如果你只自動化安全性的更新，風險將會非常小，但非全部的 pakage menagement 都支援自動更新，且只有從開源庫下載的套件能自動更新。

Ubuntu 使用 [unattended upgrades][upgrade].

### 限制使用者權限

通常不建議使用最大權限的 root 來操作，而是用一般使用者，必要時再用 sudo 來執行最高權限操作，因此我新增一個使用者 tim 並加入 sudo 群組以擁有最高權限。

```bash
adduser tim sudo
```

> **注意**
>
> 並非所有的 Linux 發行版系統預設有 sudo，但所有 Linode 提供的映象檔的套件庫都有 sudo。如果你得到輸出 sudo: command not found，需先安裝 sudo。

### Harden SSH Access

可以使用「公鑰登錄」的方法，較為安全也不須每次輸入密碼，方法為在自己本地端創建一組公私鑰，將公鑰給主機紀錄，每次登錄主機傳來一個隨機字串符，用戶用私鑰解密後回傳來認證身分。

詳細步驟參考教學。

### SSH Daemon Options

config 檔案在 `/etc/ssh/sshd_config`

#### 禁止 root 使用 SSH 連線

設定 `PermitRootLogin no`

#### 取消 SSH 密碼認證

不使用普通的密碼認證，使用上個步驟的公鑰登錄

設定: `PasswordAuthentication no`

> 如果你想在許多設備上連線 Linode 的話，使用密碼認證會是比較好的選擇，不需要為每個設備準備一組公私鑰。

#### 限制 SSH 只監聽一種網路協定

預設監聽 IPv4/IPv6，可以取消你沒有用到的那種。

* `AddressFamily inet` to listen only on IPv4.
* `AddressFamily inet6` to listen only on IPv6.

AddressFamily 選項通常預設在 sshd_config 檔案中是註解掉的，需要自己新增。

之後重啟 SSH 服務以套用新的設定，Ubuntu 15.10+ :

```linux
sudo systemctl restart sshd
```

### Use Fail2Ban for SSH Login Protection

[Fail2Ban][fail2ban] 是一個 log-parsing 應用程式，它監控系統日誌有無自動化攻擊的徵兆，根據規則封鎖可能嘗試進行攻擊的 IP。當攻擊發生 fail2ban 還能 email 通知你。

Fail2ban 主要專注在 SSH 的攻擊上，不過你可以進一步設定讓它運作於任何使用 log files 的服務。

例如幫助封鎖多次嘗試登入失敗的 IP，以密碼登入通常試錯不超過三次，以 SSH key 認證則是一次，超過這些次數則視為惡意的行為。

Fail2Ban 可以監控多種協定包含：SSH, HTTP 以及 SMTP。Fail2Ban 預設只會監控 SSH，對於安全是很大的幫助，因為主機通常設定開放給任何 IP 連線。

詳細步驟可以看我的[Use Fail2ban to Secure Your Server](#/article/fail2ban)整理或是 linode 的教學。

### Remove Unused Network-Facing Services

多數 Linux 發行版的安裝附帶一些網路服務，監聽在 internet, loopback internet (或是兩者結合) 即將到來的連線。

沒有使用到的網路面向服務應該要將其從系統移除，減少運行程序和安裝套件的攻擊面。

Most Linux distributions install with running network services which listen for incoming connections from the internet, the loopback interface, or a combination of both. Network-facing services which are not needed should be removed from the system to reduce the attack surface of both running processes and installed packages.

#### Determine Running Services

查看正在運行的網路服務，可以使用 `ss` 指令來查看 socket 狀態

```bash
ss -atpu
# 等同於
ss -a -t -p -u
```

詳細 `ss` 指令的介紹及參數可以參考 [G. T. Wang 的這篇][ssref]，或是用 man 查詢

![404](images/linode1/ss.jpg)

可以看到 SSH 進程 (sshd) 正在監聽且已連接。各發行版預設運行的服務不同，因此看到的結果也不一樣。

#### Determine Which Services to RemovePermalink

在沒有開啟防火牆下，對你的 Linode 進行基本的 TCP 和 UDP nmap 掃描會顯示 SSH 和其他可能正在監聽連線的服務。藉由設定防火牆可以依據需求篩選掉這些部分。理想上沒有使用的服務應該去除。

我們需要 SSH 來連接主機，其他像是 `chronyd`, `systemd-resolved` 以及 `dnsmasq` 通常只監聽 localhost 並且極少對外連接，這些服務是你作業系統的一部份，移除他們可能並不合適。

但是其他非必須的服務則是看有無需要，否則建議移除，像是 Exim, Apache, RPC

#### Uninstall the Listening Services

Ubuntu:

```bash
apt purge package_name
```

### Configure a Firewall

使用防火牆來阻擋不想要的入站流量 (traffic) 以提供高效率的安全保護。當只允許特定流入流量，可以防範入侵和 network mapping，最好只允許你需要的流量 (traffic)。

參考 Linode 文件如何設定防火牆：

* [Iptables][iptables] is the controller for netfilter, the Linux kernel’s packet filtering framework. Iptables is included in most Linux distributions by default.
* [FirewallD][firewallid] is the iptables controller available for the CentOS / Fedora family of distributions.
* [UFW][ufw] provides an iptables frontend for Debian and Ubuntu.

## Next Step

以上為最基本加強任何 Linux 主機的步驟，更進一步的安全防護會視主機用途而不同。其他的技術像是應用程式設定，使用[intrusion detection](https://www.linode.com/docs/uptime/monitoring/ossec-ids-debian-7/) 或是安裝 [access control](https://en.wikipedia.org/wiki/Access_control#Access_Control)。

現在你可以根據你的需要來設定 Linode。Linode 有許多文件幫助你解決各種主題像是 [migration from shared hosting](https://www.linode.com/docs/migrate-to-linode/migrate-from-shared-hosting) 到[允許雙向認證](https://www.linode.com/docs/security/linode-manager-security-controls)和[架設網站](https://www.linode.com/docs/websites/hosting-a-website)

Linode 的文件真的蠻豐富的，其他還有 [nginx](https://www.linode.com/docs/web-servers/nginx/) 的教學

好多東西要看啊......

[get start]:https://www.linode.com/docs/getting-started/
[swap]:https://opensource.com/article/18/9/swap-space-linux-systems
[ssh]:http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html
[secure]:https://www.linode.com/docs/security/securing-your-server/
[upgrade]:https://fedoraproject.org/wiki/AutoUpdates#Why_use_Automatic_updates.3F
[fail2ban]:http://www.fail2ban.org/wiki/index.php/Main_Page
[fail2bantur]:https://www.linode.com/docs/security/using-fail2ban-for-security/
[ssref]:https://blog.gtwang.org/linux/socket-statistics-ss-command-tutorial/
[iptables]:https://www.linode.com/docs/security/firewalls/control-network-traffic-with-iptables/
[firewallid]:https://www.linode.com/docs/security/firewalls/introduction-to-firewalld-on-centos/
[ufw]:https://www.linode.com/docs/security/firewalls/configure-firewall-with-ufw/
