import React, { useState } from 'react';
import { Stack } from '@chakra-ui/core';
import { useStats } from './api';
import { format } from 'date-fns';
import sortedUniqBy from 'lodash/sortedUniqBy';
import { Stats, Header, Chart } from './features';

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0),
        { data } = useStats(),
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
        chartData = sortedUniqBy(
            parsedData.map((item, i) => ({
                ...item,
                dataIndex: i,
                displayDate: format(new Date(item.ProcessEpoch), 'P'),
            })),
            (item) => item.displayDate
        ).sort((a, b) => a.ProcessEpoch - b.ProcessEpoch),
        selectedData = parsedData?.[currentIndex] ?? {};

    const handleMouseOver = (payload: any) => {
        setCurrentIndex(payload?.activePayload?.[0]?.payload?.dataIndex ?? 0);
    };

    return (
        <Stack align="center">
            <Stack width={['90%', '50%', '35%']} justify="center" paddingY={10}>
                <Header heading="Georgia Tech OMSCS Decisions">
                    {selectedData?.Matriculation ?? ''}
                </Header>
                <Stats data={selectedData} />
            </Stack>
            <Chart data={chartData} onMouseOver={handleMouseOver} />
        </Stack>
    );
};

export default App;
