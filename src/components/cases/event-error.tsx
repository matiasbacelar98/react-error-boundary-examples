import React from 'react';

import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';

import Layout from '../layout';
import ErrorMessage from '../error-message';
import { Button, Card, Flex, Text } from '@radix-ui/themes';

export default function EventError() {
  return (
    <Layout type='event'>
      <ErrorBoundary
        FallbackComponent={ErrorMessage}
        onReset={() => console.log('onReset Event')}
        onError={() => console.log('onError Event')}
      >
        <Counter />
      </ErrorBoundary>
    </Layout>
  );
}

const MAX_COUNT_NUMBER = 5;

function Counter() {
  const [count, setCount] = React.useState(0);
  const { showBoundary } = useErrorBoundary();

  function handleClick() {
    const newCount = count + 1;

    try {
      if (newCount >= MAX_COUNT_NUMBER) {
        throw new Error('Count limit exceeded');
      }

      setCount(prev => prev + 1);
    } catch (error) {
      showBoundary(error);
    }
  }

  return (
    <Flex direction='column' align='center' gapY='2'>
      <Card>
        <Flex gap='3' align='center'>
          <Text as='div' size='2' weight='bold'>
            Current count:
          </Text>
          <Text as='div' size='2' color='gray'>
            {count}
          </Text>
        </Flex>
      </Card>

      <Button onClick={() => handleClick()}>Add</Button>
    </Flex>
  );
}
