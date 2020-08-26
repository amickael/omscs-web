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
import { useMediaQuery } from 'react-responsive';
import { Statistic } from '../types/Statistic';

interface ExtendedStatistic extends Statistic {
    displayDate: string;
    dataIndex: number;
}

interface ChartProps {
    data: ExtendedStatistic[];
    onMouseOver: (payload: any) => void;
    onMouseOut: () => void;
}

const Chart = ({ data, onMouseOver, onMouseOut }: ChartProps) => {
    const theme = useTheme(),
        { colorMode } = useColorMode(),
        bgColor = {
            light: theme.colors.gray[50],
            dark: theme.colors.gray[900],
        },
        textColor = {
            light: theme.colors.gray[800],
            dark: theme.colors.gray[200],
        },
        isMobile = useMediaQuery({ maxWidth: 640 });

    return (
        <Box width="100%" maxWidth="1000px">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    data={data}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    maxBarSize={100}
                >
                    <XAxis
                        dataKey="displayDate"
                        tickLine={false}
                        interval="preserveStartEnd"
                        stroke={textColor[colorMode]}
                        tick={{
                            fontSize: '0.9rem',
                        }}
                    />
                    <YAxis
                        hide={isMobile}
                        tickLine={false}
                        width={35}
                        stroke={textColor[colorMode]}
                        tick={{
                            fontSize: '0.9rem',
                        }}
                    />
                    <Tooltip
                        separator=": "
                        cursor={{
                            fill: bgColor[colorMode],
                        }}
                        contentStyle={{
                            backgroundColor: bgColor[colorMode],
                            color: textColor[colorMode],
                            borderColor: textColor[colorMode],
                            fontWeight: 600,
                            borderRadius: 5,
                            minWidth: 200,
                        }}
                    />
                    <Legend />
                    <Bar
                        dataKey="Pending"
                        stackId="a"
                        fill={theme.colors.blue[400]}
                    />
                    <Bar
                        dataKey="Accepted"
                        stackId="a"
                        fill={theme.colors.green[400]}
                    />
                    <Bar
                        dataKey="Rejected"
                        stackId="a"
                        fill={theme.colors.red[400]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export { Chart };
