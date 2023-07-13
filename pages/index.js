import { ethers } from "ethers";
import { useEffect,useState } from "react";
import abi from "../artifacts/contracts/Assessment.sol/Atm.json";
const home = ()=>{
  const [ethWallet, setEthWallet]=useState(undefined);
  const [account,setAccount]=useState(undefined);
  const [atm,setAtm]=useState(undefined);
  const [balance,setBalance]=useState(undefined);
  const [depositAmount,setDepositAmount]=useState(0);
  const [withdrawAmount,setwithDrawAmount]=useState(0);

const contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
const atm_Abi=abi.abi;

const getWallet=async()=>{
  if(window.ethereum){
    setEthWallet(window.ethereum);
  }
 
  
}
const handleAccount=(account)=>{
  if(account){
    console.log("Account Connected:",account);
    setAccount(account);
  }
  else{
    console.log("No Account found");
  }

}

 

const connectAccount = async()=>{
  if(!ethWallet){
    alert('MetaMask wallet is required to connect');
    return;
  }

  const accounts = await ethWallet.request({method:'eth_requestAccounts'});
  handleAccount(accounts);
  getATMContract();
}


const getATMContract = async()=>{
  const provider = new ethers.providers.Web3Provider(ethWallet);
  const signer = provider.getSigner();
  const atmContract=new ethers.Contract(contractAddress,atm_Abi,signer);
  setAtm(atmContract);
}
const getBalance = async()=>{
  if(atm){
    setBalance((await atm.getBalance()).toNumber());
  }
}

const deposit = async(e)=>{
  e.preventDefault();
  if(atm){
    let tx=await atm.deposit(depositAmount);
    await tx.wait();
    getBalance();
    setDepositAmount(0);
  }
}
const withdraw = async(e)=>{
  e.preventDefault();
  if(atm){
    let tx = await atm.withdraw(withdrawAmount);
    await tx.wait();
    setwithDrawAmount(0);
    getBalance();
  }
}

const initUser=()=>{
  if(!ethWallet){
    return <p> Please install MetaMask in order to use this ATM</p>
  }
  if(!account){
    return <button className="connectBtn"onClick={connectAccount}>connect Wallet</button>
  }
  if(balance==undefined){
    getBalance();
  }
  return(
    <div className="centered-container">
    <p className="p-tag">Your Account :{account}</p>
    <p className="p-tag">Your Balance:{balance}</p>
    <form onSubmit={deposit} className="form">
      <label className="form-label">Enter Amount to deposit</label>
      <input className="form-input "value={depositAmount} onChange={(e)=>setDepositAmount(e.target.value)}></input>
      <button  className="btn1"type="submit">deposit</button>
    </form>
    <form onSubmit={withdraw} className="form">
      <label className="form-label">Enter Amount to withdraw</label>
      <input className="form-input"value={withdrawAmount} onChange={(e)=>setwithDrawAmount(e.target.value)}></input>
      <button className="btn1" type="submit">withdraw</button>
     </form>
  
    </div>
  )
}

useEffect(() => {getWallet()},[]);

return(
<div className="container">
{initUser()}
</div>
  );

}
export default home;