import AuthNoModal from "@web3auth/no-modal";
import Web3AuthNetwork from "@web3auth/base";
import EthereumProvider from '@web3auth/ethereum-provider';
import Openlogin from "@web3auth/openlogin-adapter";

const { OpenloginAdapter } = Openlogin;
const { EthereumPrivateKeyProvider } = EthereumProvider;
const { Web3AuthNoModal } = AuthNoModal;
const { WEB3AUTH_NETWORK, CHAIN_NAMESPACES } = Web3AuthNetwork;

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x66eee", // Hex of 421614
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    rpcTarget: "https://rpc.ankr.com/arbitrum_sepolia",
    displayName: "Arbitrum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.arbiscan.io/",
    ticker: "AETH",
    tickerName: "AETH",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
  };

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const clientId = "BFiuA5BrpT3AnGmZe-GBKnjuco0RyfF4vTIzgJWlCjIFwe4GYcLIdTCPU72cUAhGVUOdBvf0R1f--3rA7gZX7hI";

const web3auth = new Web3AuthNoModal({
  clientId, // Get it from Web3Auth Dashboard
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

const openloginAdapter = new OpenloginAdapter({
  privateKeyProvider,
});

web3auth.configureAdapter(openloginAdapter);
