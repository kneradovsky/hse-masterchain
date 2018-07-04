var HypeToken = artifacts.require("HypeToken");

contract("HypeToken2",function(accounts) {
    it("should put funds on the owner account",async function() {
        var instance = await HypeToken.deployed();
        var ownerBalance = await instance.balanceOf(accounts[0]);
        assert.equal(ownerBalance.valueOf(),1000000*100000000,"INITIAL SUPPLY won't load to the owners account");
    });
    it("checkowner",async function(){
        var instance = await HypeToken.deployed();
        var owner = await instance.owner();
        assert.equal(accounts[0],owner)
    });
    it("send tokens",async function() {
        var trCoins = 3*100000000; //each coin has 8 decimals
        var ct = await HypeToken.deployed(); 
        var coinsBalance1 = await ct.balanceOf(accounts[2]);
        var tx = await ct.transfer(accounts[2],trCoins,{from: accounts[0]});
        var coinsBalance2 = await ct.balanceOf(accounts[2]);
        assert.equal(coinsBalance2.toNumber(),coinsBalance1.toNumber()+trCoins,"balance didn't increase");
    })
})