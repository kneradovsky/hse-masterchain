
var HypeToken = artifacts.require("HypeToken");

contract("HypeToken3",function(accounts) {
    var hypeToken;
    var comissionRate;
    var tokenWeis;
    var owner;
    before(async function() {
        hypeToken = await HypeToken.deployed();
        comissionRate = (await hypeToken.comissionTransferFrom()).toNumber();
        tokenWeis = (await hypeToken.NUsInToken()).toNumber();
        owner = await hypeToken.owner();
        //owner transfers 10 tokens to accounts[1]
        var tx = hypeToken.transfer(accounts[1],2*tokenWeis,{from:owner});
    });
    it("check allowance failed",async function() {
        var allowance = await hypeToken.allowance(accounts[1],accounts[2]);
        var amount = allowance + tokenWeis; //allowance + 1 token
        try {
            await hypeToken.transferFrom(accounts[1],accounts[2],amount,{from:accounts[2]});
            assert.fail("error wasn't thrown")
        } catch(error) {
            
        }
    })
    it("check comissions",async function() {
        var amount = tokenWeis; //transfer 1 token
        assert.isOk(await hypeToken.increaseApproval(accounts[2],amount,{from:accounts[1]}))
        var balanceSender1 = (await hypeToken.balanceOf(accounts[1])).toNumber();
        var balanceReceiver1 = (await hypeToken.balanceOf(accounts[2])).toNumber();
        var balanceOwner1 = (await hypeToken.balanceOf(owner)).toNumber();
        var tx = await hypeToken.transferFrom(accounts[1],accounts[2],amount,{from:accounts[2]});
        var balanceSender2 = (await hypeToken.balanceOf(accounts[1])).toNumber();
        var balanceReceiver2 = (await hypeToken.balanceOf(accounts[2])).toNumber();
        var balanceOwner2 = (await hypeToken.balanceOf(owner)).toNumber();
        assert.equal(balanceSender2,balanceSender1-amount);
        assert.equal(balanceReceiver2,balanceReceiver1+amount-comissionRate);
        assert.equal(balanceOwner2,balanceOwner1+comissionRate);
    })
})