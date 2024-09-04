import { ErrorBoundary } from 'react-error-boundary';

import Layout from '../layout';
import ErrorMessage from '../error-message';

export default function RenderingError() {
  return (
    <Layout type='rendering'>
      <ErrorBoundary
        FallbackComponent={ErrorMessage}
        onReset={() => console.log('Reset fire!!!')}
        onError={error => console.log(`Logging =>`, error)}
      >
        <ComponentWithError />
      </ErrorBoundary>
    </Layout>
  );
}

function ComponentWithError({ fail = true }: { fail?: boolean }) {
  if (fail) throw new Error('This component failed!');
  return <div>This is a component that's gonna failed</div>;
}
