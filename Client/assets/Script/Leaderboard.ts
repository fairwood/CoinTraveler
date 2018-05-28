import BalanceFormatter from "./BalanceFormatter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Leaderboard extends cc.Component {

    static readonly ElementCount = 20;

    @property(cc.Node)
    template: cc.Node = null; //同时也是我的
    @property(cc.Node)
    container: cc.Node = null;

    elements: cc.Node[] = [];

    tab: number = 0;

    static scoreBoard;
    static donationBoard;

    onLoad() {
        Leaderboard.scoreBoard = [
            ['1a382nsndofwenoi', 80432049.023904, 1235332.43, "挺好的游戏"],
            ['2dno0i2jsdofiji', 23432049.023904, 33982.43, "教会我很多"],
            ['9034sdnfowoofiewo', 432049.023904, 0.43, "震撼！！！"],
            ['jiregj9020439jiooioj39j04', 10431.24, 0.0143, "支持！"],
        ]
        Leaderboard.donationBoard = [
            ['1a382nsndofwenoi', 2353.023904, 332.43, "挺好的游戏"],
            ['2dno0i2jsdofiji', 2352.023904, 132.43, "教会我很多"],
            ['9034sdnfowoofiewo', 432049.023904, 32.43, "震撼！！！"],
            ['jiregj9020439jiooioj39j04', 10431.24, 2.43, "支持！"],
        ]
        for (let i = 0; i < Leaderboard.ElementCount; i++) {
            let element = cc.instantiate(this.template);
            this.elements[i] = element;
            element.parent = this.container;
            element.name = i.toFixed();
            this.setAndRefreshElement(i, element, [null, null, null, null]);
        }
    }

    setAndRefreshElement(index: number, element: cc.Node, data: object) {
        console.log('sar',index, data);
        if (!data) { data = [null, null, null, null]; }
        element.getChildByName('LblAddress').getComponent(cc.Label).string =
            index.toFixed() + '  ' + (data[0] ? data[0] : '');
        element.getChildByName('LblScore').getComponent(cc.Label).string =
            data[0] ? '分数' + BalanceFormatter.formatBTC(data[1]) + 'BTC' : '';
        element.getChildByName('LblDonation').getComponent(cc.Label).string =
            data[0] ? '捐赠' + BalanceFormatter.formatNAS(data[2]) + 'NAS' : '';
        element.getChildByName('LblComment').getComponent(cc.Label).string = data[3] ? data[3] : '';
    }

    switchTab(event, tab) {
        switch (tab) {
            case 'score':
            console.log('tab', tab);
                for (let i = 0; i < this.elements.length; i++) {
                    const element = this.elements[i];
                    this.setAndRefreshElement(i, element, i < Leaderboard.scoreBoard.length ? Leaderboard.scoreBoard[i] : null);
                }
                break;
            case 'donation':
                for (let i = 0; i < this.elements.length; i++) {
                    const element = this.elements[i];
                    this.setAndRefreshElement(i, element, i < Leaderboard.donationBoard.length ? Leaderboard.donationBoard[i] : null);
                }
                break;

            default:
                break;
        }
    }
}
