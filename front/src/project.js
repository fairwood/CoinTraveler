require=function t(e,o,n){function r(i,c){if(!o[i]){if(!e[i]){var l="function"==typeof require&&require;if(!c&&l)return l(i,!0);if(a)return a(i,!0);var s=new Error("Cannot find module '"+i+"'");throw s.code="MODULE_NOT_FOUND",s}var h=o[i]={exports:{}};e[i][0].call(h.exports,function(t){var o=e[i][1][t];return r(o||t)},h,h.exports,t,e,o,n)}return o[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)r(n[i]);return r}({BalanceFormatter:[function(t,e,o){"use strict";cc._RF.push(e,"b0386ICFmpJBqU/vG4m56VJ","BalanceFormatter"),Object.defineProperty(o,"__esModule",{value:!0});var n=cc._decorator,r=n.ccclass,a=(n.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.formatBTC=function(t){if(Math.abs(t)<1e-7)return"0";var e=Math.max(0,Math.floor(Math.log(t)/Math.LN10));return t.toFixed(Math.max(0,5-e))},e.formatNAS=function(t){var e=Math.max(0,Math.floor(Math.log(t)/Math.LN10));return t.toFixed(Math.min(4,Math.max(0,4-e)))},e.formatCNY=function(t){if(Math.abs(t)<.005)return"0";var e=Math.max(0,Math.floor(Math.log(t)/Math.LN10));return t.toFixed(Math.min(2,Math.max(0,4-e)))},e=__decorate([r],e)}(cc.Component));o.default=a,cc._RF.pop()},{}],CoreUI:[function(t,e,o){"use strict";cc._RF.push(e,"b184abFpf1KhoW4BSDEUo5j","CoreUI"),Object.defineProperty(o,"__esModule",{value:!0});var n=t("./MainCtrl"),r=t("./BalanceFormatter"),a=t("./MoneyLabel"),i=cc._decorator,c=i.ccclass,l=i.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.fiatBalance=0,e.btcBalance=0,e.t=0,e.isRunning=!1,e.interval=1,e.nextDayCountdown=1e8,e.currentSpeeder=0,e.speedMods=[1,5,20,100,500],e.speedersButton=[!1,!1,!1,!1,!1],e.speedersKeyboard=[!1,!1,!1,!1,!1],e.dayWidth=5,e.width=880,e.height=468,e.lblPrice=null,e.lblDate=null,e.grpNews=null,e.lblNews=null,e.lblFiatBalance=null,e.lblBtcBalance=null,e.lblTotalAsCNY=null,e.lblTotalAsBTC=null,e.graphics=null,e.lastOper=null,e.lblLastOper=null,e.highestLine=null,e.currentPriceLine=null,e.lblCurrentPrice=null,e.btnBuyAll=null,e.btnSellAll=null,e.lblSpeed=null,e.btnSpeeds=[],e.lastOperT=null,e.lastOperDir=null,e.lastOperPrice=null,e.newsOpacity=0,e}return __extends(e,t),o=e,e.prototype.onLoad=function(){var t=this;this.lblFiatBalance.formatterFunc=function(t){return r.default.formatCNY(t)+"CNY"},this.lblBtcBalance.formatterFunc=function(t){return r.default.formatBTC(t)+"BTC"};for(var e=function(e){var n=o.btnSpeeds[e];n.node.on(cc.Node.EventType.TOUCH_START,function(o){t.speedersButton[e]=!0,t.currentSpeeder=e}),n.node.on(cc.Node.EventType.TOUCH_END,function(o){t.speedersButton[e]=!1})},o=this,n=0;n<this.btnSpeeds.length;n++)e(n);cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,function(e){switch(e.keyCode){case cc.KEY.j:t.BuyAll();break;case cc.KEY.k:t.SellAll()}})},e.prototype.restart=function(){this.fiatBalance=100/o.USD2CNY,this.btcBalance=0,this.t=-1,this.nextDayCountdown=0,this.historicalHighestPrice=.1,this.graphics.moveTo(0,0),this.lastOper.active=!1,this.lastOperT=null,this.lastOperDir=null,this.lastOperPrice=null,this.highestLine.position=new cc.Vec2(0,0),this.currentSpeeder=0,n.MainCtrl.Instance.lastTradeHistory=[],this.isRunning=!0,this.refreshBalance()},e.prototype.BuyAll=function(){console.log("全仓买入");var t=n.MainCtrl.Instance.BTCHistory[this.t].close,e=Math.min(2e7-this.btcBalance,this.fiatBalance/t);this.fiatBalance<this.btcBalance*t*1e-5||(this.btcBalance+=e,this.fiatBalance-=e*t,this.lastOperT=this.t,this.lastOperDir=1,this.lastOperPrice=t,n.MainCtrl.Instance.lastTradeHistory.push([this.t,t,1,e]),this.refreshBalance())},e.prototype.SellAll=function(){console.log("全仓卖出");var t=n.MainCtrl.Instance.BTCHistory[this.t].close,e=this.btcBalance;e<this.fiatBalance/t*1e-5||(this.fiatBalance+=e*t,this.btcBalance-=e,this.lastOperT=this.t,this.lastOperDir=2,this.lastOperPrice=t,n.MainCtrl.Instance.lastTradeHistory.push([this.t,t,2,e]),this.refreshBalance())},e.prototype.update=function(t){var e=n.MainCtrl.Instance.BTCHistory;if(!(this.t>=e.length-1)){this.lblSpeed.string=(1*this.speedMods[this.currentSpeeder]/this.interval).toFixed();for(var a=0;a<this.btnSpeeds.length;a++){this.btnSpeeds[a].interactable=a!=this.currentSpeeder}for(this.nextDayCountdown-=1*t*this.speedMods[this.currentSpeeder];this.nextDayCountdown<=0&&this.t<e.length-1;){this.t++,this.nextDayCountdown+=this.interval;var i=e[this.t].close;i>this.historicalHighestPrice&&(this.historicalHighestPrice=i);var c=e[this.t].news;c&&c.length>0&&this.popupNews(c)}if(!(this.t<0)){var l=e[this.t].close;this.graphics.clear();var s=.96*this.height/this.historicalHighestPrice,h=Math.max(0,this.t-Math.round(this.width/this.dayWidth));this.graphics.moveTo(0,e[h].close*s);for(a=h+1;a<=this.t;a++)this.graphics.lineTo((a-h)*this.dayWidth,e[a].close*s);this.graphics.stroke(),this.lastOperDir?(this.lastOper.position=new cc.Vec2(Math.max(0,this.lastOperT-h)*this.dayWidth,this.lastOperPrice*s),this.lblLastOper.string=1==this.lastOperDir?"最近买入":"最近卖出",this.lastOper.active=!0):this.lastOper.active=!1,this.highestLine.position=new cc.Vec2(0,this.historicalHighestPrice*s),this.lblCurrentPrice.string="￥"+r.default.formatCNY(l*o.USD2CNY),this.currentPriceLine.position=new cc.Vec2(Math.min(this.width,this.t-h)*this.dayWidth,l*s),this.lblPrice.string="￥"+r.default.formatCNY(l*o.USD2CNY),this.lblDate.string=e[this.t].date;var d=this.fiatBalance/l+this.btcBalance;this.lblTotalAsCNY.string=r.default.formatCNY(d*l*o.USD2CNY),this.lblTotalAsBTC.string="="+r.default.formatBTC(d),this.isRunning&&this.t>=e.length-1&&(n.MainCtrl.Instance.lastScore=d,n.MainCtrl.Instance.lastPrice=l,console.log("End"),setTimeout(function(){n.MainCtrl.Instance.GotoResult()},1e3),this.isRunning=!1),this.btnBuyAll.interactable=this.isRunning&&this.fiatBalance>.01,this.btnSellAll.interactable=this.isRunning&&this.btcBalance>1e-5,this.newsOpacity=Math.max(0,this.newsOpacity-1*t),this.grpNews.opacity=255*Math.min(1,this.newsOpacity)}}},e.prototype.refreshBalance=function(){this.lblFiatBalance.setTargetNumber(Math.max(0,this.fiatBalance)*o.USD2CNY),this.lblBtcBalance.setTargetNumber(Math.max(0,this.btcBalance))},e.prototype.popupNews=function(t){this.lblNews.string=t,this.newsOpacity=4.5},e.USD2CNY=6.3,__decorate([l(cc.Label)],e.prototype,"lblPrice",void 0),__decorate([l(cc.Label)],e.prototype,"lblDate",void 0),__decorate([l(cc.Node)],e.prototype,"grpNews",void 0),__decorate([l(cc.Label)],e.prototype,"lblNews",void 0),__decorate([l(a.default)],e.prototype,"lblFiatBalance",void 0),__decorate([l(a.default)],e.prototype,"lblBtcBalance",void 0),__decorate([l(cc.Label)],e.prototype,"lblTotalAsCNY",void 0),__decorate([l(cc.Label)],e.prototype,"lblTotalAsBTC",void 0),__decorate([l(cc.Graphics)],e.prototype,"graphics",void 0),__decorate([l(cc.Node)],e.prototype,"lastOper",void 0),__decorate([l(cc.Label)],e.prototype,"lblLastOper",void 0),__decorate([l(cc.Node)],e.prototype,"highestLine",void 0),__decorate([l(cc.Node)],e.prototype,"currentPriceLine",void 0),__decorate([l(cc.Label)],e.prototype,"lblCurrentPrice",void 0),__decorate([l(cc.Button)],e.prototype,"btnBuyAll",void 0),__decorate([l(cc.Button)],e.prototype,"btnSellAll",void 0),__decorate([l(cc.Label)],e.prototype,"lblSpeed",void 0),__decorate([l([cc.Button])],e.prototype,"btnSpeeds",void 0),e=o=__decorate([c],e);var o}(cc.Component);o.CoreUI=s,cc._RF.pop()},{"./BalanceFormatter":"BalanceFormatter","./MainCtrl":"MainCtrl","./MoneyLabel":"MoneyLabel"}],Helloworld:[function(t,e,o){"use strict";cc._RF.push(e,"e1b90/rohdEk4SdmmEZANaD","Helloworld"),Object.defineProperty(o,"__esModule",{value:!0});var n=cc._decorator,r=n.ccclass,a=n.property,i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.label=null,e.text="hello",e}return __extends(e,t),e.prototype.start=function(){this.label.string=this.text},__decorate([a(cc.Label)],e.prototype,"label",void 0),__decorate([a],e.prototype,"text",void 0),e=__decorate([r],e)}(cc.Component);o.default=i,cc._RF.pop()},{}],HomeUI:[function(t,e,o){"use strict";cc._RF.push(e,"6b88eEl0rxJlafriia9L0dd","HomeUI"),Object.defineProperty(o,"__esModule",{value:!0});var n=t("./MainCtrl"),r=cc._decorator,a=r.ccclass,i=r.property,c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.btnDonate=null,e.btnInstallWallet=null,e}return __extends(e,t),e.prototype.onLoad=function(){},e.prototype.onEnable=function(){n.MainCtrl.Instance.checkWallet()},e.prototype.onInstallWalletBtnClick=function(){window.open("https://github.com/ChengOrangeJu/WebExtensionWallet")},e.prototype.update=function(){},e.prototype.onEnglishBtnClick=function(){window.open("https://fairwood.github.io/CoinTraveler/en/")},__decorate([i(cc.Button)],e.prototype,"btnDonate",void 0),__decorate([i(cc.Button)],e.prototype,"btnInstallWallet",void 0),e=__decorate([a],e)}(cc.Component);o.default=c,cc._RF.pop()},{"./MainCtrl":"MainCtrl"}],Leaderboard:[function(t,e,o){"use strict";cc._RF.push(e,"8c6944j/7xE5Zvme1I3sc/D","Leaderboard"),Object.defineProperty(o,"__esModule",{value:!0});var n=t("./BalanceFormatter"),r=t("./MainCtrl"),a=cc._decorator,i=a.ccclass,c=a.property,l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.template=null,e.container=null,e.elements=[],e.tab="score",e}return __extends(e,t),o=e,e.prototype.onLoad=function(){this.setAndRefreshElement("*",this.template,null);for(var t=0;t<o.ElementCount;t++){var e=cc.instantiate(this.template);this.elements[t]=e,e.parent=this.container,e.name=t.toFixed(),this.setAndRefreshElement(t+1,e,null)}},e.prototype.onEnable=function(){try{this.fetchData(),this.switchTab(null,"score")}catch(t){console.error(t)}},e.prototype.fetchData=function(){var t=this;if(Neb){var e=new Neb;e.setRequest(new HttpRequest(r.MainCtrl.BlockchainUrl));var n=r.MainCtrl.Instance.wallet_address?r.MainCtrl.Instance.wallet_address:Account.NewAccount().getAddressString();console.log("from:"+n);var a="1000000",i="2000000",c={function:"get_score_rankboard",args:"[]"};e.api.call(n,r.ContractAddress,"0","0",a,i,c).then(function(e){console.log("get_score_rankboard",e),o.scoreBoard=JSON.parse(e.result).result_data,t.switchTab(null,t.tab)}).catch(function(t){console.log("error:"+t.message)});c={function:"get_donation_rankboard",args:"[]"};e.api.call(n,r.ContractAddress,"0","0",a,i,c).then(function(e){console.log("get_donation_rankboard",e),o.donationBoard=JSON.parse(e.result).result_data,t.switchTab(null,t.tab)}).catch(function(t){console.log("error:"+t.message)});c={function:"get_player_info",args:"[]"};e.api.call(n,r.ContractAddress,"0","0",a,i,c).then(function(e){console.log("get_player_info",e),t.setAndRefreshElement("*",t.template,JSON.parse(e.result).result_data)}).catch(function(t){console.log("error:"+t.message)})}},e.prototype.setAndRefreshElement=function(t,e,o){o?(e.getChildByName("LblRank").getComponent(cc.Label).string=t.toString(),e.getChildByName("LblAddress").getComponent(cc.Label).string=o.address,e.getChildByName("LblScore").getComponent(cc.Label).string=n.default.formatBTC(o.score),e.getChildByName("LblDonation").getComponent(cc.Label).string=n.default.formatNAS(Number(o.donation)/1e18),e.getChildByName("LblComment").getComponent(cc.Label).string=o.comment):(e.getChildByName("LblRank").getComponent(cc.Label).string=t.toString(),e.getChildByName("LblAddress").getComponent(cc.Label).string="",e.getChildByName("LblScore").getComponent(cc.Label).string="",e.getChildByName("LblDonation").getComponent(cc.Label).string="",e.getChildByName("LblComment").getComponent(cc.Label).string="")},e.prototype.switchTab=function(t,e){switch(e){case"score":console.log("tab",e);for(var n=0;n<this.elements.length;n++){var r=this.elements[n];this.setAndRefreshElement(n,r,n<o.scoreBoard.length?o.scoreBoard[n]:null)}break;case"donation":for(n=0;n<this.elements.length;n++){r=this.elements[n];this.setAndRefreshElement(n,r,n<o.donationBoard.length?o.donationBoard[n]:null)}}},e.ElementCount=20,e.scoreBoard=[{address:"正在获取数据，请稍候……",score:0,donation:0,comment:""}],e.donationBoard=[{address:"正在获取数据，请稍候……",score:0,donation:0,comment:""}],__decorate([c(cc.Node)],e.prototype,"template",void 0),__decorate([c(cc.Node)],e.prototype,"container",void 0),e=o=__decorate([i],e);var o}(cc.Component);o.default=l,cc._RF.pop()},{"./BalanceFormatter":"BalanceFormatter","./MainCtrl":"MainCtrl"}],MainCtrl:[function(t,e,o){"use strict";cc._RF.push(e,"e4b263diNNBEoO04d4lNHHp","MainCtrl"),Object.defineProperty(o,"__esModule",{value:!0});var n=t("./CoreUI"),r=cc._decorator,a=r.ccclass,i=r.property;o.ContractAddress="n1vMo7fEcQ18gLDAq8GutcgoyXUyEGDFtQm",o.EncKey=37234;var c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.BTCHistory=null,e.lastScore=0,e.lastPrice=0,e.lastTradeHistory=[],e.UIContainer=null,e.HomeUI=null,e.CoreUI=null,e.ResultUI=null,e.LeaderboardUI=null,e.UploadUI=null,e}return __extends(e,t),o=e,e.prototype.onLoad=function(){o.Instance=this,document.title="NAS|币圈穿越记",o.BlockchainUrl="https://mainnet.nebulas.io",console.log("BlockchainUrl",o.BlockchainUrl),cc.loader.loadRes("BTC",function(t,e){console.log("BTCHistory loaded"),this.BTCHistory=e,this.fetchLatestData()}.bind(this))},e.prototype.start=function(){this.UIContainer.children.forEach(function(t){t.active=!1}),this.HomeUI.active=!0;var t=this.node.getChildByName("AudioSource").getComponent(cc.AudioSource);setTimeout(function(){t.play()},1e3)},e.prototype.checkWallet=function(){try{var t=this,e=new Neb;e.setRequest(new HttpRequest(o.BlockchainUrl)),e.api.getNebState().then(function(e){t.nebState=e,window.addEventListener("message",t.getMessage),window.postMessage({target:"contentscript",data:{},method:"getAccount"},"*")})}catch(t){console.error(t)}},e.prototype.getMessage=function(t){if(t.data&&t.data.data&&t.data.data.account){var e=t.data.data.account;o.Instance.wallet_address=e}},e.prototype.OnBtnStartClick=function(){this.UIContainer.children.forEach(function(t){t.active=!1}),this.CoreUI.active=!0,this.CoreUI.getComponent(n.CoreUI).restart()},e.prototype.GotoResult=function(){this.UIContainer.children.forEach(function(t){t.active=!1}),this.ResultUI.active=!0},e.prototype.GotoLeaderboard=function(){this.UIContainer.children.forEach(function(t){t.active=!1}),this.LeaderboardUI.active=!0},e.prototype.GotoDonate=function(){this.lastScore=0,this.UIContainer.children.forEach(function(t){t.active=!1}),this.UploadUI.active=!0},e.prototype.GotoUpload=function(){this.UIContainer.children.forEach(function(t){t.active=!1}),this.UploadUI.active=!0},e.prototype.GotoHome=function(){this.UIContainer.children.forEach(function(t){t.active=!1}),this.HomeUI.active=!0},e.prototype.fetchLatestData=function(){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==t.readyState&&t.status>=200&&t.status<400){var e=JSON.parse(t.responseText);console.log("fetchLatestData",e);for(var n=e.Data,r=0;r<n.length;r++){var a=new Date(1e3*n[r].time),i=a.getUTCFullYear()+"/"+(a.getUTCMonth()+1)+"/"+a.getUTCDate();o.Instance.BTCHistory.push({date:i,close:n[r].close})}}};var e=o.Instance.BTCHistory,n=new Date,r=new Date(e[e.length-1].date),a=((n-r)/864e5-1).toFixed();console.log(Number(r),"md",a),t.open("GET","https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit="+a+"&aggregate=1&e=CCCAGG",!0),t.send()},__decorate([i(cc.Node)],e.prototype,"UIContainer",void 0),__decorate([i(cc.Node)],e.prototype,"HomeUI",void 0),__decorate([i(cc.Node)],e.prototype,"CoreUI",void 0),__decorate([i(cc.Node)],e.prototype,"ResultUI",void 0),__decorate([i(cc.Node)],e.prototype,"LeaderboardUI",void 0),__decorate([i(cc.Node)],e.prototype,"UploadUI",void 0),e=o=__decorate([a],e);var o}(cc.Component);o.MainCtrl=c,cc._RF.pop()},{"./CoreUI":"CoreUI"}],MoneyLabel:[function(t,e,o){"use strict";cc._RF.push(e,"2afa2+9w3RB3LyF+/jl2t/+","MoneyLabel"),Object.defineProperty(o,"__esModule",{value:!0});var n=cc._decorator,r=n.ccclass,a=n.property,i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.label=null,e.transitionTime=.3,e.startNumber=0,e.targetNumber=0,e.currentNumber=0,e.countdown=e.transitionTime,e}return __extends(e,t),e.prototype.setTargetNumber=function(t){this.startNumber=this.targetNumber,this.targetNumber=t,this.countdown=this.transitionTime},e.prototype.update=function(t){if(this.countdown>0){this.countdown-=t,this.countdown>0?this.currentNumber=this.startNumber*this.countdown/this.transitionTime+this.targetNumber*(1-this.countdown/this.transitionTime):this.currentNumber=this.targetNumber;var e=this.formatterFunc?this.formatterFunc(this.currentNumber):this.currentNumber.toString();this.label&&(this.label.string=e)}},__decorate([a(cc.Label)],e.prototype,"label",void 0),e=__decorate([r],e)}(cc.Component);o.default=i,cc._RF.pop()},{}],ResultUI:[function(t,e,o){"use strict";cc._RF.push(e,"821deNcGNFGUrcGhvxyRLk4","ResultUI"),Object.defineProperty(o,"__esModule",{value:!0});var n=t("./MainCtrl"),r=t("./BalanceFormatter"),a=t("./CoreUI"),i=cc._decorator,c=i.ccclass,l=i.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.lblTotalBTC=null,e.lblTotalCNY=null,e.lblTitle=null,e.tradeTemplate=null,e.tradeContainer=null,e.trades=[],e.intervals=[.25,2,2,2,2,2,2,2,2],e}return __extends(e,t),e.prototype.onEnable=function(){var t=n.MainCtrl.Instance.lastScore;this.lblTotalBTC.string=r.default.formatBTC(t),this.lblTotalCNY.string="=￥"+r.default.formatCNY(t*n.MainCtrl.Instance.lastPrice*a.CoreUI.USD2CNY);for(var e=this.node.children,o=0,i=0;i<e.length;i++){var c=e[i];c.opacity=0,o+=i<this.intervals.length?this.intervals[i]:0;var l=cc.sequence(cc.delayTime(o),cc.fadeIn(.5));c.runAction(l)}var s=n.MainCtrl.Instance.lastTradeHistory,h=n.MainCtrl.Instance.BTCHistory;this.lblTitle.string=this.calcTitle(t,h[h.length-1].close,s);s.length>20&&s.splice(5,s.length-20,"......(省略"+(s.length-20)+"条记录)");for(i=0;i<s.length;i++){var d=s[i],p=cc.instantiate(this.tradeTemplate);p.parent=this.tradeContainer,"string"!=typeof d?(p.getChildByName("LblDate").getComponent(cc.Label).string=h[d[0]].date,p.getChildByName("LblPrice").getComponent(cc.Label).string="￥"+r.default.formatCNY(d[1]*a.CoreUI.USD2CNY),p.getChildByName("LblDirection").getComponent(cc.Label).string=1==d[2]?"买":"卖",p.getChildByName("LblAmount").getComponent(cc.Label).string=r.default.formatBTC(d[3])+"BTC"):(p.getChildByName("LblDate").getComponent(cc.Label).string=d,p.getChildByName("LblPrice").getComponent(cc.Label).string="",p.getChildByName("LblDirection").getComponent(cc.Label).string="",p.getChildByName("LblAmount").getComponent(cc.Label).string=""),p.active=!0}this.tradeTemplate.active=!1,n.MainCtrl.Instance.checkWallet()},e.prototype.calcTitle=function(t,e,o){o[o.length-1];return 0==o.length?"时间线守护者":this.isTakongDog(t,e,o)?"踏空狗":t*e*a.CoreUI.USD2CNY<100?"归零膏":.7*o[0][3]>t&&o.length<15?"追涨杀跌的韭菜":.7*o[0][3]>t&&o.length>=15?"神操作韭菜":o.length<4&&t>200?"价值投资者":1==o.length&&t>10?"比特币信徒":0==o.length?"被时代抛弃的人":this.isBuoduanPrince(t,e,o)?"波段小王子":this.isGouzhuang(t,e,o)?"狗庄":o[0][0]>1e3?"后知后觉者":t>=1e7?"神":t>=1e6?"中本次郎":t>=1e5?"先知":t>=1e4?"神级操盘手":t>1.1*o[0][3]?"操盘手":t>=10?"高级韭菜":"韭菜"},e.prototype.isTakongDog=function(t,e,o){if(t<300&&o.length<8)for(var n=1;n<o.length;n++){var r=o[n],a=o[n-1];if(2==a[2]&&1==r[2]&&5*a[1]<=r[1])return!0}},e.prototype.isBuoduanPrince=function(t,e,o){for(var n,r=1;r<o.length;r++){var a=o[r],i=o[r-1];1==i[2]&&2==a[2]&&i[1]<a[1]?n++:2==i[2]&&1==a[2]&&i[1]>a[1]?n++:0}return n>=.8*(o.length-1)},e.prototype.isGouzhuang=function(t,e,o){var n,r;if(t>1e3){for(var a=1;a<o.length;a++){var i=o[a],c=o[a-1];1==c[2]&&2==i[2]&&(c[1]<i[1]&&i[0]-c[0]<100?n++:r++)}if(n>.7*(n+r))return!0}return!1},__decorate([l(cc.Label)],e.prototype,"lblTotalBTC",void 0),__decorate([l(cc.Label)],e.prototype,"lblTotalCNY",void 0),__decorate([l(cc.Label)],e.prototype,"lblTitle",void 0),__decorate([l(cc.Node)],e.prototype,"tradeTemplate",void 0),__decorate([l(cc.Node)],e.prototype,"tradeContainer",void 0),e=__decorate([c],e)}(cc.Component);o.default=s,cc._RF.pop()},{"./BalanceFormatter":"BalanceFormatter","./CoreUI":"CoreUI","./MainCtrl":"MainCtrl"}],UploadUI:[function(t,e,o){"use strict";cc._RF.push(e,"7f006caj/dGN5O0ODkhK1Hx","UploadUI"),Object.defineProperty(o,"__esModule",{value:!0});var n=t("./MainCtrl"),r=t("./BalanceFormatter"),a=cc._decorator,i=a.ccclass,c=a.property,l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.lblTotalBTC=null,e.edtComment=null,e.edtDonate=null,e.grpWithScore=null,e.grpNoScore=null,e.lblSend=null,e}return __extends(e,t),o=e,e.prototype.onEnable=function(){var t=n.MainCtrl.Instance.lastScore;t?(this.lblTotalBTC.string=r.default.formatBTC(t),this.grpWithScore.active=!0,this.grpNoScore.active=!1,this.lblSend.string="上传到时间机器"):(this.grpWithScore.active=!1,this.grpNoScore.active=!0,this.lblSend.string="发送捐赠")},e.prototype.onBackBtnClick=function(){n.MainCtrl.Instance.lastScore>1e-8?n.MainCtrl.Instance.GotoResult():n.MainCtrl.Instance.GotoHome()},e.prototype.onUploadBtnClick=function(){if(window.webExtensionWallet)try{var t=n.MainCtrl.Instance.lastScore,e=parseFloat(this.edtDonate.string),r=this.edtComment.string,a=[];n.MainCtrl.Instance.lastTradeHistory.forEach(function(t){a.push(10*t[0]+t[2])});var i=new NebPay,c=n.MainCtrl.BlockchainUrl,l=n.ContractAddress,s=e,h=o.encrypto(t.toString(),n.EncKey,25);console.log("调用钱包",t,e,r,a,h);var d='["'+h+'","'+r+'",['+a.toString()+"]]";i.call(l,s,"submit",d,{qrcode:{showQRCode:!1},goods:{name:"test",desc:"test goods"},callback:c,listener:this.listener})}catch(t){console.error(t)}else window.open("https://github.com/ChengOrangeJu/WebExtensionWallet")},e.prototype.listener=function(t){console.log("submit resp: ",t),"Error"!=t.toString().substr(0,5)&&n.MainCtrl.Instance.GotoHome()},e.encrypto=function(t,e,o){if("string"==typeof t&&"number"==typeof e&&"number"==typeof o){var n=[];o=o<=25?o:o%25;for(var r=0;r<t.length;r++){var a=t.charCodeAt(r);a=(a=1*a^e).toString(o),n.push(a)}var i=String.fromCharCode(o+97);return n.join(i)}},__decorate([c(cc.Label)],e.prototype,"lblTotalBTC",void 0),__decorate([c(cc.EditBox)],e.prototype,"edtComment",void 0),__decorate([c(cc.EditBox)],e.prototype,"edtDonate",void 0),__decorate([c(cc.Node)],e.prototype,"grpWithScore",void 0),__decorate([c(cc.Node)],e.prototype,"grpNoScore",void 0),__decorate([c(cc.Label)],e.prototype,"lblSend",void 0),e=o=__decorate([i],e);var o}(cc.Component);o.default=l,cc._RF.pop()},{"./BalanceFormatter":"BalanceFormatter","./MainCtrl":"MainCtrl"}]},{},["BalanceFormatter","CoreUI","Helloworld","HomeUI","Leaderboard","MainCtrl","MoneyLabel","ResultUI","UploadUI"]);