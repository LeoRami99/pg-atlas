import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { getListBlockchain } from '../../services/projects.service';
import useMediaQuery from '../../hooks/useMediaQuery';
import { BsArrowsMove, BsPinAngleFill } from 'react-icons/bs';
import { Filters } from '../../types/filters.type';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface FiltersComponentProps {
    applyFilters: (filters: Filters) => void;
}

const FiltersComponent: React.FC<FiltersComponentProps> = ({ applyFilters }) => {
    const [blockchains, setBlockchains] = useState<string[]>([]);
    const [filters, setFilters] = useState<Filters>({} as Filters);
    const [hidden, setHidden] = useState(false);


    const [isDraggable, setIsDraggable] = useState(false);

    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isMoved, setIsMoved] = useState(false);

    useEffect(() => {
        getListBlockchain().then((data) => setBlockchains(data)).catch(() => setBlockchains([]));
    }, []);

    useEffect(() => {
        if (isMobile) {
            setIsMoved(false);
        }
    }, [isMobile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleApplyFilters = () => {
        applyFilters(filters);
    };

    const toggleDraggable = () => {
        setIsDraggable((prev) => !prev);
    };

    const toggleHiddenFilters = () => {
        setHidden((prev) => !prev);
    };

    const filterBoxClass = `
            flex flex-col gap-2 p-4 rounded-xl md:shadow-xl backdrop-blur bg-black/30 transition-[opacity] duration-300
            ${hidden ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
            ${isMobile && !isMoved && !isDraggable ? 'fixed bottom-0 left-0 right-0 w-full z-10' : 'absolute z-10'}
        `;


    return (
        <>

            <button
                className="btn btn-sm mb-2 rounded-full fixed bottom-4 right-4 z-20 bg-blue-500 text-white"
                onClick={toggleHiddenFilters}
            >
                {hidden ? <FaEye /> : <FaEyeSlash />}
            </button>

            <Draggable disabled={!isDraggable} onStop={() => setIsMoved(true)}>
                <div className={filterBoxClass}>
                    {!isMobile && (
                        <button
                            className={`btn mb-2 btn-sm border-none rounded-full absolute top-2 right-2 ${isDraggable ? 'bg-green-600' : 'bg-blue-400'} text-white`}
                            onClick={toggleDraggable}
                        >
                            {isDraggable ? <BsArrowsMove /> : <BsPinAngleFill />}
                        </button>
                    )}

                    <h2 className="text-lg font-bold text-white">
                        Filters{' '}
                        <span className="text-xs text-white">
                            {Object.keys(filters).length > 0
                                ? Object.keys(filters)
                                    .map((key) => filters[key as keyof typeof filters])
                                    .filter((filter) => filter)
                                    .join(', ')
                                : 'All'}
                        </span>
                    </h2>
                    <select data-filter="region" title="region" className='select select-sm rounded-badge shadow-md' name="region" onChange={(e) => setFilters({ ...filters, region: e.target.value })}><option value="">All</option><option value="Africa">Africa</option><option value="Asia">Asia</option><option value="Europe">Europe</option><option value="Middle East">Middle East</option><option value="North America">North America</option><option value="Oceania">Oceania</option><option value="South America">South America</option></select>
                    <input type="text" className="input input-sm rounded-badge shadow-md" name="country" placeholder="Country" onChange={handleInputChange} />
                    <input type="text" className="input input-sm rounded-badge shadow-md" name="activityStatus" placeholder="Status" onChange={handleInputChange} />
                    <select data-filter="organization-type" title="organization-type" className='select select-sm rounded-badge shadow-md' name="organizationType" onChange={
                        (e) => setFilters({ ...filters, organizationType: e.target.value })
                    }><option value="">Organization Type</option><option value="Corporate">Corporate</option><option value="DAO">DAO</option><option value="decentralized App">decentralized App</option><option value="Decentralized App">Decentralized App</option><option value="Foundation">Foundation</option><option value="Government">Government</option><option value="Non-profit">Non-profit</option><option value="Open-source">Open-source</option><option value="Other">Other</option><option value="Partnership">Partnership</option><option value="Private-Public Partnership">Private-Public Partnership</option><option value="Start-up">Start-up</option></select>
                    <select title="Category" className='select select-sm rounded-badge shadow-md' data-filter="category" onChange={(e) => {
                        setFilters({ ...filters, category: e.target.value });
                    }}><option value="">
                            Category
                        </option><option value="Agriculture &amp; Food">Agriculture &amp; Food</option><option value="Aid &amp; Philanthropy">Aid &amp; Philanthropy</option><option value="Climate &amp; Environment">Climate &amp; Environment</option><option value="Digital content &amp; Arts">Digital content &amp; Arts</option><option value="Education &amp; Employment">Education &amp; Employment</option><option value="Energy">Energy</option><option value="Finance &amp; Insurance">Finance &amp; Insurance</option><option value="Government &amp; Democracy">Government &amp; Democracy</option><option value="Health">Health</option><option value="Identity &amp; Ownership">Identity &amp; Ownership</option><option value="Internet &amp; Telco">Internet &amp; Telco</option><option value="Logistics &amp; Traceability">Logistics &amp; Traceability</option><option value="Products &amp; Consumption">Products &amp; Consumption</option><option value="Transport &amp; Infrastructure">Transport &amp; Infrastructure</option></select>
                    <label>
                        <input
                            list="blockchain-list"
                            className="input rounded-badge w-full input-sm shadow-md"
                            name="blockchain"
                            placeholder="Blockchain"
                            onChange={(e) => setFilters({ ...filters, blockchain: e.target.value })}
                        />
                    </label>
                    <datalist id="blockchain-list">
                        {blockchains.map((blockchain) => (
                            <option key={blockchain} value={blockchain} />
                        ))}
                    </datalist>
                    <input type="number" className="input input-sm rounded-badge shadow-md" name="date" placeholder="Date" onChange={handleInputChange} />

                    <button className="btn btn-sm mt-2 btn-primary rounded-badge text-white" onClick={handleApplyFilters}>Apply Filters</button>
                </div>
            </Draggable>
        </>
    );
};

export default FiltersComponent;
