pragma solidity ^0.5.0;

import "./dex/DexExchange.sol";

interface KatinrunContract {
   function donateProposal(uint32 _pid, address _sponsor, uint256 _amount) external;
}

contract DexAndDonate {
  DexExchange public exchange;
  KatinrunContract public katinrun;
  ERC20 public daiToken = ERC20(0x6b002Bf0489ab6A2473fD4D3e5c54780Ae10C08b);

  constructor(DexExchange _exchange) public {
    exchange = _exchange;
  }

  function setDaiToken(ERC20 _daiToken) public {
    daiToken = _daiToken;
  }

  function setExchange(DexExchange _exchange) public {
    exchange = _exchange;
  }

  function setKatinrunContract(KatinrunContract _address) public {
    katinrun = _address;
  }

  function donateWithToken(ERC20 _token, uint256 _amount, uint32 _pid) public {
    uint256 daiAmount;

    // Donate with dai
    if(daiToken == _token) {
      // Transfer to
      daiToken.transferFrom(msg.sender, address(this), _amount);

      daiAmount = _amount;

    // Donate with erc20
    } else {
      // Transfer erc20 to this contract
      _token.transferFrom(msg.sender, address(this), _amount);
      
      // Approve
      _token.approve(address(exchange), _amount);

      // Dex
      daiAmount = exchange.sell(_token, _amount);
    }

    // Approve
    daiToken.approve(address(katinrun), daiAmount);

    // Donate
    katinrun.donateProposal(_pid, msg.sender, daiAmount);
  }
}
