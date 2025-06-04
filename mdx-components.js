export function useMDXComponents(components) {
  return {
    h1: ({ children }) => (
      <h1 style={{ color: 'red', fontSize: '48px' }} className='text-xl'>{children}</h1>
    ),
    ...components,
  }
}