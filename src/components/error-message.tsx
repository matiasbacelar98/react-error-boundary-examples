import { Flex, Callout, Button } from '@radix-ui/themes';

import { PlaystationX } from 'tabler-icons-react';

import { FallbackProps } from 'react-error-boundary';

export default function ErrorMessage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <Flex direction='column' gapY='2' mt='3'>
      <Callout.Root color='red'>
        <Callout.Icon>
          <PlaystationX />
        </Callout.Icon>
        <Callout.Text>{error.message}</Callout.Text>
      </Callout.Root>

      <Button
        onClick={() => resetErrorBoundary()}
        variant='outline'
        color='red'
      >
        Try again
      </Button>
    </Flex>
  );
}
