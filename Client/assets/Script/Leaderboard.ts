import BalanceFormatter from "./BalanceFormatter";
import { ContractAddress, MainCtrl } from "./MainCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Leaderboard extends cc.Component {

    static readonly ElementCount = 20;

    @property(cc.Node)
    template: cc.Node = null; //同时也是我的
    @property(cc.Node)
    container: cc.Node = null;

    elements: cc.Node[] = [];

    tab = 'score';

    static scoreBoard;
    static donationBoard;

    onLoad() {
        for (let i = 0; i < Leaderboard.ElementCount; i++) {
            let element = cc.instantiate(this.template);
            this.elements[i] = element;
            element.parent = this.container;
            element.name = i.toFixed();
            this.setAndRefreshElement(i, element, null);
        }
    }

    onEnable() {
        this.fetchData();
    }

    fetchData() {
        let self = this;
        if (!Neb) return;
        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));

        var from = MainCtrl.Instance.wallet_address ? MainCtrl.Instance.wallet_address : Account.NewAccount().getAddressString();
        console.log("from:" + from)

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "get_score_rankboard";
        //var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": "[]"
        }

        neb.api.call(from, ContractAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
            console.log('get_score_rankboard', resp)
            Leaderboard.scoreBoard = JSON.parse(resp.result).result_data;
            self.switchTab(null, 'score');
        }).catch(function (err) {
            console.log("error:" + err.message)
        })

        var callFunction = "get_donation_rankboard";
        var contract = {
            "function": callFunction,
            "args": "[]"
        }
        neb.api.call(from, ContractAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
            console.log('get_donation_rankboard', resp)
            Leaderboard.donationBoard = JSON.parse(resp.result).result_data;
            self.switchTab(null, 'donation');
        }).catch(function (err) {
            console.log("error:" + err.message)
        })


        var callFunction = "get_player_info";
        var contract = {
            "function": callFunction,
            "args": "[]"
        }
        neb.api.call(from, ContractAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
            console.log('get_player_info', resp)
            self.setAndRefreshElement('*', self.template, JSON.parse(resp.result).result_data);
        }).catch(function (err) {
            console.log("error:" + err.message)
        })
    }

    setAndRefreshElement(index: number | string, element: cc.Node, data: object) {
        if (data) {
            element.getChildByName('LblAddress').getComponent(cc.Label).string = index + '  ' + data.address;
            element.getChildByName('LblScore').getComponent(cc.Label).string = '分数' + BalanceFormatter.formatBTC(data.score) + 'BTC';
            element.getChildByName('LblDonation').getComponent(cc.Label).string = '捐赠' + BalanceFormatter.formatNAS(Number(data.donation)/1e18) + 'NAS';
            element.getChildByName('LblComment').getComponent(cc.Label).string = data.comment;
        } else {
            element.getChildByName('LblAddress').getComponent(cc.Label).string = index.toString();
            element.getChildByName('LblScore').getComponent(cc.Label).string = '';
            element.getChildByName('LblDonation').getComponent(cc.Label).string = '';
            element.getChildByName('LblComment').getComponent(cc.Label).string = '';
        }
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
