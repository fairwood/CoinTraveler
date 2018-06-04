import { MainCtrl } from "./MainCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HomeUI extends cc.Component {

    @property(cc.Button)
    btnDonate: cc.Button = null;
    @property(cc.Button)
    btnInstallWallet: cc.Button = null;

    static firstTime = true; //刚进入游戏不显示“捐赠”按钮
    onLoad() {
        this.btnDonate.node.active = false;
        this.btnInstallWallet.node.active = true;
    }

    onEnable() {
        MainCtrl.Instance.checkWallet();
    }

    onInstallWalletBtnClick() {
        window.open("https://github.com/ChengOrangeJu/WebExtensionWallet");
    }

    update() {
        //不断检测有无钱包
        if (window.webExtensionWallet) {
            this.btnDonate.node.active = true;
            this.btnInstallWallet.node.active = false;
        } else {
            this.btnDonate.node.active = false;
            this.btnInstallWallet.node.active = true;
        }
    }
}