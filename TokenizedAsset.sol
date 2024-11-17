// contracts/TokenizedAsset.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenizedAsset {
    string public name = "Tokenized Asset";
    string public symbol = "TKA";
    uint256 public totalSupply;
    address public owner;

    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(uint256 _initialSupply) {
        require(_initialSupply > 0, "Initial supply must be greater than 0");
        owner = msg.sender;
        totalSupply = _initialSupply;
        balances[owner] = _initialSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(to != address(0), "Invalid address");

        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
}
