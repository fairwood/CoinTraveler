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
    }

    onUploadBtnClick() {
        if (window.webExtensionWallet) {
            try {
                let score = MainCtrl.Instance.lastScore;
                let donateAmount = parseFloat(this.edtDonate.string);
                let comment = this.edtComment.string;
                console.log("调用钱包", score, donateAmount, comment);

                var nebPay = new NebPay();
                var serialNumber;
                var callbackUrl = MainCtrl.BlockchainUrl;

                var to = ContractAddress;
                var value = donateAmount;
                var callFunction = 'submit';
                var callArgs = '[' + score + ',"' + comment + '"]';
                serialNumber = nebPay.call(to, value, callFunction, callArgs, {
                    qrcode: {
                        showQRCode: false
                    },
                    goods: {
                        name: "test",
                        desc: "test goods"
                    },
                    callback: callbackUrl,
                    listener: this.listener
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            window.open("https://github.com/ChengOrangeJu/WebExtensionWallet");
        }
    }

    listener(resp) {
        console.log("submit resp: ", resp);
        MainCtrl.Instance.GotoHome();
    }
}
