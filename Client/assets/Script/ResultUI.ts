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

    intervals = [1, 2, 2, 4, 3];

    start() {
        let btc = MainCtrl.Instance.lastScore;
        this.lblTotalBTC.string = BalanceFormatter.formatBTC(btc) + "BTC";
        this.lblTotalCNY.string = "=￥" + BalanceFormatter.formatCNY(btc * MainCtrl.Instance.lastPrice * Core.USD2CNY);

        let children = this.node.children;
        let actions = [];
        let delay = 0;
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            node.opacity = 0;
            delay += i < this.intervals.length ? this.intervals[i] : 0;
            let seq = cc.sequence(cc.delayTime(delay), cc.fadeIn(0.5));
            node.runAction(seq);
        }
    }
}
