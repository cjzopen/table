# table

based on bootstrap 4.1

* [DateBox](http://dev.jtsage.com/DateBox/) 

## 彈跳視窗

test.html 是彈跳視窗的內容

    <a href="#" class="popout" data-urlpath="{檔案路徑}">

## table

* .table-cover 包住的 .table 會產生 pagination
* 有 .w-100 的 .table 小視窗不會變身
* .table-cover 裡面的 header>span 會覆寫個數

## DateBox

只有兩種：
* flipbox
* timeflipbox

      <input type="text" class="form-control" id="" data-role="datebox" data-options="{&quot;mode&quot;:&quot;flipbox&quot;,&quot;useLang&quot;:&quot;zh-TW&quot;}" readonly="readonly" placeholder="日期">

       <input type="text" class="form-control" id="" data-role="datebox" data-options="{&quot;mode&quot;:&quot;timeflipbox&quot;,&quot;useLang&quot;:&quot;zh-TW&quot;}" readonly="readonly" placeholder="時間">


## radio

    <label class="radio mr-3">需要
      <input type="radio" name="身障協助">
      <span class="circle"></span>
    </label>
    <label class="radio">不需要
      <input type="radio" name="身障協助">
      <span class="circle"></span>
    </label>
