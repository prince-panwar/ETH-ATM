// SPDX-License-Identifier: MIT
 pragma solidity ^0.8.9;
 
 contract Atm{
    address payable owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance=initBalance;
    }
    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable{
        uint _previousBalance = balance;
        require(msg.sender==owner,"Not Authorized");

        balance+=_amount;

        assert(balance==_previousBalance+_amount);

        emit Deposit(_amount);

    }
    //custom error
    error InsuffcientBalance(uint256 balance,uint256 withdrawAmount );
    
    function withdraw(uint256 _amount) public payable{
        require(msg.sender==owner,"Not Authorized");
        uint _previousBalance = balance;
        
       if(_amount>balance){
        revert InsuffcientBalance({
            balance:balance,
            withdrawAmount:_amount
        });
       }
       
        balance-=_amount;
        
        assert(balance==_previousBalance-_amount);
        
        emit Withdraw(_amount);
}
 }
