pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract HypeToken is StandardToken,Ownable() {
    string public constant name = "HypeToken";
    string public constant symbol = "HYT";
    uint8 public constant decimals = 8;

    uint256 public constant NUsInToken = (10 ** uint256(decimals));
    uint256 public constant INITIAL_SUPPLY = 10**6 * NUsInToken;


    uint256 public constant comissionTransferFrom = NUsInToken / 100; //commission is 0.01 token


    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }

    function transferFrom(address _from,address _to, uint256 _value) public returns(bool) {
        require(_value > comissionTransferFrom);
        require(_value <= allowed[_from][msg.sender]);
        //first transfer _value without comission to destination address
        require(StandardToken.transferFrom(_from,_to,_value.sub(comissionTransferFrom)));        
        //transfer comission to owner
        balances[_from] = balances[_from].sub(comissionTransferFrom);
        balances[owner] = balances[owner].add(comissionTransferFrom);
        emit Transfer(_from,owner,comissionTransferFrom);
        return true;
    }
}