import { MainCtrl } from "./MainCtrl";
import { Core } from "./Core";
import BalanceFormatter from "./BalanceFormatter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultUI extends cc.Component {

    @property(cc.Label)
    lblTotalBTC: cc.Label = null;
    @property(cc.Label)
    lblTotalCNY: cc.Label = null;

    start() {
        let btc = MainCtrl.Instance.lastScore;
        this.lblTotalBTC.string = BalanceFormatter.formatBTC(btc) + "BTC";
        this.lblTotalCNY.string = "=￥" + BalanceFormatter.formatCNY(btc * MainCtrl.Instance.lastPrice * Core.USD2CNY);
    }
}
