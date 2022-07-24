import {
  useMetamask,
  useNetwork,
  useAddress,
  useDisconnect,
} from '@thirdweb-dev/react';
import { useEffect } from "react";
import { ceramicAuthenticate } from '../utils/web3Profile';
import * as dataManager from '../utils/dataManager'
import { useSelectors } from '../store/selectors'


export const ConnectMetamaskButtonComponent = () => {
  const { loadUserFiles } = useSelectors();

  async function connectProfile(address) {
    const { id } = await ceramicAuthenticate(address = address);

    console.log(">> ceramic id: ", id)
    if (id) {
      await dataManager.default.createUserDataStorage(id);
      loadUserFiles();
    }
  }

  // const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  // const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();

  useEffect(() => {
    if (!address) return;

    console.log(">> address: ", address)
    if (address) {
      connectProfile(address);
    }
  }, [address]);

  if (address) {
    return (
      <div>
        {address}
        <br />
        <button onClick={disconnectWallet} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Disconnect</button>
      </div>
    );
  }

  // If no wallet is connected, show connect wallet options
  return (
    <div>
      {/* <button onClick={() => connectWithCoinbaseWallet()}>
        Connect Coinbase Wallet
      </button> */}
      <button onClick={() => connectWithMetamask()} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect MetaMask</button>
      {/* <button onClick={() => connectWithWalletConnect()}>
        Connect WalletConnect
      </button> */}
    </div>
  );
};
