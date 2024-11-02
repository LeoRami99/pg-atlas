import React, { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "../Modal";
import sdgOptions from "../../data/sdg.json";
import { FaEarthAmericas } from "react-icons/fa6";
import useCoordinates from "../../hooks/useCoordinates";
import { IoIosCloseCircle } from "react-icons/io";
import { getCountries } from "../../services/countrystatecity.service";

const FormRegisterProject = () => {
    const [countries, setCountries] = useState([] as any);
    useEffect(() => {
        getCountries().then((data) => {
            console.log(data)
            setCountries(data);
        });
    }, []);





    const latitude = useCoordinates().latitude;
    const longitude = useCoordinates().longitude;
    // Estado para almacenar los valores del formulario
    const [formData, setFormData] = useState({
        projectName: "",
        organizationType: "",
        date: "",
        city: "",
        country: "",
        region: "",
        description: "",
        website: "",
        energyCategory: "",
        subCategory: "",
        blockchain: "",
        blockchainImages: [],
        activityStatus: "",
        bfgid: "",
        source: "",
        latitude: "",
        longitude: "",
    });

    // Maneja los cambios en los campos de entrada
    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // Maneja la selección de SDGs
    const handleSdgChange = (selectedOptions: { value: string; label: string; url_image: string }[]) => {
        const sdgValues = selectedOptions.reduce((acc: { [key: string]: string }, option) => {
            acc[`sdgGoal${option.value}`] = option.url_image;
            return acc;
        }, {});

        setFormData((prevData) => ({
            ...prevData,
            ...sdgValues,
        }));
    };

    // Función para manejar el envío del formulario
    const handleRegisterProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Muestra el resultado estructurado
        console.log("Project Data:", formData);

        // Reinicia el formulario
        // setFormData({
        //     projectName: '',
        //     organizationType: '',
        //     date: '',
        //     city: '',
        //     country: '',
        //     region: '',
        //     description: '',
        //     website: '',
        //     energyCategory: '',
        //     subCategory: '',
        //     blockchain: '',
        //     blockchainImages: [],
        //     activityStatus: '',
        //     bfgid: '',
        //     source: '',
        //     latitude: '',
        //     longitude: ''
        // });
    };

    const closeModal = () => {
        const modal = document.getElementById("modal-register-project") as HTMLDialogElement;
        modal?.close();
    };

    return (
        <Modal id="modal-register-project">
            <button onClick={closeModal} className="absolute top-0 right-0 text-2xl mt-4"><IoIosCloseCircle /></button>
            <h2 className="text-2xl font-bold text-center">Register Project</h2>

            <form onSubmit={handleRegisterProject} className="flex flex-col gap-4 p-4">
                <label htmlFor="projectName">Name</label>
                <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} className="input input-bordered" required />

                <label htmlFor="organizationType">Organization Type</label>
                <select data-filter="organization-type" className="select select-bordered" name="organizationType" onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}>
                    <option value="">Select a Organization Type</option>
                    <option value="Corporate">Corporate</option>
                    <option value="DAO">DAO</option>
                    <option value="decentralized App">decentralized App</option>
                    <option value="Decentralized App">Decentralized App</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Government">Government</option>
                    <option value="Non-profit">Non-profit</option>
                    <option value="Open-source">Open-source</option>
                    <option value="Other">Other</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Private-Public Partnership">Private-Public Partnership</option>
                    <option value="Start-up">Start-up</option>
                </select>

                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="input input-bordered" />

                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="input input-bordered" />

                <label htmlFor="country">Country</label>
                <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="input input-bordered" />

                <label htmlFor="region">Region</label>
                <select data-filter="region" className="select select-bordered" name="region" onChange={(e) => setFormData({ ...formData, region: e.target.value })}>
                    <option value="">Select a Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Middle East">Middle East</option>
                    <option value="North America">North America</option>
                    <option value="Oceania">Oceania</option>
                    <option value="South America">South America</option>
                </select>

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="input input-bordered" required />

                <label htmlFor="website">Website</label>
                <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} className="input input-bordered" required />

                <label htmlFor="energyCategory">Energy Category</label>
                <select data-filter="category" className="select select-bordered" name="energyCategory" onChange={(e) => setFormData({ ...formData, energyCategory: e.target.value })}>
                    <option value="">Select a Category</option>
                    <option value="Agriculture &amp; Food">Agriculture &amp; Food</option>
                    <option value="Aid &amp; Philanthropy">Aid &amp; Philanthropy</option>
                    <option value="Climate &amp; Environment">Climate &amp; Environment</option>
                    <option value="Digital content &amp; Arts">Digital content &amp; Arts</option>
                    <option value="Education &amp; Employment">Education &amp; Employment</option>
                    <option value="Energy">Energy</option>
                    <option value="Finance &amp; Insurance">Finance &amp; Insurance</option>
                    <option value="Government &amp; Democracy">Government &amp; Democracy</option>
                    <option value="Health">Health</option>
                    <option value="Identity &amp; Ownership">Identity &amp; Ownership</option>
                    <option value="Internet &amp; Telco">Internet &amp; Telco</option>
                    <option value="Logistics &amp; Traceability">Logistics &amp; Traceability</option>
                    <option value="Products &amp; Consumption">Products &amp; Consumption</option>
                    <option value="Transport &amp; Infrastructure">Transport &amp; Infrastructure</option>
                </select>

                <label htmlFor="subCategory">Sub Category</label>
                <input type="text" id="subCategory" name="subCategory" value={formData.subCategory} onChange={handleChange} className="input input-bordered" />

                <label htmlFor="blockchain">Blockchain</label>
                <input type="text" id="blockchain" name="blockchain" value={formData.blockchain} onChange={handleChange} className="input input-bordered" />

                <label htmlFor="activityStatus">Activity Status</label>
                <input type="text" id="activityStatus" name="activityStatus" value={formData.activityStatus} onChange={handleChange} className="input input-bordered" />

                <label htmlFor="sdgGoals">SDG Goals</label>
                <Select
                    isMulti
                    options={sdgOptions.map((sdg) => ({
                        value: sdg.id.toString(),
                        label: sdg.title,
                        url_image: sdg.url_image,
                    }))}
                    onChange={handleSdgChange as any}
                    styles={{
                        control: (styles) => ({ ...styles, backgroundColor: "white" }),
                        multiValue: (styles) => ({ ...styles, backgroundColor: "#2563EB", color: "white" }),
                        multiValueLabel: (styles) => ({ ...styles, color: "white" }),
                        multiValueRemove: (styles) => ({ ...styles, color: "white" }),
                    }}
                />

                <label htmlFor="bfgid">BFG ID</label>
                <input type="text" id="bfgid" name="bfgid" value={formData.bfgid} onChange={handleChange} className="input input-bordered" />

                <label htmlFor="source">Source</label>
                <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} className="input input-bordered" />

                <label htmlFor="latitude">Latitude</label>
                <input type="number" id="latitude" name="latitude" value={latitude?.toString()} onChange={handleChange} className="input input-bordered" />

                <label htmlFor="longitude">Longitude</label>
                <input type="number" id="longitude" name="longitude" value={longitude?.toString()} onChange={handleChange} className="input input-bordered" />

                <button type="submit" className="btn btn-primary mt-4 text-white rounded-badge">
                    <FaEarthAmericas /> Register Project
                </button>
            </form>
        </Modal>
    );
};

export default FormRegisterProject;
