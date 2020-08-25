import React from 'react';
import { Stack, Button, Text, Link, useColorMode } from '@chakra-ui/core';

const Footer = () => {
    const { toggleColorMode } = useColorMode();

    return (
        <Stack
            paddingY={3}
            align="center"
            justify="flex-end"
            width="100%"
            height="100%"
        >
            <Button
                size="sm"
                aria-label="toggle-theme"
                onClick={toggleColorMode}
            >
                <i className="fas fa-adjust" />
            </Button>
            <Stack isInline>
                <Link
                    fontSize="sm"
                    isExternal
                    href="https://www.reddit.com/r/OMSCS/comments/h786ux/spring_2021_admissions_thread/"
                >
                    <i className="fab fa-reddit-alien" /> Reddit
                </Link>
                <Text fontSize="sm">&bull;</Text>
                <Link
                    fontSize="sm"
                    isExternal
                    href="https://github.com/amickael/omscs-web"
                >
                    <i className="fab fa-github" /> GitHub
                </Link>
            </Stack>
        </Stack>
    );
};

export { Footer };
