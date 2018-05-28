import { Core } from "./Core";

const { ccclass, property } = cc._decorator;

@ccclass
export class MainCtrl extends cc.Component {
    static Instance: MainCtrl;

    @property(cc.TextAsset)
    BTCData: cc.TextAsset = null;

    @property(cc.SpriteFrame)
    spriteFrame: cc.SpriteFrame = null;

    BTCHistory: object = null;

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
            console.log('BTCHistory loaded', typeof(txt), txt);
            this.BTCHistory = txt;
        }.bind(this));
    }

    start() {
        
        this.node.children.forEach((c)=>{
            c.active = false;
        });
        this.HomeUI.active = true;

    }

    OnBtnStartClick() {
        this.node.children.forEach((c)=>{
            c.active = false;
        });
        this.CoreUI.active = true;
        this.CoreUI.getComponent(Core).restart();
    }

    GotoResult() {
        this.node.children.forEach((c)=>{
            c.active = false;
        });
        this.ResultUI.active = true;
    }
    GotoLeaderboard() {
        this.node.children.forEach((c)=>{
            c.active = false;
        });
        this.LeaderboardUI.active = true;
    }
    GotoDonate() {
        this.lastScore = null;
        this.node.children.forEach((c)=>{
            c.active = false;
        });
        this.UploadUI.active = true;
    }
    GotoUpload() {
        this.node.children.forEach((c)=>{
            c.active = false;
        });
        this.UploadUI.active = true;
    }
    GotoHome() {
        this.node.children.forEach((c)=>{
            c.active = false;
        });
        this.HomeUI.active = true;
    }
}