import React from 'react';
import {
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Stack,
    useColorMode,
    useTheme,
} from '@chakra-ui/core';
import { Statistic } from '../types/Statistic';
import { format } from 'date-fns';

interface ExtendedStatistic extends Statistic {
    varPending: number;
    varAccepted: number;
    varRejected: number;
}

interface StatsProps {
    data: ExtendedStatistic;
}

const Stats = ({ data }: StatsProps) => {
    const { colorMode } = useColorMode(),
        theme = useTheme(),
        borderColor = {
            light: theme.colors.gray[300],
            dark: theme.colors.gray[600],
        };

    return (
        <Stack
            padding={3}
            borderColor={borderColor[colorMode]}
            borderWidth={2}
            borderRadius={5}
        >
            <StatGroup>
                <Stat display="flex" flexDirection="column" alignItems="center">
                    <StatLabel>Pending</StatLabel>
                    <StatNumber>{data.Pending}</StatNumber>
                    <StatHelpText>
                        <StatArrow
                            type={
                                data.varPending >= 0 ? 'increase' : 'decrease'
                            }
                        />
                        {Math.abs(data.varPending)}
                    </StatHelpText>
                </Stat>
                <Stat display="flex" flexDirection="column" alignItems="center">
                    <StatLabel>Accepted</StatLabel>
                    <StatNumber>{data.Accepted}</StatNumber>
                    <StatHelpText>
                        <StatArrow
                            type={
                                data.varAccepted >= 0 ? 'increase' : 'decrease'
                            }
                        />
                        {Math.abs(data.varAccepted)}
                    </StatHelpText>
                </Stat>
                <Stat display="flex" flexDirection="column" alignItems="center">
                    <StatLabel>Rejected</StatLabel>
                    <StatNumber>{data.Rejected}</StatNumber>
                    <StatHelpText>
                        <StatArrow
                            type={
                                data.varRejected >= 0 ? 'increase' : 'decrease'
                            }
                        />
                        {Math.abs(data.varRejected)}
                    </StatHelpText>
                </Stat>
            </StatGroup>
            <StatHelpText alignSelf="center">
                As of {format(new Date(data.Timestamp ?? 0), 'PPPp')}
            </StatHelpText>
        </Stack>
    );
};

export { Stats };
