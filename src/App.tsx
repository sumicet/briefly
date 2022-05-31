import { Web3Provider } from './web3/Web3Provider';
import { Home } from './pages/Home/Home';
import { theme } from './theme/default';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
    return (
        <Web3Provider>
            <ChakraProvider theme={theme}>
                <Home />
            </ChakraProvider>
        </Web3Provider>
    );
}

export default App;
