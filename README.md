# 如何透過APRS API取得特定呼號最新位置並回傳至Line Notify

**請依照個人需求進行調整**

我最近買了AnyTone AT-868UV+ 無線電，剛好他具有APRS的功能(可以說是非主流的棒棒糖(一種年輕人喜歡互相追蹤行蹤的app)，所以我每天上下班都會把它固定在腰際，但很難隨時確認自己的位置是否已經回報上去因此透過這個小腳本，去取得aprs api 抓取最近10分鐘是否有更新，如果有就把一些資訊丟到Line Notify給我，當然也可以把友台的呼號一起寫進去，以方便確認友台是否在線上以方便進行QSO


## 必備要件

以下這些東西可能需要先準備好

> 
1.Cloudflare 帳號 (免費版)
2.APRS.fi 帳號及API key
3.Line Notify Token

還沒寫完[Editor.md](https://github.com/pandao/editor.md "Editor.md")，
