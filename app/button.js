// button.js
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { WEB3AUTH_NETWORK, CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

export async function GetInfo() { 
  const clientId = "BFiuA5BrpT3AnGmZe-GBKnjuco0RyfF4vTIzgJWlCjIFwe4GYcLIdTCPU72cUAhGVUOdBvf0R1f--3rA7gZX7hI";

  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x66eee", // Hex of 421614
    rpcTarget: "https://rpc.ankr.com/arbitrum_sepolia",
    displayName: "Arbitrum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.arbiscan.io/",
    ticker: "AETH",
    tickerName: "AETH",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig: chainConfig },
  });

  const web3auth = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    privateKeyProvider,
  });

  // Create OpenloginAdapter instance once you have created Web3Auth instance
  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      loginConfig: {
        // Google login
        google: {
          verifier: "Google-Identifier-Test", // Pass the Verifier name here
          typeOfLogin: "google", // Pass on the login provider of the verifier you've created
          clientId: "897889902250-q6u58np3d4qtiq28bo8cne1qol93d0g0.apps.googleusercontent.com", // Pass on the Google `Client ID` here
        },
      },
    },
  });

  // Configure the adapter with Web3Auth
  web3auth.configureAdapter(openloginAdapter);

  // Initialize Modal
  await web3auth.initModal();

  // Login with Google
  await web3auth.connect();

  const user = await web3auth.getUserInfo();
  console.log(user); // You might want to display or use this info in the UI
  return user;
}
