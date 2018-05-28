import { MainCtrl } from "./MainCtrl";
import BalanceFormatter from "./BalanceFormatter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UploadUI extends cc.Component {

    @property(cc.Label)
    lblTotalBTC: cc.Label = null;
    @property(cc.EditBox)
    edtComment: cc.EditBox = null;
    @property(cc.EditBox)
    edtDonate: cc.EditBox = null;

    start() {
        let btc = MainCtrl.Instance.lastScore;
        if (btc) {
            this.lblTotalBTC.string = BalanceFormatter.formatBTC(btc) + "BTC";
        }
    }

    onUploadBtnClick() {
        try {
            let donateAmount = parseFloat(this.edtDonate.string);
            let comment = this.edtComment.string;
            console.log("调用钱包", MainCtrl.Instance.lastScore, donateAmount, comment);
        } catch (error) {
            console.error(error);
        }
    }
}
