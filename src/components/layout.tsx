import { Container, Heading, Flex } from '@radix-ui/themes';

export default function Layout({
  type,
  children,
}: {
  type: string;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Container size='4' align='center' p='4'>
      <Flex direction='column' gap='3' align='center'>
        <Heading color='green'>Error boundary ({type})</Heading>
        {children}
      </Flex>
    </Container>
  );
}
