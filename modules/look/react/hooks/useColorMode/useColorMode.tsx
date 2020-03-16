import { useColorMode as useColorModeChakra } from '@chakra-ui/core';

export interface UseColorMode {
    colorMode: 'light' | 'dark';
    toggleColorMode: () => void;
}

const useColorMode: () => UseColorMode = useColorModeChakra;

export default useColorMode;
