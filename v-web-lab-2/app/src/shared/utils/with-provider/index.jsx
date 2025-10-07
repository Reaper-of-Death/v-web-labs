export function withProvider(ProviderComponent, staticProviderProps) {
	// eslint-disable-next-line no-unused-vars
	return function wrapWithProvider(WrappedComponent) {
		return function ProviderWrapper(props) {
			const providerProps = {
				...staticProviderProps,
				...props,
			};

			return (
				<ProviderComponent {...providerProps}>
					<WrappedComponent {...props} />
				</ProviderComponent>
			);
		};
	};
}