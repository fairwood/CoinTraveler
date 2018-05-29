import { Core } from "./Core";

const { ccclass, property } = cc._decorator;

declare var Neb: any;
declare var Account: any;
export const ContractAddress = 'n1xoB2s1S7L7dUU2fniVuchUuFJduKhUYj4';

@ccclass
export class MainCtrl extends cc.Component {
    static Instance: MainCtrl;

    wallet_address: string;

    @property(cc.TextAsset)
    BTCData: cc.TextAsset = null;

    @property(cc.SpriteFrame)
    spriteFrame: cc.SpriteFrame = null;

    BTCHistory: object[] = null;

    lastScore = 0;
    lastPrice = 0;

    @property(cc.Node)
    HomeUI: cc.Node = null;
    @property(cc.Node)
    CoreUI: cc.Node = null;
    @property(cc.Node)
    ResultUI: cc.Node = null;
    @property(cc.Node)
    LeaderboardUI: cc.Node = null;
    @property(cc.Node)
    UploadUI: cc.Node = null;

    onLoad() {
        MainCtrl.Instance = this;
        document.title = "NAS|币圈穿越记";
        //加载历史价格数据
        cc.loader.loadRes('BTC', function (err, txt) {
            console.log('BTCHistory loaded', typeof (txt), txt);
            this.BTCHistory = txt;
            this.fetchLatestData();
        }.bind(this));

    }

    start() {

        this.node.children.forEach((c) => {
            c.active = false;
        });
        this.HomeUI.active = true;

        let self = this;
        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
        neb.api.getNebState().then(function (state) {
            self.nebState = state;

            window.addEventListener('message', self.getMessage);

            window.postMessage({
                "target": "contentscript",
                "data": {},
                "method": "getAccount",
            }, "*");
        });
    }

    nebState;
    update() {
    }

    getMessage(e) {
        if (e.data && e.data.data) {
            console.log("e.data.data:", e.data.data)
            if (e.data.data.account) {
                var address = e.data.data.account;
                MainCtrl.Instance.wallet_address = address;
                console.log("address=" + address);
                // refresh();
                // nasApi.getAccountState({
                //     address: address
                // }).then(function (resp) {
                //     var amount = Unit.fromBasic(Utils.toBigNumber(resp.balance), "nas").toNumber()//账号余额
                //     console.log("余额：" + amount);
                //     this.wallet_balance = amount;
                //     hui("#wallet_balance").html(amount);
                // });
            }
        }

    }

    OnBtnStartClick() {
        this.node.children.forEach((c) => {
            c.active = false;
        });
        this.CoreUI.active = true;
        this.CoreUI.getComponent(Core).restart();
    }

    GotoResult() {
        this.node.children.forEach((c) => {
            c.active = false;
        });
        this.ResultUI.active = true;
    }
    GotoLeaderboard() {
        this.node.children.forEach((c) => {
            c.active = false;
        });
        this.LeaderboardUI.active = true;
    }
    GotoDonate() {
        this.lastScore = 0;
        this.node.children.forEach((c) => {
            c.active = false;
        });
        this.UploadUI.active = true;
    }
    GotoUpload() {
        this.node.children.forEach((c) => {
            c.active = false;
        });
        this.UploadUI.active = true;
    }
    GotoHome() {
        this.node.children.forEach((c) => {
            c.active = false;
        });
        this.HomeUI.active = true;
    }

    fetchLatestData() {


        var xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
        let history = MainCtrl.Instance.BTCHistory;
        let now = new Date();
        let lastDay = new Date(history[history.length - 1].date);
        let moreDays = ((now - lastDay) / 86400000).toFixed();
        console.log(Number(lastDay), 'md', moreDays);
        xhr.open('GET', `https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=${moreDays}&aggregate=1&e=CCCAGG`, true);
        xhr.send();
    }
}