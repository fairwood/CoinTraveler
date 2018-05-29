require=function t(e,o,a){function n(c,l){if(!o[c]){if(!e[c]){var i="function"==typeof require&&require;if(!l&&i)return i(c,!0);if(r)return r(c,!0);var s=new Error("Cannot find module '"+c+"'");throw s.code="MODULE_NOT_FOUND",s}var d=o[c]={exports:{}};e[c][0].call(d.exports,function(t){var o=e[c][1][t];return n(o||t)},d,d.exports,t,e,o,a)}return o[c].exports}for(var r="function"==typeof require&&require,c=0;c<a.length;c++)n(a[c]);return n}({BalanceFormatter:[function(t,e,o){"use strict";cc._RF.push(e,"b0386ICFmpJBqU/vG4m56VJ","BalanceFormatter"),Object.defineProperty(o,"__esModule",{value:!0});var a=cc._decorator,n=a.ccclass,r=(a.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.formatBTC=function(t){var e=Math.max(0,Math.floor(Math.log(t)/Math.LN10));return t.toFixed(Math.max(0,8-e))},e.formatNAS=function(t){var e=Math.max(0,Math.floor(Math.log(t)/Math.LN10));return t.toFixed(Math.min(4,Math.max(0,4-e)))},e.formatCNY=function(t){var e=Math.max(0,Math.floor(Math.log(t)/Math.LN10));return t.toFixed(Math.min(2,Math.max(0,8-e)))},e=__decorate([n],e)}(cc.Component));o.default=r,cc._RF.pop()},{}],Core:[function(t,e,o){"use strict";cc._RF.push(e,"83f84Pc5Y5I4qWaG8Dz/vlO","Core"),Object.defineProperty(o,"__esModule",{value:!0});var a=t("./MainCtrl"),n=t("./BalanceFormatter"),r=cc._decorator,c=r.ccclass,l=r.property,i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.fiatBalance=0,e.btcBalance=0,e.t=0,e.interval=1,e.nextDayCountdown=1e8,e.speedMods=[0,5,20,100],e.speedersButton=[!1,!1,!1,!1],e.speedersKeyboard=[!1,!1,!1,!1],e.dayWidth=3,e.width=450,e.height=345,e.lblPrice=null,e.lblDate=null,e.lblFiatBalance=null,e.lblBtcBalance=null,e.lblTotal=null,e.graphics=null,e.lastOper=null,e.lblLastOper=null,e.highestLine=null,e.lblSpeed=null,e.btnSpeeds=[],e.lastOperDir=null,e.lastOperPrice=null,e}return __extends(e,t),o=e,e.prototype.onLoad=function(){for(var t=this,e=function(e){var a=o.btnSpeeds[e];a.node.on(cc.Node.EventType.TOUCH_START,function(o){t.speedersButton[e]=!0}),a.node.on(cc.Node.EventType.TOUCH_END,function(o){t.speedersButton[e]=!1}),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,function(e){switch(console.log("keyCode",e.keyCode),e.keyCode){case cc.KEY[1]:t.speedersKeyboard[0]=!0;break;case cc.KEY[2]:t.speedersKeyboard[1]=!0;break;case cc.KEY[3]:t.speedersKeyboard[2]=!0;break;case cc.KEY[4]:t.speedersKeyboard[3]=!0}}),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,function(e){switch(e.keyCode){case cc.KEY[1]:t.speedersKeyboard[0]=!1;break;case cc.KEY[2]:t.speedersKeyboard[1]=!1;break;case cc.KEY[3]:t.speedersKeyboard[2]=!1;break;case cc.KEY[4]:t.speedersKeyboard[3]=!1}})},o=this,a=0;a<this.btnSpeeds.length;a++)e(a);cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,function(e){switch(e.keyCode){case cc.KEY.j:t.BuyAll();break;case cc.KEY.k:t.SellAll()}})},e.prototype.BuyAll=function(){console.log("全仓买入");var t=a.MainCtrl.Instance.BTCHistory[this.t].close,e=Math.min(2e7-this.btcBalance,this.fiatBalance/t);this.btcBalance+=e,this.fiatBalance-=e*t,this.lastOperDir=1,this.lastOperPrice=t},e.prototype.SellAll=function(){console.log("全仓卖出");var t=a.MainCtrl.Instance.BTCHistory[this.t].close,e=this.btcBalance;this.fiatBalance+=e*t,this.btcBalance-=e,this.lastOperDir=2,this.lastOperPrice=t},e.prototype.restart=function(){this.fiatBalance=100/o.USD2CNY,this.btcBalance=0,this.t=0,this.nextDayCountdown=0,this.historicalHighestPrice=0,this.graphics.moveTo(0,0),this.lastOper.active=!1,this.lastOperDir=null,this.lastOperPrice=null,this.highestLine.position=new cc.Vec2(0,0)},e.prototype.update=function(t){var e=a.MainCtrl.Instance.BTCHistory;if(!(this.t>=e.length-1)){for(var r=1,c=0;c<this.speedersButton.length;c++)(this.speedersButton[c]||this.speedersKeyboard[c])&&(r*=this.speedMods[c]);for(this.lblSpeed.string=(r/this.interval).toFixed()+"天/s",this.nextDayCountdown-=t*r;this.nextDayCountdown<=0&&this.t<e.length-1;){this.t++,this.nextDayCountdown+=this.interval;var l=e[this.t].close;l>this.historicalHighestPrice&&(this.historicalHighestPrice=l)}this.graphics.clear(),this.graphics.moveTo(0,0),this.graphics.lineTo(this.width,0);var i=.96*this.height/this.historicalHighestPrice,s=Math.max(0,this.t-this.width/this.dayWidth);this.graphics.moveTo(0,e[s].close*i);for(c=s+1;c<=this.t;c++)this.graphics.lineTo((c-s)*this.dayWidth,e[c].close*i);this.graphics.stroke(),this.lastOperDir?(this.lastOper.position=new cc.Vec2(0,this.lastOperPrice*i),this.lblLastOper.string=1==this.lastOperDir?"最近买入":"最近卖出",this.lastOper.active=!0):this.lastOper.active=!1,this.highestLine.position=new cc.Vec2(0,this.historicalHighestPrice*i);var d=e[this.t].close;this.lblPrice.string="￥"+n.default.formatCNY(d*o.USD2CNY),this.lblDate.string=e[this.t].date,this.lblFiatBalance.string=n.default.formatCNY(this.fiatBalance*o.USD2CNY)+"CNY",this.lblBtcBalance.string=n.default.formatBTC(this.btcBalance)+"BTC";var p=this.fiatBalance/d+this.btcBalance;this.lblTotal.string=n.default.formatCNY(p*d*o.USD2CNY)+"CNY = "+n.default.formatBTC(p)+"BTC",this.t>=e.length-1&&(a.MainCtrl.Instance.lastScore=p,a.MainCtrl.Instance.lastPrice=d,console.log("End"),setTimeout(function(){a.MainCtrl.Instance.GotoResult()},1e3))}},e.USD2CNY=6.3,__decorate([l(cc.Label)],e.prototype,"lblPrice",void 0),__decorate([l(cc.Label)],e.prototype,"lblDate",void 0),__decorate([l(cc.Label)],e.prototype,"lblFiatBalance",void 0),__decorate([l(cc.Label)],e.prototype,"lblBtcBalance",void 0),__decorate([l(cc.Label)],e.prototype,"lblTotal",void 0),__decorate([l(cc.Graphics)],e.prototype,"graphics",void 0),__decorate([l(cc.Node)],e.prototype,"lastOper",void 0),__decorate([l(cc.Label)],e.prototype,"lblLastOper",void 0),__decorate([l(cc.Node)],e.prototype,"highestLine",void 0),__decorate([l(cc.Label)],e.prototype,"lblSpeed",void 0),__decorate([l([cc.Button])],e.prototype,"btnSpeeds",void 0),e=o=__decorate([c],e);var o}(cc.Component);o.Core=i,cc._RF.pop()},{"./BalanceFormatter":"BalanceFormatter","./MainCtrl":"MainCtrl"}],Helloworld:[function(t,e,o){"use strict";cc._RF.push(e,"e1b90/rohdEk4SdmmEZANaD","Helloworld"),Object.defineProperty(o,"__esModule",{value:!0});var a=cc._decorator,n=a.ccclass,r=a.property,c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.label=null,e.text="hello",e}return __extends(e,t),e.prototype.start=function(){this.label.string=this.text},__decorate([r(cc.Label)],e.prototype,"label",void 0),__decorate([r],e.prototype,"text",void 0),e=__decorate([n],e)}(cc.Component);o.default=c,cc._RF.pop()},{}],HomeUI:[function(t,e,o){"use strict";cc._RF.push(e,"6b88eEl0rxJlafriia9L0dd","HomeUI"),Object.defineProperty(o,"__esModule",{value:!0});var a=cc._decorator,n=a.ccclass,r=a.property,c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.btnDonate=null,e.btnInstallWallet=null,e}return __extends(e,t),e.prototype.onLoad=function(){this.btnDonate.node.active=!1,this.btnInstallWallet.node.active=!0},e.prototype.onInstallWalletBtnClick=function(){window.open("https://github.com/ChengOrangeJu/WebExtensionWallet")},e.prototype.update=function(){window.webExtensionWallet?(this.btnDonate.node.active=!0,this.btnInstallWallet.node.active=!1):(this.btnDonate.node.active=!1,this.btnInstallWallet.node.active=!0)},e.firstTime=!0,__decorate([r(cc.Button)],e.prototype,"btnDonate",void 0),__decorate([r(cc.Button)],e.prototype,"btnInstallWallet",void 0),e=__decorate([n],e)}(cc.Component);o.default=c,cc._RF.pop()},{}],Leaderboard:[function(t,e,o){"use strict";cc._RF.push(e,"8c6944j/7xE5Zvme1I3sc/D","Leaderboard"),Object.defineProperty(o,"__esModule",{value:!0});var a=t("./BalanceFormatter"),n=t("./MainCtrl"),r=cc._decorator,c=r.ccclass,l=r.property,i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.template=null,e.container=null,e.elements=[],e.tab="score",e}return __extends(e,t),o=e,e.prototype.onLoad=function(){for(var t=0;t<o.ElementCount;t++){var e=cc.instantiate(this.template);this.elements[t]=e,e.parent=this.container,e.name=t.toFixed(),this.setAndRefreshElement(t,e,null)}},e.prototype.onEnable=function(){this.fetchData()},e.prototype.fetchData=function(){var t=this;if(Neb){var e=new Neb;e.setRequest(new HttpRequest("https://testnet.nebulas.io"));var a=n.MainCtrl.Instance.wallet_address?n.MainCtrl.Instance.wallet_address:Account.NewAccount().getAddressString();console.log("from:"+a);var r="1000000",c="2000000",l={function:"get_score_rankboard",args:"[]"};e.api.call(a,n.ContractAddress,"0","0",r,c,l).then(function(e){console.log("get_score_rankboard",e),o.scoreBoard=JSON.parse(e.result).result_data,t.switchTab(null,"score")}).catch(function(t){console.log("error:"+t.message)});l={function:"get_donation_rankboard",args:"[]"};e.api.call(a,n.ContractAddress,"0","0",r,c,l).then(function(e){console.log("get_donation_rankboard",e),o.donationBoard=JSON.parse(e.result).result_data,t.switchTab(null,"donation")}).catch(function(t){console.log("error:"+t.message)});l={function:"get_player_info",args:"[]"};e.api.call(a,n.ContractAddress,"0","0",r,c,l).then(function(e){console.log("get_player_info",e),t.setAndRefreshElement("*",t.template,JSON.parse(e.result).result_data)}).catch(function(t){console.log("error:"+t.message)})}},e.prototype.setAndRefreshElement=function(t,e,o){o?(e.getChildByName("LblAddress").getComponent(cc.Label).string=t+"  "+o.address,e.getChildByName("LblScore").getComponent(cc.Label).string="分数"+a.default.formatBTC(o.score)+"BTC",e.getChildByName("LblDonation").getComponent(cc.Label).string="捐赠"+a.default.formatNAS(Number(o.donation)/1e18)+"NAS",e.getChildByName("LblComment").getComponent(cc.Label).string=o.comment):(e.getChildByName("LblAddress").getComponent(cc.Label).string=t.toString(),e.getChildByName("LblScore").getComponent(cc.Label).string="",e.getChildByName("LblDonation").getComponent(cc.Label).string="",e.getChildByName("LblComment").getComponent(cc.Label).string="")},e.prototype.switchTab=function(t,e){switch(e){case"score":console.log("tab",e);for(var a=0;a<this.elements.length;a++){var n=this.elements[a];this.setAndRefreshElement(a,n,a<o.scoreBoard.length?o.scoreBoard[a]:null)}break;case"donation":for(a=0;a<this.elements.length;a++){n=this.elements[a];this.setAndRefreshElement(a,n,a<o.donationBoard.length?o.donationBoard[a]:null)}}},e.ElementCount=20,__decorate([l(cc.Node)],e.prototype,"template",void 0),__decorate([l(cc.Node)],e.prototype,"container",void 0),e=o=__decorate([c],e);var o}(cc.Component);o.default=i,cc._RF.pop()},{"./BalanceFormatter":"BalanceFormatter","./MainCtrl":"MainCtrl"}],MainCtrl:[function(t,e,o){"use strict";cc._RF.push(e,"e4b263diNNBEoO04d4lNHHp","MainCtrl"),Object.defineProperty(o,"__esModule",{value:!0});var a=t("./Core"),n=cc._decorator,r=n.ccclass,c=n.property;o.ContractAddress="n1xoB2s1S7L7dUU2fniVuchUuFJduKhUYj4";var l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.BTCData=null,e.spriteFrame=null,e.BTCHistory=null,e.lastScore=0,e.lastPrice=0,e.HomeUI=null,e.CoreUI=null,e.ResultUI=null,e.LeaderboardUI=null,e.UploadUI=null,e}return __extends(e,t),o=e,e.prototype.onLoad=function(){o.Instance=this,document.title="NAS|币圈穿越记",cc.loader.loadRes("BTC",function(t,e){console.log("BTCHistory loaded",typeof e,e),this.BTCHistory=e,this.fetchLatestData()}.bind(this))},e.prototype.start=function(){this.node.children.forEach(function(t){t.active=!1}),this.HomeUI.active=!0;var t=this,e=new Neb;e.setRequest(new HttpRequest("https://testnet.nebulas.io")),e.api.getNebState().then(function(e){t.nebState=e,window.addEventListener("message",t.getMessage),window.postMessage({target:"contentscript",data:{},method:"getAccount"},"*")})},e.prototype.update=function(){},e.prototype.getMessage=function(t){if(t.data&&t.data.data&&(console.log("e.data.data:",t.data.data),t.data.data.account)){var e=t.data.data.account;o.Instance.wallet_address=e,console.log("address="+e)}},e.prototype.OnBtnStartClick=function(){this.node.children.forEach(function(t){t.active=!1}),this.CoreUI.active=!0,this.CoreUI.getComponent(a.Core).restart()},e.prototype.GotoResult=function(){this.node.children.forEach(function(t){t.active=!1}),this.ResultUI.active=!0},e.prototype.GotoLeaderboard=function(){this.node.children.forEach(function(t){t.active=!1}),this.LeaderboardUI.active=!0},e.prototype.GotoDonate=function(){this.lastScore=0,this.node.children.forEach(function(t){t.active=!1}),this.UploadUI.active=!0},e.prototype.GotoUpload=function(){this.node.children.forEach(function(t){t.active=!1}),this.UploadUI.active=!0},e.prototype.GotoHome=function(){this.node.children.forEach(function(t){t.active=!1}),this.HomeUI.active=!0},e.prototype.fetchLatestData=function(){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==t.readyState&&t.status>=200&&t.status<400){var e=t.responseText;console.log(e)}};var e=o.Instance.BTCHistory,a=new Date,n=new Date(e[e.length-1].date),r=((a-n)/864e5).toFixed();console.log(Number(n),"md",r),t.open("GET","https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit="+r+"&aggregate=1&e=CCCAGG",!0),t.send()},__decorate([c(cc.TextAsset)],e.prototype,"BTCData",void 0),__decorate([c(cc.SpriteFrame)],e.prototype,"spriteFrame",void 0),__decorate([c(cc.Node)],e.prototype,"HomeUI",void 0),__decorate([c(cc.Node)],e.prototype,"CoreUI",void 0),__decorate([c(cc.Node)],e.prototype,"ResultUI",void 0),__decorate([c(cc.Node)],e.prototype,"LeaderboardUI",void 0),__decorate([c(cc.Node)],e.prototype,"UploadUI",void 0),e=o=__decorate([r],e);var o}(cc.Component);o.MainCtrl=l,cc._RF.pop()},{"./Core":"Core"}],ResultUI:[function(t,e,o){"use strict";cc._RF.push(e,"821deNcGNFGUrcGhvxyRLk4","ResultUI"),Object.defineProperty(o,"__esModule",{value:!0});var a=t("./MainCtrl"),n=t("./Core"),r=t("./BalanceFormatter"),c=cc._decorator,l=c.ccclass,i=c.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.lblTotalBTC=null,e.lblTotalCNY=null,e.intervals=[1,2,2,4,3],e}return __extends(e,t),e.prototype.start=function(){var t=a.MainCtrl.Instance.lastScore;this.lblTotalBTC.string=r.default.formatBTC(t)+"BTC",this.lblTotalCNY.string="=￥"+r.default.formatCNY(t*a.MainCtrl.Instance.lastPrice*n.Core.USD2CNY);for(var e=this.node.children,o=0,c=0;c<e.length;c++){var l=e[c];l.opacity=0,o+=c<this.intervals.length?this.intervals[c]:0;var i=cc.sequence(cc.delayTime(o),cc.fadeIn(.5));l.runAction(i)}},__decorate([i(cc.Label)],e.prototype,"lblTotalBTC",void 0),__decorate([i(cc.Label)],e.prototype,"lblTotalCNY",void 0),e=__decorate([l],e)}(cc.Component);o.default=s,cc._RF.pop()},{"./BalanceFormatter":"BalanceFormatter","./Core":"Core","./MainCtrl":"MainCtrl"}],UploadUI:[function(t,e,o){"use strict";cc._RF.push(e,"7f006caj/dGN5O0ODkhK1Hx","UploadUI"),Object.defineProperty(o,"__esModule",{value:!0});var a=t("./MainCtrl"),n=t("./BalanceFormatter"),r=cc._decorator,c=r.ccclass,l=r.property,i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.lblTotalBTC=null,e.edtComment=null,e.edtDonate=null,e.grpWithScore=null,e.grpNoScore=null,e.lblSend=null,e}return __extends(e,t),e.prototype.start=function(){var t=a.MainCtrl.Instance.lastScore;t?(this.lblTotalBTC.string=n.default.formatBTC(t)+"BTC",this.grpWithScore.active=!0,this.grpNoScore.active=!1,this.lblSend.string="上传到时间机器"):(this.grpWithScore.active=!1,this.grpNoScore.active=!0,this.lblSend.string="发送捐赠")},e.prototype.onUploadBtnClick=function(){try{var t=a.MainCtrl.Instance.lastScore,e=parseFloat(this.edtDonate.string),o=this.edtComment.string;console.log("调用钱包",t,e,o);var n=new NebPay,r=NebPay.config.testnetUrl,c=a.ContractAddress,l=e,i="["+t+',"'+o+'"]';n.call(c,l,"submit",i,{qrcode:{showQRCode:!0},goods:{name:"test",desc:"test goods"},callback:r,listener:this.listener})}catch(t){console.error(t)}},e.prototype.listener=function(t){console.log("resp: "+JSON.stringify(t))},__decorate([l(cc.Label)],e.prototype,"lblTotalBTC",void 0),__decorate([l(cc.EditBox)],e.prototype,"edtComment",void 0),__decorate([l(cc.EditBox)],e.prototype,"edtDonate",void 0),__decorate([l(cc.Node)],e.prototype,"grpWithScore",void 0),__decorate([l(cc.Node)],e.prototype,"grpNoScore",void 0),__decorate([l(cc.Label)],e.prototype,"lblSend",void 0),e=__decorate([c],e)}(cc.Component);o.default=i,cc._RF.pop()},{"./BalanceFormatter":"BalanceFormatter","./MainCtrl":"MainCtrl"}]},{},["BalanceFormatter","Core","Helloworld","HomeUI","Leaderboard","MainCtrl","ResultUI","UploadUI"]);