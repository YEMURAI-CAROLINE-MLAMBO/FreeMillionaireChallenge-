import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@/hooks/use-toast';

// Define the ethereum property on Window
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  account: string | null;
  chainId: number | undefined;
  active: boolean;
  library: ethers.providers.Web3Provider | undefined;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  chainId: undefined,
  active: false,
  library: undefined,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
});

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3ContextProvider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const [active, setActive] = useState(false);
  const [library, setLibrary] = useState<ethers.providers.Web3Provider | undefined>(undefined);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

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
            setChainId(network.chainId);
          });
        }
      });
    }
  }, []);

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
        setChainId(parseInt(chainId, 16));
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: 'MetaMask Not Found',
        description: 'Please install MetaMask extension and refresh the page.',
        variant: 'destructive',
      });
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setActive(true);
        
        if (library) {
          const network = await library.getNetwork();
          setChainId(network.chainId);
        }
        
        toast({
          title: 'Wallet Connected',
          description: 'Your wallet has been connected successfully.',
        });
      }
    } catch (error: any) {
      console.error('Error connecting to MetaMask:', error);
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

  return (
    <Web3Context.Provider
      value={{
        account,
        chainId,
        active,
        library,
        connectWallet,
        disconnectWallet,
        isConnecting,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);