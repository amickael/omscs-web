import React from 'react';
import {
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Stack,
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
    return (
        <Stack>
            <StatGroup>
                <Stat>
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
                <Stat>
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
                <Stat>
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
            <StatHelpText>
                As of {format(new Date(data.ProcessEpoch ?? 0), 'PPPp')}{' '}
            </StatHelpText>
        </Stack>
    );
};

export { Stats };
