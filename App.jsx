import React, { useState } from 'react';
import { ethers } from 'ethers';
import CharityDonationABI from '../artifacts/contracts/CharityDonation.sol/CharityDonation.json';

const App = () => {
    const [contractAddress, setContractAddress] = useState('');
    const [showDeployerForm, setShowDeployerForm] = useState(false);
    const [deployerName, setDeployerName] = useState('');
    const [charityDescription, setCharityDescription] = useState('');

    const handleShowForm = () => {
        setShowDeployerForm(true);
    };

    const deployContract = async (event) => {
        event.preventDefault();
        
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            const CharityDonationFactory = new ethers.ContractFactory(
                CharityDonationABI.abi,
                CharityDonationABI.bytecode,
                signer
            );
            
            try {
                const charityDonation = await CharityDonationFactory.deploy(deployerName, charityDescription);
                await charityDonation.deployed();
                
                console.log("CharityDonation deployed to:", charityDonation.address);
                setContractAddress(charityDonation.address);
                setShowDeployerForm(false);
            } catch (error) {
                console.error("Error deploying contract:", error);
            }
        } else {
            console.error("Ethereum wallet not found. Please install MetaMask.");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Charity Donation DApp</h1>
            {!showDeployerForm && (
                <button 
                    onClick={handleShowForm}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Deploy Charity Donation Contract
                </button>
            )}
            {showDeployerForm && (
                <form onSubmit={deployContract} className="space-y-4">
                    <div>
                        <label htmlFor="deployerName" className="block text-sm font-medium text-gray-700">Deployer Name</label>
                        <input
                            type="text"
                            id="deployerName"
                            value={deployerName}
                            onChange={(e) => setDeployerName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="charityDescription" className="block text-sm font-medium text-gray-700">Charity Description</label>
                        <textarea
                            id="charityDescription"
                            value={charityDescription}
                            onChange={(e) => setCharityDescription(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows="3"
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Deploy Contract
                    </button>
                </form>
            )}
            {contractAddress && (
                <p className="mt-4">
                    Contract deployed at: <a href={`https://sepolia.etherscan.io/address/${contractAddress}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{contractAddress}</a>
                </p>
            )}
        </div>
    );
};

export default App;