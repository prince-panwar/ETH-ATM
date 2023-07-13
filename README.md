# ETH-ATM

## Description

ETH-ATM is a simple decentralized application (Dapp) that allows users to deposit and withdraw funds using Ethereum. It demonstrates the functionality of depositing and withdrawing Ether (ETH) from a smart contract.

## Usage

To run the ETH-ATM Dapp locally on your computer, follow these steps:

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your machine.
- Git should be installed to clone the GitHub repository.

### Installation

1. Clone the GitHub repository to your local machine:
2. git clone repo-Url
3. Change into the project directory: cd ETH-ATM
4. Install the project dependencies
5. npm install
   
### Running the Dapp

1. Start a local Ethereum network using Hardhat using the command: npx hardhat node
   
2. In a separate terminal, deploy the smart contract to the local network using the command: npx hardhat run --network localhost scripts/deploy.js
   
3. Finally, start the Dapp on your local development server using the command: npm run dev
 
4. Access the Dapp in your web browser at http://localhost:3000/ to interact with the ETH-ATM.



