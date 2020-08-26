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
import { useSpring, animated } from 'react-spring';

interface ExtendedStatistic extends Statistic {
    varPending: number;
    varAccepted: number;
    varRejected: number;
}

interface StatsProps {
    data: ExtendedStatistic;
}

const AnimatedStatNumber = animated(StatNumber);
const Stats = ({ data }: StatsProps) => {
    const spring = useSpring({
        from: { pending: 0, accepted: 0, rejected: 0 },
        pending: data.Pending ?? 0,
        accepted: data.Accepted ?? 0,
        rejected: data.Rejected ?? 0,
        config: { mass: 1, tension: 200, friction: 20, clamp: true },
    });

    return (
        <Stack>
            <StatGroup>
                <Stat display="flex" flexDirection="column" alignItems="center">
                    <StatLabel>Pending</StatLabel>
                    <AnimatedStatNumber>
                        {spring.pending.interpolate((value) =>
                            Math.round(value)
                        )}
                    </AnimatedStatNumber>
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
                    <AnimatedStatNumber>
                        {spring.accepted.interpolate((value) =>
                            Math.round(value)
                        )}
                    </AnimatedStatNumber>
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
                    <AnimatedStatNumber>
                        {spring.rejected.interpolate((value) =>
                            Math.round(value)
                        )}
                    </AnimatedStatNumber>
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
