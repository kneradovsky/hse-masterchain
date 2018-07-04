var Migrations = artifacts.require("./Migrations.sol");
var hypetoken =artifacts.require("HypeToken");

module.exports = function(deployer) {
  deployer.deploy(hypetoken);
};