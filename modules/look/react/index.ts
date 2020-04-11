/**
 * Provides interfacing layer between ULS and some UI library. Easyly swapable, all react submodules should use this.
 */

export {
    Input,
    InputGroup,
    PasswordInput,
    InputLeftAddon,
    InputRightAddon,
} from './components/Input';
export { Editable } from './components/Editable';
export { Card } from './components/Card';
export { ComponentWrapper } from './components/ComponentWrapper';
export { FormControl } from './components/FormControl';
export { FormErrorMessage } from './components/FormErrorMessage';
export { Checkbox } from './components/Checkbox';
export { Button } from './components/Button';
export { Stack } from './components/Stack';
export { Navbar } from './components/Navbar';
export { Modal } from './components/Modal';
export { Table } from './components/Table';
export { Heading } from './components/Heading';
export { ColorSwitch } from './components/ColorSwitch';
export { Icon } from './components/Icon';
export {
    SearchInput,
    SearchGroup,
    SearchOption,
} from './components/SearchInput';
// export { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/core';
// export { Menu, MenuButton, MenuList } from './components/Menu';

export { ThemeProvider } from './components/ThemeProvider';
export { ColorModeProvider } from './components/ColorModeProvider';

export { useColorMode } from './hooks/useColorMode';
export { useDisclosure } from './hooks/useDisclosure';
export { useInterval } from './hooks/useInterval';

export { createGlobalStyle } from './theme';
export { default as Theme } from './theme';

// setup font awesome
import { dom, config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
const inlineCSS = dom.css();

export { inlineCSS };
