export const Title = ({ title, className = ""  }) => {
	return <p className={`text-sm font-medium text-gray-800 line-clamp-2 ${className}`}>{title}</p>;
};