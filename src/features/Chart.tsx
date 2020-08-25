import React from 'react';
import { Box, useTheme, useColorMode } from '@chakra-ui/core';
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from 'recharts';
import { Statistic } from '../types/Statistic';

interface ExtendedStatistic extends Statistic {
    displayDate: string;
    dataIndex: number;
}

interface ChartProps {
    data: ExtendedStatistic[];
    onMouseOver: (payload: any) => void;
}

const Chart = ({ data, onMouseOver }: ChartProps) => {
    const theme = useTheme(),
        { colorMode } = useColorMode(),
        bgColor = {
            light: theme.colors.gray[100],
            dark: theme.colors.gray[900],
        },
        textColor = {
            light: theme.colors.gray[900],
            dark: theme.colors.gray[100],
        };

    return (
        <Box width={['100%', '95%']}>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    data={data}
                    onMouseOver={onMouseOver}
                    maxBarSize={100}
                >
                    <XAxis
                        dataKey="displayDate"
                        tickLine={false}
                        interval="preserveStartEnd"
                    />
                    <YAxis tickLine={false} width={35} />
                    <Tooltip
                        separator=": "
                        cursor={{
                            fill: bgColor[colorMode],
                        }}
                        contentStyle={{
                            backgroundColor: bgColor[colorMode],
                            color: textColor[colorMode],
                            borderColor: textColor[colorMode],
                            borderRadius: 5,
                            minWidth: 200,
                        }}
                    />
                    <Legend />
                    <Bar
                        dataKey="Rejected"
                        stackId="a"
                        fill={theme.colors.red[500]}
                    />
                    <Bar
                        dataKey="Accepted"
                        stackId="a"
                        fill={theme.colors.green[500]}
                    />
                    <Bar
                        dataKey="Pending"
                        stackId="a"
                        fill={theme.colors.blue[500]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export { Chart };
