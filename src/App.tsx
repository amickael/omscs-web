import React, { useState } from 'react';
import {
    Flex,
    Stack,
    Button,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/core';
import { useStats } from './api';
import { format } from 'date-fns';
import sortedUniqBy from 'lodash/sortedUniqBy';
import { Stats, Header, Chart } from './features';
import Papa from 'papaparse';

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0),
        { data, isLoading, isError } = useStats(),
        parsedData = sortedUniqBy(
            data?.map((item) => ({
                ...item,
                displayDate: format(new Date(item.Timestamp), 'P'),
            })) ?? [],
            (item) => item.displayDate
        ),
        statData = parsedData.map((item, i) => ({
            ...item,
            varPending:
                item.Pending - (parsedData?.[i + 1]?.Pending ?? item.Pending),
            varAccepted:
                item.Accepted -
                (parsedData?.[i + 1]?.Accepted ?? item.Accepted),
            varRejected:
                item.Rejected -
                (parsedData?.[i + 1]?.Rejected ?? item.Rejected),
        })),
        chartData = parsedData
            .map((item, i) => ({
                ...item,
                dataIndex: i,
            }))
            .sort((a, b) => a.Timestamp - b.Timestamp),
        selectedData = statData?.[currentIndex] ?? {};

    const handleMouseOver = (payload: any) => {
            setCurrentIndex(
                payload?.activePayload?.[0]?.payload?.dataIndex ?? 0
            );
        },
        handleDownload = () => {
            const dataString = Papa.unparse(data ?? [], { newline: '\r\n' }),
                dataUri = `data:text/csv;charset=utf-8,${dataString}`,
                el = document.createElement('a');
            el.setAttribute('style', 'display: none');
            el.setAttribute('href', dataUri);
            el.setAttribute('download', 'omscs-data.csv');
            document.body.appendChild(el);
            el.click();
            document.body.removeChild(el);
        };

    if (isLoading) {
        return <Spinner size="xl" marginTop="25vh" alignSelf="center" />;
    }

    if (isError) {
        return (
            <Alert
                status="error"
                variant="subtle"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
                height="200px"
                marginTop="25vh"
            >
                <AlertIcon size="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                    Error loading data
                </AlertTitle>
                <AlertDescription maxWidth="md">
                    There was a problem loading data, please try again later.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <Flex justify="center" paddingX={2}>
            <Stack width="100%" maxWidth="1000px">
                <Stack paddingY={10}>
                    <Header heading="Georgia Tech OMSCS Decisions">
                        {selectedData?.Matriculation ?? ''}
                    </Header>
                    <Stats data={selectedData} />
                </Stack>
                <Chart
                    data={chartData}
                    onMouseOver={handleMouseOver}
                    onMouseOut={() => setCurrentIndex(0)}
                />
                <Button
                    size="sm"
                    onClick={handleDownload}
                    marginTop={5}
                    aria-label="download"
                    isDisabled={!data}
                    maxWidth={250}
                    alignSelf="center"
                >
                    <i className="fas fa-download" />
                    &nbsp;Download Data
                </Button>
            </Stack>
        </Flex>
    );
};

export default App;
