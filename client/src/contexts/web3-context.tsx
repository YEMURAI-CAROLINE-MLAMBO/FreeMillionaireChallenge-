import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@/hooks/use-toast';

// Define the ethereum property on Window
declare global {
  interface Window {
    ethereum?: any;
  }
}

// RPC URLs for different networks
const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // Ethereum Mainnet
  5: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // Goerli Testnet
  56: 'https://bsc-dataseed.binance.org/', // BSC Mainnet
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/', // BSC Testnet
  137: 'https://polygon-rpc.com/', // Polygon Mainnet
  80001: 'https://rpc-mumbai.maticvigil.com/' // Polygon Mumbai
};

// All supported networks for the application
export const SUPPORTED_CHAINS = [
  // Prioritize Binance Smart Chain (BSC)
  { id: 56, name: 'Binance Smart Chain' },
  { id: 97, name: 'Binance Smart Chain Testnet' },
  // Other networks for fallback
  { id: 1, name: 'Ethereum' },
  { id: 5, name: 'Goerli Testnet' },
  { id: 137, name: 'Polygon' },
  { id: 80001, name: 'Mumbai Testnet' }
];

// Network display names for UI
export const CHAIN_NAMES: Record<number, string> = {
  1: 'Ethereum',
  5: 'Goerli Testnet',
  56: 'BNB Smart Chain',
  97: 'BNB Smart Chain Testnet',
  137: 'Polygon',
  80001: 'Polygon Mumbai'
};

// Currency symbols for each chain
export const CHAIN_CURRENCY: Record<number, string> = {
  1: 'ETH',
  5: 'ETH',
  56: 'BNB',
  97: 'BNB',
  137: 'MATIC',
  80001: 'MATIC'
};

// Supported network parameters
const NETWORK_PARAMS: Record<number, any> = {
  1: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io/']
  },
  5: {
    chainId: '0x5',
    chainName: 'Goerli Testnet',
    nativeCurrency: {
      name: 'Goerli ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://goerli.infura.io/v3/'],
    blockExplorerUrls: ['https://goerli.etherscan.io/']
  },
  56: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/']
  },
  97: {
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/']
  },
  137: {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/']
  },
  80001: {
    chainId: '0x13881',
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
  }
};

// Interface for our Web3 context
interface Web3ContextType {
  account: string | null;
  chainId: number | undefined;
  active: boolean;
  library: ethers.providers.Web3Provider | undefined;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: number) => Promise<boolean>;
  switchToBSC: (testnet?: boolean) => Promise<boolean>;
  isConnecting: boolean;
  isNetworkSupported: boolean;
  networkName: string;
  supportedChains: typeof SUPPORTED_CHAINS;
  chainCurrency: string;
}

// Create context with default values
const Web3Context = createContext<Web3ContextType>({
  account: null,
  chainId: undefined,
  active: false,
  library: undefined,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchNetwork: async () => false,
  switchToBSC: async () => false,
  isConnecting: false,
  isNetworkSupported: false,
  networkName: '',
  supportedChains: SUPPORTED_CHAINS,
  chainCurrency: 'BNB'
});

// Provider props interface
interface Web3ProviderProps {
  children: ReactNode;
}

// The Web3 context provider 
export const Web3ContextProvider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const [active, setActive] = useState(false);
  const [library, setLibrary] = useState<ethers.providers.Web3Provider | undefined>(undefined);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isNetworkSupported, setIsNetworkSupported] = useState(false);
  const [networkName, setNetworkName] = useState('');
  const { toast } = useToast();

  // Derived state
  const chainCurrency = chainId ? (CHAIN_CURRENCY[chainId] || 'ETH') : 'BNB';

  // Check if the current network is supported
  const checkNetworkSupport = (networkId: number) => {
    const isSupported = SUPPORTED_CHAINS.some(c => c.id === networkId);
    setIsNetworkSupported(isSupported);
    setNetworkName(isSupported ? CHAIN_NAMES[networkId] || 'Unknown Network' : 'Unsupported Network');
    
    return isSupported;
  };

  // Initialize provider
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setLibrary(provider);
      
      // Check if already connected
      provider.listAccounts().then(accounts => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setActive(true);
          provider.getNetwork().then(network => {
            const currentChainId = network.chainId;
            setChainId(currentChainId);
            
            // Check if the network is supported
            const isSupported = checkNetworkSupport(currentChainId);
            
            if (!isSupported) {
              toast({
                title: 'Network Not Supported',
                description: `You are currently on ${network.name}. Please switch to a supported network.`,
                variant: 'destructive',
              });
            }
          });
        }
      });
    }
  }, [toast]);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setActive(true);
        } else {
          setAccount(null);
          setActive(false);
        }
      };

      const handleChainChanged = (chainId: string) => {
        const newChainId = parseInt(chainId, 16);
        setChainId(newChainId);
        
        // Check if the new network is supported
        const isSupported = checkNetworkSupport(newChainId);
        
        if (!isSupported) {
          toast({
            title: 'Network Not Supported',
            description: 'You switched to an unsupported network. Some features may not work correctly.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Network Changed',
            description: `Connected to ${CHAIN_NAMES[newChainId] || 'Unknown Network'}`,
          });
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [toast]);

  // Connect to wallet
  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Currently only injected wallet (MetaMask) is supported
      if (!window.ethereum) {
        toast({
          title: 'Wallet Not Found',
          description: 'Please install a Web3 wallet like MetaMask and refresh the page.',
          variant: 'destructive',
        });
        setIsConnecting(false);
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setLibrary(provider);
        setAccount(accounts[0]);
        setActive(true);
        
        const network = await provider.getNetwork();
        const currentChainId = network.chainId;
        setChainId(currentChainId);
        
        // Check if the network is supported
        const isSupported = checkNetworkSupport(currentChainId);
        
        if (!isSupported) {
          toast({
            title: 'Network Not Supported',
            description: `You are currently on ${network.name}. Please switch to a supported network.`,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Wallet Connected',
            description: `Connected to ${CHAIN_NAMES[currentChainId] || 'Unknown Network'}`,
          });
        }
      }
    } catch (error: any) {
      console.error('Error connecting to wallet:', error);
      toast({
        title: 'Connection Failed',
        description: error?.message || 'Failed to connect to your wallet',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect from wallet
  const disconnectWallet = () => {
    setAccount(null);
    setActive(false);
    
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected.',
    });
  };

  // Switch network
  const switchNetwork = async (targetChainId: number): Promise<boolean> => {
    if (!window.ethereum) {
      toast({
        title: 'Wallet Not Found',
        description: 'Please install a Web3 wallet to switch networks.',
        variant: 'destructive',
      });
      return false;
    }
    
    const params = NETWORK_PARAMS[targetChainId];
    if (!params) {
      toast({
        title: 'Network Not Supported',
        description: 'The selected network is not supported.',
        variant: 'destructive',
      });
      return false;
    }
    
    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: params.chainId }],
      });
      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to the wallet
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [params],
          });
          return true;
        } catch (addError) {
          console.error('Error adding network to wallet:', addError);
          toast({
            title: 'Network Add Failed',
            description: 'Unable to add the network to your wallet. Please try manually.',
            variant: 'destructive',
          });
          return false;
        }
      }
      console.error('Error switching network:', switchError);
      toast({
        title: 'Network Switch Failed',
        description: switchError?.message || 'Failed to switch network',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Helper specifically for BSC
  const switchToBSC = async (testnet = false): Promise<boolean> => {
    return switchNetwork(testnet ? 97 : 56);
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        chainId,
        active,
        library,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        switchToBSC,
        isConnecting,
        isNetworkSupported,
        networkName,
        supportedChains: SUPPORTED_CHAINS,
        chainCurrency
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);