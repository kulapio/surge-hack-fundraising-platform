pragma solidity ^0.5.0;

import "../helper/SafeMath.sol";
import "../helper/ERC20Interface.sol";

// Exchange a specific token to DAI with specific rate in this contract
contract OMGExchange {
  using SafeMath for uint256;

  string public tokenName;
  uint256 public rateInDai;
  ERC20 public token;

  // Dai
  ERC20 public dai;

  // Debug
  uint256 public destAmt;

  constructor(string memory _tokenName, ERC20 _token, uint256 _rateInDai) public {
    tokenName = _tokenName;
    token = _token;
    rateInDai = _rateInDai;
  }

  function setRate(uint256 _rateInDai) public {
    rateInDai = _rateInDai;
  }

  function setDaiTokenAddress(ERC20 _daiAddress) public {
    dai = _daiAddress;
  }

  function setTokenAddress(ERC20 _tokenAddress) public {
    token = _tokenAddress;
  }

  function sell(uint256 _amount) public returns (uint256) {
    // Cut money from user
    token.transferFrom(msg.sender, address(this), _amount);

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
