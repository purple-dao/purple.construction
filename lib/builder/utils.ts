import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(relativeTime);

export const logWarning = (type: string, collection: string, chain: string = 'MAINNET') => {
  console.warn(
    `BUILDER: ${type}. Double check that the collection address and chain are correct or retry the query.\n\ncollection: ${collection}\nchain: ${chain}`
  );
};

// TODO would want something more robust for multiple chains
const DEFAULT_GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? '';

export const fetchDataWithQuery = async (
  query: string,
  variables: Record<string, any> = {},
  url: string = DEFAULT_GRAPHQL_URL
) => {
  try {
    const response = await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ query, variables }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchDataWithQueries = async (
  queries: string[],
  variables: Record<string, any> = {}
) => {
  return await Promise.all(
    queries.map(async (query) => {
      return await fetchDataWithQuery(query, variables);
    })
  );
};

export const relative = (timestamp: number) => {
  if (!timestamp) return '';
  return dayjs.unix(timestamp / 1000).fromNow(false);
};

export const trunc = (address: string) => {
  if (!address) return '';
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
};
