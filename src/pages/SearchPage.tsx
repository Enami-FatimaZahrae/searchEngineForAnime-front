import SearchBar from "../components/SearchBar.tsx";
import {Link, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import PdfViewer from "../components/PdfViewer.tsx";
import {Skeleton} from "../components/Skeleton.tsx";
import {userService} from "../services/userService.ts";

export const SearchPage = () => {
	const [params] = useSearchParams();
	const [data, setData] = useState([]);
	const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);
	const [correct_query, setCorrect_query] = useState()
	const userId = localStorage.getItem('userId');
	const query = params.get('query');
	const token = localStorage.getItem("authToken");
	const url = `http://localhost:8080/animes/search?query=`;
	

	useEffect(() => {
		setLoading(false);
		getSearchResults();
	}, [query]);

	const getSearchResults = async () => {
		await axios.get(userId !== '' ? `${url}${query}&userId=${userId}` : url+query)
			.then(res => {
				setData(res.data.results);
				setCorrect_query(res.data.correct_query)
				console.log(res.data);
			}).finally(() => {
				setLoading(true);
			});
		console.log(Math.ceil(data.length / itemsPerPage),currentPage)
	};

	const handleAnime = async (animeId: number, saved: boolean) => {
		// Optimistically update the UI
		const updatedData = data.map((anime) =>
			anime.id === animeId ? { ...anime, saved: !saved } : anime
		);
		setData(updatedData);

		try {
			if (saved) {
				await userService.removeAnimeFromUser(parseInt(userId), animeId);
			} else {
				await userService.addAnimeToUser(parseInt(userId), animeId);
			}
		} catch (error) {
			console.error(error);
			// Revert the change if the API call fails
			const revertedData = data.map((anime) =>
				anime.id === animeId ? { ...anime, saved } : anime
			);
			setData(revertedData);
		}
	};

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

	return (
		<div className="min-h-screen text-white">
			<div className="max-w-3xl flex items-center mx-auto pt-20">
				<SearchBar query={query} />
			</div>
			<div className={`px-10 text  my-9 text-red-600`} >
				{
					correct_query !== query &&
                    <p className={'text-xl font-semibold'}>
                        did you mean:
                        <Link to={`/search?query=${correct_query}`}
                              className={" font-bold italic text-blue-400  hover:underline underline-offset-2 "}>
							{` ${correct_query}`}
                        </Link>
                    </p>
				}


			</div>
			<section className="px-6 mb-8 z-0 rounded-b-lg">
				<ul className="space-y-4">
					{!loading ? [0, 1, 2, 3, 4, 5].map((key: number) => <Skeleton key={key}/>) :
						currentItems && currentItems.length > 0 ? currentItems.map((anime) => (
								<li
									key={anime.id}
									className="relative border border-gray-700 rounded-lg bg-gray-900 cursor-pointer shadow-lg p-4 hover:bg-gray-800 transition duration-300"
								>
									{/* Save Icon */}
									{token &&
                                        <div className="absolute top-2 right-2 z-10 p-2 rounded-full">
                                            <FontAwesomeIcon
                                                icon={faBookmark}
                                                className={`${anime.saved ? 'text-yellow-500' : 'text-gray-500'} hover:text-gray-500 cursor-pointer`}
                                                onClick={() => handleAnime(anime.id, anime.saved)}
                                            />
                                        </div>
									}
									<h3 className="text-lg font-semibold mb-2">{anime.title}</h3>
									<p className="text-sm text-gray-400 mb-1">Score: {anime.score}</p>
									<p className="text-sm text-gray-300 mb-4 line-clamp-2">
										{anime.shortDescription}
									</p>
									<button
										onClick={() => setSelectedPdf(`http://localhost:5173/animes/${anime.doc_name}`)}
										className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
									>
										View PDF
									</button>
								</li>
							)) :
							<h1>No result found</h1>
					}
				</ul>
				<div className="flex justify-center gap-2 mt-4">
					<button
						onClick={() => paginate(currentPage - 1)}
						className={`px-4 py-2 rounded-md border shadow-sm text-sm font-medium ${
							currentPage > 1
								? "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
								: "bg-gray-200 text-gray-400 cursor-not-allowed"
						}`}
						disabled={currentPage === 1}
					>
						Previous
					</button>

					<div className="flex justify-center ">
						{Array.from({length: Math.ceil(data.length / itemsPerPage)}, (_, index) => (
							<button
								key={index + 1}
								onClick={() => paginate(index + 1)}
								className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} rounded`}
							>
								{index + 1}
							</button>
						))}
					</div>
					<button
						onClick={() => paginate(currentPage + 1)}
						className={`px-4 py-2 rounded-md border shadow-sm text-sm font-medium ${
							currentPage < Math.ceil(data.length / itemsPerPage)
								? "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
								: "bg-gray-200 text-gray-400 cursor-not-allowed"
						}`}
						disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
					>
						Next
					</button>

				</div>

				{/* PDF Viewer Modal */}
				{selectedPdf && (
					<PdfViewer
						pdfUrl={selectedPdf}
						onClose={() => setSelectedPdf(null)}
					/>
				)}
			</section>
		</div>
	);
};
