describe('mock', () => {
  let handler;
  const TEST_UUID = 'TEST_UUID';

  jest.mock('crypto', () => ({ randomUUID: () => TEST_UUID }));

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  beforeEach(() => (handler = require('../src/main').handler));

  it('returns mock payload', async () => {
    expect.assertions(1);
    await expect(
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handler({ path: '/prod/test/path/one' } as any, {} as any, () => {})
    ).resolves.toEqual({
      statusCode: 404,
      body: JSON.stringify({
        errorId: TEST_UUID,
        errorCode: 404,
        message: 'Invalid url',
        field: 'path',
        originalValue: '/test/path/one',
        helpUrl: '',
      }),
    });
  });
});
