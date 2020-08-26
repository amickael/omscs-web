import React from 'react';
import { Stack, Text, Link, IconButton, useColorMode } from '@chakra-ui/core';

const Footer = () => {
    const { colorMode, toggleColorMode } = useColorMode(),
        modeIcon: { [key in 'light' | 'dark']: 'moon' | 'sun' } = {
            light: 'moon',
            dark: 'sun',
        };

    return (
        <Stack
            marginBottom={3}
            marginTop="10vh"
            align="center"
            justify="flex-end"
            width="100%"
            height="100%"
        >
            <IconButton
                aria-label="toggle theme"
                icon={modeIcon[colorMode]}
                onClick={toggleColorMode}
                children={null}
                isRound
            />
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
                <Text fontSize="sm">&bull;</Text>
                <Link
                    fontSize="sm"
                    isExternal
                    href="https://stats.uptimerobot.com/ypNE4TNAnP"
                >
                    <i className="fas fa-heart-rate" /> System Status
                </Link>
            </Stack>
        </Stack>
    );
};

export { Footer };
