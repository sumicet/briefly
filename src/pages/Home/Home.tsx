import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useWeb3 } from '../../web3/useWeb3';

export function Home() {
    const { account, contract } = useWeb3();

    useEffect(() => {
        const execute = async () => {
            if (contract && account) {
                const response = await contract.methods.information().call({ from: account });
                console.log('Response:', response);
            }
        };
        execute();
    }, [account, contract]);

    return (
        <>
            <Flex flex='1' flexDirection='column' alignItems='center' justifyContent='center'>
                <h1>hello, {account}</h1>
            </Flex>
        </>
    );
}
