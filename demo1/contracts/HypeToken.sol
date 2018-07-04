pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract HypeToken is StandardToken {
    string public constant name = "HypeToken";
    string public constant symbol = "HYT";
    uint8 public constant decimals = 8;

    uint256 public constant INITIAL_SUPPLY = 10**6 * (10 ** uint256(decimals));

}