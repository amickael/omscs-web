import React from 'react';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Stack,
    Heading,
    Text,
} from '@chakra-ui/core';
import { useStats } from './api';
import { format } from 'date-fns';

const App = () => {
    const { data } = useStats(),
        sortedData =
            data?.sort((a, b) => b.ProcessEpoch - a.ProcessEpoch) ?? [],
        parsedData = sortedData.map((item, i) => ({
            ...item,
            varPending:
                item.Pending - (sortedData?.[i + 1]?.Pending ?? item.Pending),
            varAccepted:
                item.Accepted -
                (sortedData?.[i + 1]?.Accepted ?? item.Accepted),
            varRejected:
                item.Rejected -
                (sortedData?.[i + 1]?.Rejected ?? item.Rejected),
        })),
        selectedData = parsedData?.[0] ?? {};

    return (
        <Stack align="center">
            <Stack width={['90%', '50%', '35%']} justify="center" paddingY={10}>
                <Heading as="h3" size="lg">
                    Georgia Tech OMSCS Decisions
                </Heading>
                <Text fontSize="lg" paddingBottom={2}>
                    Spring 2021
                </Text>
                <StatGroup justify="centr">
                    <Stat>
                        <StatLabel>Pending</StatLabel>
                        <StatNumber>{selectedData.Pending}</StatNumber>
                        <StatHelpText>
                            <StatArrow
                                type={
                                    selectedData.varPending >= 0
                                        ? 'increase'
                                        : 'decrease'
                                }
                            />
                            {selectedData.varPending}
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Accepted</StatLabel>
                        <StatNumber>{selectedData.Accepted}</StatNumber>
                        <StatHelpText>
                            <StatArrow
                                type={
                                    selectedData.varAccepted >= 0
                                        ? 'increase'
                                        : 'decrease'
                                }
                            />
                            {selectedData.varAccepted}
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Rejected</StatLabel>
                        <StatNumber>{selectedData.Rejected}</StatNumber>
                        <StatHelpText>
                            <StatArrow
                                type={
                                    selectedData.varRejected >= 0
                                        ? 'increase'
                                        : 'decrease'
                                }
                            />
                            {selectedData.varRejected}
                        </StatHelpText>
                    </Stat>
                </StatGroup>
                <StatHelpText>
                    As of{' '}
                    {format(new Date(selectedData.ProcessEpoch ?? 0), 'PPPpp')}
                </StatHelpText>
            </Stack>
        </Stack>
    );
};

export default App;
