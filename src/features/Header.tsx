import React from 'react';
import { Heading, Text, Stack } from '@chakra-ui/core';

interface HeaderProps {
    heading: string;
    children: string;
}

const beautifyMatriculation = (matriculation: string): string => {
    return `${matriculation.substring(
        0,
        matriculation.length - 4
    )} ${matriculation.substr(matriculation.length - 4)}`;
};

const Header = ({ heading, children }: HeaderProps) => {
    return (
        <Stack>
            <Heading as="h3" size="lg">
                {heading}
            </Heading>
            <Text fontSize="lg" paddingBottom={2}>
                {beautifyMatriculation(children)}
            </Text>
        </Stack>
    );
};

export { Header };
