pragma solidity ^0.5.0;

import "./ERC20Token.sol";

/**
 * @title Token
 */
contract OMGToken is PausableToken, MintableToken {
  using SafeMath for uint256;

  string public name;
  string public symbol;
  uint public decimals;

  constructor(string memory _name, string memory _symbol, uint _decimals) public  {
      name = _name;
      symbol = _symbol;
      decimals = _decimals;

      // mint(msg.sender, 100000000 * 10**18);
  }
}
