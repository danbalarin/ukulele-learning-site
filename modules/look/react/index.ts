/**
 * Provides interfacing layer between ULS and some UI library. Easyly swapable, all react submodules should use this.
 */

export * from './components/Input';
export * from './components/DataTable';
export { Editable } from './components/Editable';
export { AsyncSelect } from './components/AsyncSelect';
export { DisplayBox } from './components/DisplayBox';
export { Card } from './components/Card';
export { CSSReset } from './components/CSSReset';
export { ComponentWrapper } from './components/ComponentWrapper';
export { FormLabel } from './components/FormLabel';
export { FormControl } from './components/FormControl';
export { FormErrorMessage } from './components/FormErrorMessage';
export { Checkbox } from './components/Checkbox';
export { Button } from './components/Button';
export { Stack } from './components/Stack';
export { Navbar } from './components/Navbar';
export { Modal } from './components/Modal';
export { Heading } from './components/Heading';
export { ColorSwitch } from './components/ColorSwitch';
export { Icon, IconName } from './components/Icon';
export * from './components/SearchInput';
export * from './components/Menu';

export { ThemeProvider } from './components/ThemeProvider';
export { ColorModeProvider } from './components/ColorModeProvider';

export { useColorMode } from './hooks/useColorMode';
export { useDisclosure } from './hooks/useDisclosure';
export { useInterval } from './hooks/useInterval';
export { useToast } from './hooks/useToast';

export { createGlobalStyle } from './theme';
export { default as Theme } from './theme';

// setup font awesome
import { dom, config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
const inlineCSS = dom.css();

export { inlineCSS };
