import { MainCtrl } from "./MainCtrl";
import BalanceFormatter from "./BalanceFormatter";

const { ccclass, property } = cc._decorator;

@ccclass
export class CoreUI extends cc.Component {

    fiatBalance: number = 0;
    btcBalance: number = 0;
    static readonly USD2CNY = 6.3;

    t: number = 0;
    interval: number = 1;
    nextDayCountdown: number = 1e8;
    speedMods: number[] = [0, 5, 20, 100];
    speedersButton: boolean[] = [false, false, false, false];
    speedersKeyboard: boolean[] = [false, false, false, false];

    dayWidth = 3;
    width = 450;
    height = 345;

    @property(cc.Label)
    lblPrice: cc.Label = null;
    @property(cc.Label)
    lblDate: cc.Label = null;
    @property(cc.Label)
    lblFiatBalance: cc.Label = null;
    @property(cc.Label)
    lblBtcBalance: cc.Label = null;
    @property(cc.Label)
    lblTotal: cc.Label = null;
    @property(cc.Graphics)
    graphics: cc.Graphics = null;
    @property(cc.Node)
    lastOper: cc.Node = null;
    @property(cc.Label)
    lblLastOper: cc.Label = null;
    @property(cc.Node)
    highestLine: cc.Node = null;

    @property(cc.Label)
    lblSpeed: cc.Label = null;
    @property([cc.Button])
    btnSpeeds: Array<cc.Button> = [];

    lastOperDir: number = null; //1买   2卖
    lastOperPrice: number = null;

    onLoad() {
        let self = this;
        for (let i = 0; i < this.btnSpeeds.length; i++) {
            const btnSpeed = this.btnSpeeds[i];
            btnSpeed.node.on(cc.Node.EventType.TOUCH_START, function (event) {
                self.speedersButton[i] = true;
            });
            btnSpeed.node.on(cc.Node.EventType.TOUCH_END, function (event) {
                self.speedersButton[i] = false;
            });

            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
                console.log("keyCode", event.keyCode)
                switch (event.keyCode) {
                    case cc.KEY[1]:
                        self.speedersKeyboard[0] = true;
                        break;
                    case cc.KEY[2]:
                        self.speedersKeyboard[1] = true;
                        break;
                    case cc.KEY[3]:
                        self.speedersKeyboard[2] = true;
                        break;
                    case cc.KEY[4]:
                        self.speedersKeyboard[3] = true;
                        break;
                }
            });
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
                switch (event.keyCode) {
                    case cc.KEY[1]:
                        self.speedersKeyboard[0] = false;
                        break;
                    case cc.KEY[2]:
                        self.speedersKeyboard[1] = false;
                        break;
                    case cc.KEY[3]:
                        self.speedersKeyboard[2] = false;
                        break;
                    case cc.KEY[4]:
                        self.speedersKeyboard[3] = false;
                        break;
                }
            });
        }
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.KEY.j:
                    self.BuyAll();
                    break;
                case cc.KEY.k:
                    self.SellAll();
                    break;
            }
        });
    }

    BuyAll() {
        console.log("全仓买入");
        let data = MainCtrl.Instance.BTCHistory;
        let price = data[this.t]['close'];
        let amountOfBTC = Math.min(20000000 - this.btcBalance, this.fiatBalance / price);
        this.btcBalance += amountOfBTC;
        this.fiatBalance -= amountOfBTC * price;
        this.lastOperDir = 1;
        this.lastOperPrice = price;
    }
    SellAll() {
        console.log("全仓卖出");
        let data = MainCtrl.Instance.BTCHistory;
        let price = data[this.t]['close'];
        let amountOfBTC = this.btcBalance;
        this.fiatBalance += amountOfBTC * price;
        this.btcBalance -= amountOfBTC;
        this.lastOperDir = 2;
        this.lastOperPrice = price;
    }

    restart() {
        this.fiatBalance = 100 / CoreUI.USD2CNY;
        this.btcBalance = 0;
        this.t = 0;
        this.nextDayCountdown = 0;
        this.historicalHighestPrice = 0;
        this.graphics.moveTo(0, 0);
        this.lastOper.active = false;
        this.lastOperDir = null;
        this.lastOperPrice = null;
        this.highestLine.position = new cc.Vec2(0, 0);
    }
    update(dt: number) {
        let data = MainCtrl.Instance.BTCHistory;
        if (this.t >= (data as Array<any>).length - 1) return;
        let speedMod = 1;
        for (let i = 0; i < this.speedersButton.length; i++) {
            if (this.speedersButton[i] || this.speedersKeyboard[i]) {
                speedMod *= this.speedMods[i];
            }
        }
        this.lblSpeed.string = (speedMod / this.interval).toFixed() + "天/s";
        this.nextDayCountdown -= dt * speedMod;
        while (this.nextDayCountdown <= 0 && this.t < (data as Array<any>).length - 1) {
            this.t++;
            // console.log("t", this.t);
            this.nextDayCountdown += this.interval;
            let price = data[this.t]['close'];
            if (price > this.historicalHighestPrice) {
                this.historicalHighestPrice = price;
            }


        }

        {
            this.graphics.clear();

            //Axes
            this.graphics.moveTo(0, 0);
            this.graphics.lineTo(this.width, 0);

            //Line Chart
            let factor = this.height * 0.96 / this.historicalHighestPrice;
            let earliestT = Math.max(0, this.t - this.width / this.dayWidth);
            this.graphics.moveTo(0, data[earliestT]['close'] * factor);
            for (let i = earliestT + 1; i <= this.t; i++) {
                this.graphics.lineTo((i - earliestT) * this.dayWidth, data[i]['close'] * factor);
            }

            this.graphics.stroke();

            if (this.lastOperDir) {
                this.lastOper.position = new cc.Vec2(0, this.lastOperPrice * factor);
                this.lblLastOper.string = this.lastOperDir == 1? '最近买入' : '最近卖出';
                this.lastOper.active = true;
            } else {
                this.lastOper.active = false;
            }

            this.highestLine.position = new cc.Vec2(0, this.historicalHighestPrice * factor);
        }

        let price = data[this.t]['close'];

        this.lblPrice.string = "￥" + BalanceFormatter.formatCNY(price * CoreUI.USD2CNY);
        this.lblDate.string = data[this.t]['date'];

        this.lblFiatBalance.string = BalanceFormatter.formatCNY(this.fiatBalance * CoreUI.USD2CNY) + "CNY";
        this.lblBtcBalance.string = BalanceFormatter.formatBTC(this.btcBalance) + "BTC";
        let totalAsBtc = this.fiatBalance / price + this.btcBalance;
        this.lblTotal.string = BalanceFormatter.formatCNY(totalAsBtc * price * CoreUI.USD2CNY) + "CNY = " + BalanceFormatter.formatBTC(totalAsBtc) + "BTC";

        if (this.t >= (data as Array<any>).length - 1) {
            MainCtrl.Instance.lastScore = totalAsBtc;
            MainCtrl.Instance.lastPrice = price;
            console.log("End");
            setTimeout(() => {
                MainCtrl.Instance.GotoResult();
            }, 1000);
        }
    }

    historicalHighestPrice: number;
}