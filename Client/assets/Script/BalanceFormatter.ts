const { ccclass, property } = cc._decorator;

@ccclass
export default class BalanceFormatter extends cc.Component {

    static formatBTC(btc: number) {
        let log10 = Math.max(0, Math.floor(Math.log(btc) / Math.LN10));
        return btc.toFixed(Math.max(0, 7 - log10));
    }
    static formatNAS(nas: number) {
        let log10 = Math.max(0, Math.floor(Math.log(nas) / Math.LN10));
        return nas.toFixed(Math.min(4, Math.max(0, 4 - log10)));
    }
    static formatCNY(cny: number) {
        let log10 = Math.max(0, Math.floor(Math.log(cny) / Math.LN10));
        return cny.toFixed(Math.min(2, Math.max(0, 7 - log10)));
    }
}
