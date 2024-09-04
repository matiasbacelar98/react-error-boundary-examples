import { ErrorBoundary } from 'react-error-boundary';
import useSWR from 'swr';

import { Card, Flex, Grid, Badge, Text, Box } from '@radix-ui/themes';

import Layout from '../layout';
import ErrorMessage from '../error-message';

export default function FetchingError() {
  return (
    <Layout type='fetching'>
      <ErrorBoundary
        FallbackComponent={ErrorMessage}
        onReset={() => console.log('Reset fire!!!')}
        onError={error => console.log(error)}
      >
        <Stocks />
      </ErrorBoundary>
    </Layout>
  );
}

//------ Stock ------//
const ENDPOINT = `https://jor-test-api.vercel.app/api/get-stock-quotes?simulatedError=true`;

async function fetcher<T>(endpoint: string): Promise<T[]> {
  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }

  const json = await res.json();
  return json.data;
}

interface Item {
  id: string;
  title: string;
  value: string;
  change: number;
}

function Stocks() {
  const { data, isLoading, error } = useSWR(ENDPOINT, fetcher<Item>);

  if (error) throw error;

  return isLoading ? null : (
    <Grid columns='2' gap='3' rows='repeat(2, 64px)' width='600px' pt='5'>
      {data?.map(item => (
        <Box key={item.id} maxWidth='240px'>
          <Card>
            <Flex align='center' justify='between'>
              <Text>{item.title}</Text>
              <Badge color='green'>{item.value}</Badge>
            </Flex>
          </Card>
        </Box>
      ))}
    </Grid>
  );
}
