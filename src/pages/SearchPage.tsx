import SearchBar from "../components/SearchBar.tsx";
import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import SavedAnimes from "../components/SavedAnimes.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import PdfViewer from "../components/PdfViewer.tsx";
import {Skeleton} from "../components/Skeleton.tsx";

export const SearchPage = () => {

	const [params] = useSearchParams()
	const [data, setData] = useState()
	const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
	const [loading, setLoading] = useState(false)

	const query = params.get('query')
	const token = localStorage.getItem("authToken");

	useEffect(() => {
		setLoading(false)
		axios.get(`http://localhost:8080/animes/search?query=${query}`)
			.then(res => {
				setData(res.data)
				console.log(res.data)
			}).finally(() => {
				setLoading(true)
		})


		// console.log(query)
	}, [query]);



	return (

		<div className="min-h-screen text-white ">
			<div className="max-w-3xl mx-auto pt-20">
				<SearchBar/>
			</div>


			<section className=" p-6  my-8 z-0 rounded-b-lg">

				<ul className="space-y-4">




					{!loading ? [0,1,2,3,4,5].map((key:number)=>
						<Skeleton key={key} />
					)
					:

					data.length > 0 ? data.map((anime) => (
						<li
							key={anime.id}
							className="relative border border-gray-700 rounded-lg bg-gray-900 cursor-pointer shadow-lg p-4 hover:bg-gray-800 transition duration-300"
						>
							{/* Save Icon */}
							{
								token &&

                                <div className="absolute top-2 right-2 z-10 p-2 rounded-full">

                                    <FontAwesomeIcon
                                        icon={faBookmark}
                                        className={`text-yellow-500 hover:text-gray-500 cursor-pointer 	`}
										// onClick={() => handleUnsaveAnime(anime.id)}
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
					))
						:
						<h1 >No result found</h1>
					}
				</ul>

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