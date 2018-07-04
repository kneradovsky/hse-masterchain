var HypeToken = artifacts.require("HypeToken");

contract("HypeToken1",function(accounts) {
    it("should put funds on the owner account",function(done) {
        return HypeToken.deployed().then(function(instance) {
            return instance.balanceOf(accounts[0]).then(function(ownerBalance) {
                assert.equal(ownerBalance.valueOf(),1000000,"INITIAL SUPPLY won't load to the owners account");
                done();
            });
        })
    })
    it("check owner",function(done) {
     HypeToken.deployed().then(function(instance) {
        instance.owner().then(owner => {
            assert.equal(accounts[0],owner);
            done();
        })
    })
   })
   it("send tokens", function(done) {
        var trCoins = 3*100000000; //each coin has 8 decimals
        return HypeToken.deployed().then(function(ct) {
            return ct.balanceOf(accounts[2]);
        }).then(function(coinsBalance1){
            return ct.transfer(accounts[2],trCoins,{from: accounts[0]});
        }).then(function(tx) {
            return ct.balanceOf(accounts[2]);
        }).then(function(coinsBalance2) {
            assert.equal(coinsBalance2.toNumber(),coinsBalance1.toNumber()+trCoins,"balance didn't increase");
            done();
        })
   })
})