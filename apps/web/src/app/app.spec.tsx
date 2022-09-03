import { cleanup, getByText, render, waitFor } from '@testing-library/react';
import React from 'react';
import Index from './app';

describe('App', () => {
  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete global['fetch'];
    cleanup();
  });

  it('should render successfully', async () => {
    global['fetch'] = jest.fn().mockResolvedValueOnce({
      json: () => ({
        message: 'my message',
      }),
    });

    const { baseElement } = render(<Index />);
    await waitFor(() => getByText(baseElement, 'my message'));
  });
});
