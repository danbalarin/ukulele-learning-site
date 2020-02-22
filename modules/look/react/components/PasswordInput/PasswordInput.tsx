import React, { ReactElement } from 'react';

import { InputGroup } from '../InputGroup';
import { Input } from '../Input';
import { Button } from '../Button';
import { InputElement } from '../InputElement';
import { InputProps } from '../Input';

interface Props extends InputProps {}

function PasswordInput(props: Props) {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size="md">
            <Input
                {...props}
                pr="4.5rem"
                type={show && !props.disabled ? 'text' : 'password'}
                placeholder={props.placeholder}
            />
            <InputElement alignment="right" width="4.5rem">
                <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                    disabled={props.disabled}
                    tabIndex={-1}
                    variant="solid"
                >
                    {show && !props.disabled ? 'Hide' : 'Show'}
                </Button>
            </InputElement>
        </InputGroup>
    );
}

export default PasswordInput;
