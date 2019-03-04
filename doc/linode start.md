# Let's start Linode

開始學習伺服器架設(我選擇使用 Linode VPS)和一些 Linux/Ubuntu 知識

## Linode Get Start

首先就是註冊、Email 認證、登入、填寫基本資料和信用卡資訊，然後選擇方案，我選擇最便宜的 $5/month

接下來就可以開始設定你的 linux 主機了，參考 [Linode Get Start][get start]，有很詳細的步驟。

注意 linode 的 dashboard 有兩種

* https://cloud.linode.com
* https://manager.linode.com

後者應該是舊版的，Get Start 示範的介面也是這個，但現在從官網進去會到新的 cloud.linode.com。

舊的看起來比較順眼...可以手動打網址用舊的介面。

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

### 限制使用者權限

通常不建議使用 root 來操作，而是用一般使用者，必要時再用 sudo 來執行最高權限操作，因此我新增一個使用者 tim

```bash
adduser tim
```

[get start]:https://www.linode.com/docs/getting-started/
[swap]:https://opensource.com/article/18/9/swap-space-linux-systems
[ssh]:http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html
[secure]:https://www.linode.com/docs/security/securing-your-server/