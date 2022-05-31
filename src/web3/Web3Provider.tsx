import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import Seaport from '../artifacts/contracts/Seaport.sol/Seaport.json';
import { MetaMask } from '@web3-react/metamask';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Web3 from 'web3';
import { metaMask, metaMaskHooks } from './metaMask';

interface Web3ContextProps {
    web3: Web3 | null;
    account: string | null;
    contract: any;
}

const initial: Web3ContextProps = {
    web3: null,
    account: null,
    contract: null,
};

export const Web3Context = createContext<Web3ContextProps>(initial);

function LocalWeb3Provider({ children }: { children: ReactNode }) {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const { account } = useWeb3React();
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const execute = async () => {
            await metaMask.connectEagerly();
            const newWeb3Instance = new Web3(metaMask.provider as any);
            const contract = new newWeb3Instance.eth.Contract(
                Seaport.abi as any,
                '0x00000000006CEE72100D161c57ADA5Bb2be1CA79'
            );

            setContract(contract);
            setWeb3(newWeb3Instance);
        };
        execute();
    }, []);

    const memoValue = useMemo(
        () => ({ web3, account: account || null, contract }),
        [account, web3, contract]
    );

    return <Web3Context.Provider value={memoValue}>{children}</Web3Context.Provider>;
}

export function Web3Provider({ children }: { children: ReactNode }) {
    const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

    return (
        <Web3ReactProvider connectors={connectors}>
            <LocalWeb3Provider>{children}</LocalWeb3Provider>
        </Web3ReactProvider>
    );
}
