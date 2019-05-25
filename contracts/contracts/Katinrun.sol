pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import './ERC20Interface.sol';

contract Katinrun {
  ERC20 public daiERC20;
  address public swapContractAddr;

  enum ApproveStatus {PENDING,APPROVE,REJECT}

  struct Proposal {
    uint32 id;
    string name;
    string descHash;
    string docHash;
    uint256 goal;
    uint256 dueDate;
    uint256 backedAmount;
    ApproveStatus approveStatus;
    bool isWithdrawed;
    string deliveryDescHash;
    string deliveryDocHash;
    address owner;
  }

  struct ProposalSponsors {
    address[] sponsors;
    mapping(address => uint256) sponsorDonateAmount;
  }

  Proposal[] proposals;

  mapping(address => bool) approvers;
  mapping(uint32 => ProposalSponsors) proposalSponsors;

  modifier isApprover {
    require(approvers[msg.sender], "This address is not an approver");
    _;
  }

  modifier isSwapContract {
    require(swapContractAddr == msg.sender, "This contract is not a Swap contract");
    _;
  }

  modifier isProposalOwner (uint32 _pid) {
    require(proposals[_pid - 1].owner == msg.sender, "This address is not a proposal owner");
    _;
  }

  modifier isProposalApproved (uint32 _pid) {
    require(proposals[_pid - 1].approveStatus == ApproveStatus.APPROVE, "This proposal does not approved yet");
    _;
  }

  constructor(address _swapContractAddr, address _daiContractAddr) public {
    swapContractAddr = _swapContractAddr;
    daiERC20 = ERC20(_daiContractAddr);
  }

  function addApprover(address _newApprover) public isApprover {
    approvers[_newApprover] = true;
  }

  function removeApprover(address _approver) public isApprover {
    approvers[_approver] = false;
  }

  function submitProposal(
    string memory _proposalName,
    string memory _proposalDesclHash,
    string memory _proposalDocHash,
    uint256 _goal,
    uint256 _dueDate
  ) public {
    proposals.push(
      Proposal({
        id: uint32(proposals.length) + 1,
        name: _proposalName,
        descHash: _proposalDesclHash,
        docHash: _proposalDocHash,
        goal: _goal,
        dueDate: _dueDate,
        backedAmount: 0,
        approveStatus: ApproveStatus.PENDING,
        isWithdrawed: false,
        deliveryDescHash: "",
        deliveryDocHash: "",
        owner: msg.sender
      })
    );
  }

  function approveProposal(uint32 _pid) public isApprover {
    proposals[_pid - 1].approveStatus = ApproveStatus.APPROVE;
  }

  function rejectProposal(uint32 _pid) public isApprover {
    proposals[_pid - 1].approveStatus = ApproveStatus.REJECT;
  }

  function donateProposal(uint32 _pid, address _sponsor, uint256 _amount) public isSwapContract isProposalApproved(_pid) {
    Proposal storage p = proposals[_pid - 1];
    require(block.timestamp < p.dueDate, "This proposal is finished");
    require(_amount > 0, "Amount cannot be 0");
    p.backedAmount += _amount;
    if (proposalSponsors[_pid - 1].sponsorDonateAmount[_sponsor] == 0) {
      proposalSponsors[_pid - 1].sponsors.push(_sponsor);
    }
    proposalSponsors[_pid - 1].sponsorDonateAmount[_sponsor] += _amount;
    daiERC20.transferFrom(msg.sender, address(this), _amount);
  }

  function submitDeliveryReport(uint32 _pid, string memory _deliveryDescHash, string memory _deliveryDocHash)
    public isProposalOwner(_pid) isProposalApproved(_pid) {
    Proposal storage p = proposals[_pid - 1];
    require(block.timestamp >= p.dueDate, "This proposal does not finish");
    require(p.backedAmount >= p.goal, "This proposal does not reach the goal yet");
    p.deliveryDescHash = _deliveryDescHash;
    p.deliveryDocHash = _deliveryDocHash;
  }

  function withdrawFund(uint32 _pid) public isProposalOwner(_pid) isProposalApproved(_pid) {
    Proposal storage p = proposals[_pid - 1];
    require(block.timestamp >= p.dueDate, "This proposal does not finish");
    require(p.backedAmount >= p.goal, "This proposal does not reach the goal yet");
    daiERC20.transfer(msg.sender, p.backedAmount);
  }

  function massExits(uint32 _pid) public isProposalApproved(_pid) {
    Proposal storage p = proposals[_pid - 1];
    require(block.timestamp >= p.dueDate, "This proposal does not finish");
    require(p.backedAmount < p.goal, "This proposal is success");
    for (uint i = 0; i < proposalSponsors[_pid - 1].sponsors.length; i++) {
      address sponsorAddr = proposalSponsors[_pid - 1].sponsors[i];
      daiERC20.transfer(sponsorAddr, proposalSponsors[_pid - 1].sponsorDonateAmount[sponsorAddr]);
      proposalSponsors[_pid - 1].sponsorDonateAmount[sponsorAddr] = 0;
    }
  }

  function getProposalAmount() public view returns (uint32 _amount) {
    return uint32(proposals.length);
  }

  function getProposal(uint32 _pid) public view returns (Proposal memory _proposal) {
    require(_pid > 0, "PID Can not be 0");
    require(_pid <= proposals.length, "Not found");
    return proposals[_pid - 1];
  }

  function getSponsorAmountByProposalId(uint32 _pid) public view returns (uint32 _amount) {
    return uint32(proposalSponsors[_pid - 1].sponsors.length);
  }

  function getSponsorByProposalId(uint32 _pid, uint32 _index) public view returns (address _sponsor) {
    require(_pid > 0, "PID Can not be 0");
    require(_index < proposalSponsors[_pid].sponsors.length, "Not found");
    return proposalSponsors[_pid - 1].sponsors[_index];
  }
}
