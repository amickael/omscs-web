import useSWR from 'swr';
import { fetcher } from './fetcher';
import { Statistic } from '../types/Statistic';

export const useStats = () => {
    const { data, error } = useSWR(
        `${process.env.REACT_APP_API_ENDPOINT}/stats`,
        fetcher
    );

    return {
        data: data as Statistic[],
        isLoading: !error && !data,
        isError: error,
    };
};
