pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract HypeToken is StandardToken,Ownable() {
    string public constant name = "HypeToken";
    string public constant symbol = "HYT";
    uint8 public constant decimals = 8;

    uint256 public constant INITIAL_SUPPLY = 10**6 * (10 ** uint256(decimals));

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }
}