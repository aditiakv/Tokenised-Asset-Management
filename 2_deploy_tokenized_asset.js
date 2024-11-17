// migrations/2_deploy_tokenized_asset.js
const TokenizedAsset = artifacts.require("TokenizedAsset");

module.exports = function (deployer) {
  // Set the initial supply for the token, should be a valid integer.
  const initialSupply = 1000000;  // You can modify this value as needed.

  // Deploy the contract with the initial supply
  deployer.deploy(TokenizedAsset, initialSupply, { gas: 5000000 })
    .then(() => {
      console.log("TokenizedAsset contract deployed successfully!");
    })
    .catch((err) => {
      console.error("Deployment failed:", err);
    });
};
