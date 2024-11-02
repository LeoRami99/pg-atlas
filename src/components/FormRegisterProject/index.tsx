import React, { useState } from 'react';
import Select from 'react-select';
import Modal from '../Modal';
import sdgOptions from "../../data/sdg.json"
import { FaEarthAmericas } from "react-icons/fa6";

const FormRegisterProject = () => {
    // Estado para almacenar los valores del formulario
    const [formData, setFormData] = useState({
        projectName: '',
        organizationType: '',
        date: '',
        city: '',
        country: '',
        region: '',
        description: '',
        website: '',
        energyCategory: '',
        subCategory: '',
        blockchain: '',
        blockchainImages: [],
        activityStatus: '',
        ...Array.from({ length: 17 }, (_, index) => `sdgGoal`).reduce((acc: { [key: string]: string }, key) => {
            acc[key] = '';
            return acc;
        }, {}),
        bfgid: '',
        source: '',
        latitude: '',
        longitude: ''
    });

    // Maneja los cambios en los campos de entrada
    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Maneja la selección de imágenes para blockchainImages
    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    //     setFormData(prevData => ({
    //         ...prevData,
    //         blockchainImages: files
    //     }));
    // };

    // Maneja la selección de SDGs
    // const handleSdgChange = (selectedOptions: {
    //     name: any; value: string, label: string, url_image: string
    // }[]) => {
    //     const sdgValues = selectedOptions.reduce((acc: any, option) => {
    //         acc[option.name] = option.url_image;
    //         return acc;
    //     }, {});
    //     setFormData(prevData => ({
    //         ...prevData,
    //         ...sdgValues
    //     }));
    // };

    // Maneja la selección de SDGs
    const handleSdgChange = (selectedOptions: { value: string, label: string, url_image: string }[]) => {
        const sdgValues = selectedOptions.reduce((acc: { [key: string]: string }, option) => {
            acc[option.value] = option.url_image;
            return acc;
        }, {});

        setFormData(prevData => ({
            ...prevData,
            ...sdgValues // Agrega los SDG seleccionados como propiedades específicas en el estado
        }));
    };




    // Función para manejar el envío del formulario
    const handleRegisterProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Muestra el resultado estructurado
        console.log('Project Data:', formData);

        // Reinicia el formulario
        setFormData({
            projectName: '',
            organizationType: '',
            date: '',
            city: '',
            country: '',
            region: '',
            description: '',
            website: '',
            energyCategory: '',
            subCategory: '',
            blockchain: '',
            blockchainImages: [],
            activityStatus: '',
            ...Array.from({ length: 17 }, (_, index) => `sdgGoal${index + 1}`).reduce((acc: { [key: string]: string }, key) => {
                acc[key] = '';
                return acc;
            }, {}),
            bfgid: '',
            source: '',
            latitude: '',
            longitude: ''
        });
    };

    return (
        <Modal id='modal-register-project'>
            <form onSubmit={handleRegisterProject} className='flex flex-col gap-4 p-4'>
                <label htmlFor='projectName'>Name</label>
                <input type='text' id='projectName' name='projectName' value={formData.projectName} onChange={handleChange} className='input input-bordered' required />

                <label htmlFor='organizationType'>Organization Type</label>
                <input type='text' id='organizationType' name='organizationType' value={formData.organizationType} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='date'>Date</label>
                <input type='date' id='date' name='date' value={formData.date} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='city'>City</label>
                <input type='text' id='city' name='city' value={formData.city} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='country'>Country</label>
                <input type='text' id='country' name='country' value={formData.country} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='region'>Region</label>
                <input type='text' id='region' name='region' value={formData.region} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='description'>Description</label>
                <textarea id='description' name='description' value={formData.description} onChange={handleChange} className='input input-bordered' required />

                <label htmlFor='website'>Website</label>
                <input type='url' id='website' name='website' value={formData.website} onChange={handleChange} className='input input-bordered' required />

                <label htmlFor='energyCategory'>Energy Category</label>
                <input type='text' id='energyCategory' name='energyCategory' value={formData.energyCategory} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='subCategory'>Sub Category</label>
                <input type='text' id='subCategory' name='subCategory' value={formData.subCategory} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='blockchain'>Blockchain</label>
                <input type='text' id='blockchain' name='blockchain' value={formData.blockchain} onChange={handleChange} className='input input-bordered' />



                <label htmlFor='activityStatus'>Activity Status</label>
                <input type='text' id='activityStatus' name='activityStatus' value={formData.activityStatus} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='sdgGoals'>SDG Goals</label>
                <Select
                    isMulti
                    options={sdgOptions.map(sdg => ({ value: sdg.name, label: sdg.title, url_image: sdg.url_image }))}
                    onChange={handleSdgChange as any}
                    styles={{
                        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
                        multiValue: (styles) => ({ ...styles, backgroundColor: '#2563EB', color: 'white' }),
                        multiValueLabel: (styles) => ({ ...styles, color: 'white' }),
                        multiValueRemove: (styles) => ({ ...styles, color: 'white' })
                    }}
                />

                <label htmlFor='bfgid'>BFG ID</label>
                <input type='text' id='bfgid' name='bfgid' value={formData.bfgid} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='source'>Source</label>
                <input type='text' id='source' name='source' value={formData.source} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='latitude'>Latitude</label>
                <input type='number' id='latitude' name='latitude' value={formData.latitude} onChange={handleChange} className='input input-bordered' />

                <label htmlFor='longitude'>Longitude</label>
                <input type='number' id='longitude' name='longitude' value={formData.longitude} onChange={handleChange} className='input input-bordered' />

                <button type='submit' className='btn btn-primary mt-4 text-white rounded-badge'>
                    <FaEarthAmericas /> Register Project
                </button>
            </form>
        </Modal>
    );
};

export default FormRegisterProject;
