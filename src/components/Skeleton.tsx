

export const Skeleton = () => {
	return (
		<div role="status"
		     className="max-w p-4  border border-gray-200 rounded-lg shadow animate-pulse md:p-6 dark:border-gray-700">

			<div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-4/12 mb-5"></div>
			<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20  mb-5"></div>
			<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
			{/*<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>*/}
			<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-5/12"></div>
			<div className="h-10 bg-gray-200 rounded dark:bg-gray-700 w-28 mt-5"></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};