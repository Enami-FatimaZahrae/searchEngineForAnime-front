import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface FilterModalProps {
	isOpen: boolean;
	onClose: () => void;
	onApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply }) => {
	const [scoreRange, setScoreRange] = useState<[number, number]>([0, 10]);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [selectedDemographics, setSelectedDemographics] = useState<string[]>([]);
	const [selectedStudios, setSelectedStudios] = useState<string[]>([]);
	const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
	const [selectedYear, setSelectedYear] = useState<number | null>(null);

	const genres = [
		"Action", "Comedy", "Sci-Fi", "Fantasy", "Drama", "Romance", "Adventure", "Slice of Life",
		"Horror", "Mystery", "Psychological", "Sports", "Supernatural", "Thriller", "Historical", "Mecha",
		"Ecchi", "Isekai", "Magic", "Music"
	];

	const demographics = [
		"Shounen", "Seinen", "Shoujo", "Josei", "Kodomo", "Harem", "Reverse Harem", "Yaoi", "Yuri"
	];

	const studios = [
		"Madhouse", "Toei Animation", "Studio Ghibli", "Bones", "Kyoto Animation", "A-1 Pictures", "Ufotable",
		"MAPPA", "Production I.G", "Sunrise", "Trigger", "CloverWorks", "J.C.Staff", "White Fox",
		"Pierrot", "Shaft", "Lerche", "Gainax", "Silver Link", "Wit Studio"
	];

	const years = Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => (1990 + i).toString());
	const seasons = ["Winter", "Spring", "Summer", "Fall"];

	const handleGenreToggle = (genre: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
		);
	};

	const handleDemographicToggle = (demographic: string) => {
		setSelectedDemographics((prev) =>
			prev.includes(demographic) ? prev.filter((d) => d !== demographic) : [...prev, demographic]
		);
	};

	const handleStudioToggle = (studio: string) => {
		setSelectedStudios((prev) =>
			prev.includes(studio) ? prev.filter((s) => s !== studio) : [...prev, studio]
		);
	};

	const handleApply = () => {
		const filters = {
			scoreRange,
			selectedGenres,
			selectedDemographics,
			selectedStudios,
			selectedSeason,
			selectedYear,
		};
		onApply(filters);
		onClose();
	};

	const handleResetFilter =() => {
		setScoreRange([0,10])
		setSelectedDemographics([]);
		setSelectedYear(null)
		setSelectedYear(null)
		setSelectedGenres([])
		setSelectedStudios([])
	}

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			className="bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center"
		>
			<div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-[800px]">
				<Dialog.Title className="text-xl font-semibold">Filter Animes</Dialog.Title>
				<div className="mt-4 space-y-4">
					{/* Score Range Slider */}
					<div>
						<label className="block mb-2 ">Score
							Range: {scoreRange[0] > scoreRange[1] ? scoreRange[1] : scoreRange[0]} - {scoreRange[1] > scoreRange[0] ? scoreRange[1] : scoreRange[0]}</label>
						<input
							type="range"
							min="0"
							max="10"
							step="0.1"
							value={scoreRange[0]}
							onChange={(e) => setScoreRange([+e.target.value, scoreRange[1]])}
							className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
						/>
						<input
							type="range"
							min="0"
							max="10"
							step="0.1"
							value={scoreRange[1]}
							onChange={(e) => setScoreRange([scoreRange[0], +e.target.value])}
							className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
						/>

					</div>


					{/* Genres */}
					<div>
						<label className="block mb-2">Genres</label>
						<div className="flex flex-wrap gap-2">
							{genres.map((genre) => (
								<button
									key={genre}
									className={`px-3 py-1 rounded-full ${selectedGenres.includes(genre) ? 'bg-purple-500' : 'bg-gray-700'}`}
									onClick={() => handleGenreToggle(genre)}
								>
									{genre}
								</button>
							))}
						</div>
					</div>

					{/* Demographics */}
					<div>
						<label className="block mb-2">Demographics</label>
						<div className="flex flex-wrap gap-2">
							{demographics.map((demographic) => (
								<button
									key={demographic}
									className={`px-3 py-1 rounded-full ${selectedDemographics.includes(demographic) ? 'bg-purple-500' : 'bg-gray-700'}`}
									onClick={() => handleDemographicToggle(demographic)}
								>
									{demographic}
								</button>
							))}
						</div>
					</div>

					{/* Studios */}
					<div>
						<label className="block mb-2">Studios</label>
						<div className="flex flex-wrap gap-2">
							{studios.map((studio) => (
								<button
									key={studio}
									className={`px-3 py-1 rounded-full ${selectedStudios.includes(studio) ? 'bg-purple-500' : 'bg-gray-700'}`}
									onClick={() => handleStudioToggle(studio)}
								>
									{studio}
								</button>
							))}
						</div>
					</div>

					{/* Premiered Season and Year */}
					<div>
						<label className="block mb-2">Premiered</label>
						<div className="flex gap-2">
							<select
								value={selectedSeason || ''}
								onChange={(e) => setSelectedSeason(e.target.value)}
								className="bg-gray-700 rounded px-3 py-1 w-full"
							>
								<option value="">Season</option>
								{seasons.map((season) => (
									<option key={season} value={season}>
										{season}
									</option>
								))}
							</select>
							<select
								value={selectedYear || ''}
								onChange={(e) => setSelectedYear(+e.target.value)}
								className="bg-gray-700 rounded px-3 py-1 w-full"
							>
								<option value="">Year</option>
								{years.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<div className="mt-6 flex justify-between ">
					<button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600" onClick={handleResetFilter}>
						reset
					</button>
					<div className=" flex justify-end space-x-4">
						<button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600" onClick={onClose}>
							Cancel
						</button>
						<button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-500" onClick={handleApply}>
							Apply
						</button>
					</div>
				</div>

			</div>
		</Dialog>
	);
};


export default FilterModal;
