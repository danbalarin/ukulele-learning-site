import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Heading } from '@uls/look-react';

import AuthenticationTopbar from './AuthenticationTopbar';
import { Search } from '../Search';

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
                center={<Search keyName="topbar search" />}
                right={<AuthenticationTopbar />}
            />
        </>
    );
}

export default Topbar;
