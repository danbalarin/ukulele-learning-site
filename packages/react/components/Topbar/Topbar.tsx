import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Input, Heading } from '@uls/look-react';
import AuthenticationTopbar from './AuthenticationTopbar';

interface Props {}

function Topbar({}: Props): ReactElement {
    return (
        <>
            <Navbar
                left={
                    <Link to="/">
                        <Heading size="lg">EasyUKU</Heading>
                    </Link>
                }
                center={<Input placeholder="Search..." />}
                right={<AuthenticationTopbar />}
            />
        </>
    );
}

export default Topbar;
