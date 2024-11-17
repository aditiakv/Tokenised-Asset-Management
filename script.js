// Initialize Web3
const web3 = new Web3(window.ethereum || "http://localhost:7545");

// Request account access if needed
if (window.ethereum) {
    window.ethereum.request({ method: "eth_requestAccounts" })
        .then(accounts => console.log("Connected accounts:", accounts))
        .catch(error => console.error("Error connecting to MetaMask:", error));
}

// Function to get balance of the first connected account
async function getBalance() {
    try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            throw new Error("No accounts found. Please connect to MetaMask or another wallet.");
        }

        const balance = await web3.eth.getBalance(accounts[0]);
        document.getElementById("output").innerText = `Balance: ${web3.utils.fromWei(balance, "ether")} ETH`;
    } catch (error) {
        document.getElementById("output").innerText = `Error: ${error.message}`;
    }
}

// Function to transfer tokens
async function transferTokens() {
    try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            throw new Error("No accounts found. Please connect to MetaMask or another wallet.");
        }

        const receiver = prompt("Enter the receiver's address:");
        if (!web3.utils.isAddress(receiver)) {
            throw new Error("Invalid address entered.");
        }

        const amount = prompt("Enter the amount to transfer (in ETH):");
        if (isNaN(amount) || parseFloat(amount) <= 0) {
            throw new Error("Invalid amount entered. Please enter a positive number.");
        }

        const amountInWei = web3.utils.toWei(amount, "ether");
        
        await web3.eth.sendTransaction({
            from: accounts[0],
            to: receiver,
            value: amountInWei
        });

        document.getElementById("output").innerText = `Transaction successful! ${amount} ETH transferred.`;
    } catch (error) {
        document.getElementById("output").innerText = `Error: ${error.message}`;
    }
}

// Event listeners for button clicks
document.getElementById("check-balance").addEventListener("click", getBalance);
document.getElementById("transfer-tokens").addEventListener("click", transferTokens);