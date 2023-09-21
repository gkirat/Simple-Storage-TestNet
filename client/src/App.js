
// Import the Web3 library

// const providerUrl = `https://eth-sepolia.g.alchemy.com/v2/3aB0TtNdeNTbsnaFt1iIyJWKBWbH`;
// const provider = new Web3.providers.HttpProvider(providerUrl);
// const web3 = new Web3(provider);
// const networkId = await web3.eth.net.getId();
// const deployedNetwork = SimpleStorage.networks[networkId];
// console.log(web3)
// function YourComponent() {
//   const [state, setState] = useState({
//     web3: null,
//     contract: null,
//   });
//   async function loadWeb3() {
//     if (window.ethereum) {
//         window.web3 = new Web3(window.ethereum);
//         window.ethereum.enable();
//     }
// }

//   useEffect(() => {
//     // Use the Web3 provider URL for the testnet or mainnet
//     const providerUrl = `https://eth-sepolia.g.alchemy.com/v2/3aB0TtNdeNTbsnaFt1iIyJWKBWbH-4Fl`; // Replace with your Infura Project ID and network

//     // Create a Web3 provider instance
//     const provider = new Web3.providers.HttpProvider(providerUrl);

//     const template = async () => {
//       try {
//         const web3 = new Web3(provider);
        
//         // Check the network ID
//         const networkId = await web3.eth.net.getId();
//         const deployedNetwork = SimpleStorage.networks[networkId];
        
//         if (!deployedNetwork) {
//           throw new Error("Contract not deployed on the current network");
//         }

//         // Create a contract instance
//         const contract = new web3.eth.Contract(
//           SimpleStorage.abi,
//           deployedNetwork.address
//         );

//         setState({
//           web3: web3,
//           contract: contract,
//         });
//       } catch (error) {
//         console.error("Error connecting to the Ethereum network:", error);
//       }
//     };

//     provider && template();
//   }, []);
import "./App.css";
import React, { useState, useEffect } from "react";
import SimpleStorage from "./contracts/simpleStorage.json"
import Web3 from "web3"; 

function App(){
  
  const [state,setState]= useState({
    web3:null,
    contract:null
  })
  //  const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = SimpleStorage.networks[networkId];
useEffect(()=>{

  async function load(){
    try{

      const web3 = new Web3(window.ethereum);
      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = SimpleStorage.networks[networkId];
      // if(!deployedNetwork){
      //   throw new Error("Contract not deployed on the current network");
      // }
      const contract = new web3.eth.Contract(SimpleStorage.abi,"0x0AF89A43A3777a36bb7f0ACe04d30Eb35D6aE9b6")
      setState({web3:web3,contract:contract})
    }catch(error){
      console.error("Error connecting to the Ethereum network:", error);
    }

  }
   load()
},[])
  // console.log(state)

 async function read(){
  let val = await state.contract.methods.retrieve().call()
  val = parseInt(val)
  console.log(val)
  }

  async function write(event){
    event.preventDefault();
    const Val = document.querySelector("#inp").value
    // console.log(newVal)

    try{

      const newVal = await state.contract.methods.store(Val).send({from:window.web3.currentProvider.selectedAddress,gas:"2000000"})

      console.log(newVal)
    }catch(error){
      console.error("Error sending transaction",error)
    }
  }





 
  // Your component rendering and functionality here

  return (
    <div>
      <button onClick={read}>What is the value</button>

<form onSubmit={write}>
      <input type="text" id="inp" name="setValue" placeholder="Write a value" />
      <button className="setvak" type="submit">Submit the value</button>
</form>
    </div>
  );
}

export default App;

