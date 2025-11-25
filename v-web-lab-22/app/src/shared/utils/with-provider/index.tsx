import type { ComponentType, ReactElement } from 'react';

// Вариант 1: Универсальный вариант с дженериками
export function withProvider<P extends object>(
  ProviderComponent: ComponentType<P>,
  staticProviderProps?: Partial<P>
) {
  return function wrapWithProvider<W extends object>(
    WrappedComponent: ComponentType<W>
  ) {
    return function ProviderWrapper(props: W): ReactElement {
      const providerProps = {
        ...staticProviderProps,
        ...props,
      } as unknown as P;

      return (
        <ProviderComponent {...providerProps}>
          <WrappedComponent {...props} />
        </ProviderComponent>
      );
    };
  };
}