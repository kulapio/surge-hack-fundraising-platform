pragma solidity ^0.5.0;

import "../helper/SafeMath.sol";
import "../helper/ERC20Interface.sol";

// Exchange a specific token to DAI with specific rate in this contract
contract DexExchange {
  using SafeMath for uint256;

  mapping (address => uint256) public tokenRate;

  // Dai
  ERC20 public dai;

  // Debug
  uint256 public destAmt;

  // constructor() public {
  // }

  function setRate(ERC20 _tokenAddress, uint256 _rateInDai) public {
    tokenRate[address(_tokenAddress)] = _rateInDai;
  }

  function setDaiTokenAddress(ERC20 _daiAddress) public {
    dai = _daiAddress;
  }

  function sell(ERC20 _token, uint256 _amount) public returns (uint256) {
    // Cut money from user
    _token.transferFrom(msg.sender, address(this), _amount);

    // Get rate
    uint256 rateInDai = tokenRate[address(_token)];

    // Calculate dest amount with current rate
    uint256 destAmount = _amount.mul(rateInDai).div(10 ** 18);

    // Debug only
    destAmt = destAmount;

    // Transfer dai back to user
    dai.transfer(msg.sender, destAmount);

    return destAmount;
  }

  // function get() public view returns (uint retVal) {
  //   return storedData;
  // }
}
