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

    @property(cc.Node)
    grpWithScore: cc.Node = null;
    @property(cc.Node)
    grpNoScore: cc.Node = null;

    @property(cc.Label)
    lblSend: cc.Label = null;

    start() {
        let btc = MainCtrl.Instance.lastScore;
        if (btc) {
            this.lblTotalBTC.string = BalanceFormatter.formatBTC(btc) + "BTC";
            this.grpWithScore.active = true;
            this.grpNoScore.active = false;
            this.lblSend.string = '上传到时间机器';
        } else {
            this.grpWithScore.active = false;
            this.grpNoScore.active = true;
            this.lblSend.string = '发送捐赠';
        }
        //TODO:没有钱包怎么办
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
