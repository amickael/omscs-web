export const fetcher = (...args: [string, object]) =>
    fetch(...args).then((res) => res.json());
