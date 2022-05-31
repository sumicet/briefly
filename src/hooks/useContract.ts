import ConsiderationInterface from '../artifacts/contracts/interfaces/ConsiderationInterface.sol/ConsiderationInterface.json';
import { useWeb3 } from '../web3/useWeb3';

export function useContact() {
    const { web3 } = useWeb3();

    const getContract = () => {
        if (!web3) {
            return;
        }

        const contract = new web3.eth.Contract(ConsiderationInterface.abi as any);

        return contract;
    };
}
