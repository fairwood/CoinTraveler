import { MainCtrl, ContractAddress } from "./MainCtrl";
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
            let score = MainCtrl.Instance.lastScore;
            let donateAmount = parseFloat(this.edtDonate.string);
            let comment = this.edtComment.string;
            console.log("调用钱包", score, donateAmount, comment);

            var nebPay = new NebPay();
            var serialNumber;
            //var callbackUrl = NebPay.config.mainnetUrl;
            var callbackUrl = NebPay.config.testnetUrl;

            var to = ContractAddress;
            var value = donateAmount;
            var callFunction = 'submit';
            var callArgs = '['+score+',"'+comment+'"]';
            serialNumber = nebPay.call(to, value, callFunction, callArgs, {
                qrcode: {
                    showQRCode: true
                },
                goods: {
                    name: "test",
                    desc: "test goods"
                },
                callback:callbackUrl,
                listener: this.listener  //set listener for extension transaction result
            });
        } catch (error) {
            console.error(error);
        }
    }

    listener(resp) {
        console.log("resp: " + JSON.stringify(resp));
    }
}
