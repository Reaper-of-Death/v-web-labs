export const Price = ({ price, discountPrice }) => {
	return (
		<div className='inline-flex gap-1'>
			{discountPrice && price ? (
				<>
					<p className='text-base font-semibold'>{discountPrice}</p>
					<p className='text-xs line-through'>{price}</p>
				</>
			) : (
				<p className='text-base font-semibold'>{price}</p>
			)}
		</div>
	);
};