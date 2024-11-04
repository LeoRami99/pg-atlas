import React, { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "../Modal";
import sdgOptions from "../../data/sdg.json";
import { FaEarthAmericas } from "react-icons/fa6";
import useCoordinates from "../../hooks/useCoordinates";
import { IoIosCloseCircle } from "react-icons/io";
import { getCountries } from "../../services/countrystatecity.service";
import { ethSignService } from "../../services/ethsign";
import { countryType } from "../../types/countriescitys.type";
import { blockchainListType } from "../../types/blockchainList.types";
import { listOfBlockchains } from "../../services/blockchains.service";
import { useAccount } from "wagmi";
import Button from "../Button";
import { attestationType } from "../../types/attestation.type";
import toast from "react-hot-toast";
import { sendProject } from "../../services/projects.service";


interface FormRegisterProjectProps {
  getProjects: () => Promise<void>;
}

const FormRegisterProject = (props: FormRegisterProjectProps) => {
  const { address } = useAccount();
  const [countries, setCountries] = useState<countryType[]>([] as countryType[]);
  const [blockchains, setBlockchains] = useState<blockchainListType[]>([]);
  const { attestProject } = ethSignService();
  const [loadingSend, setLoadingSend] = useState(false);

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
    listOfBlockchains().then((data) => {
      setBlockchains(data);
    });
  }, []);

  const { latitude, longitude } = useCoordinates();
  useEffect(() => {
    if (latitude && longitude) {
      setFormData((prevData) => ({
        ...prevData,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      }));
    }
  }, [latitude, longitude]);
  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    projectName: "",
    city: "N/A",
    organizationType: "",
    date: "",
    country: "",
    region: "",
    description: "",
    website: "",
    energyCategory: "",
    subCategory: "",
    blockchain: "",
    blockchainImages: [],
    activityStatus: "Active",
    bfgid: "N/A",
    source: "N/A",
    latitude: latitude?.toString(),
    longitude: longitude?.toString(),
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
    if (!address) {
      closeModal();
      toast.error("Please connect your wallet");
      return;
    }
    setLoadingSend(true);
    const parseDataToAttestProject: attestationType = {
      name: formData.projectName,
      organizationType: formData.organizationType,
      date: formData.date,
      region: formData.region,
      country: formData.country,
      description: formData.description,
      website: formData.website,
      energyCategory: formData.energyCategory,
      subCategory: formData.subCategory,
      blockchain: formData.blockchain,
      ods: Object.keys(formData)
        .filter((key) => key.includes("sdgGoal"))
        .map((key) => key.replace("sdgGoal", "")),
      latitude: formData.latitude || "",
      longitude: formData.longitude || "",
      wallet: address || "",
    };

    toast.loading("Registering attestation");
    Promise.all([attestProject(parseDataToAttestProject)])
      .then((values) => {
        if (values[0]) {
          toast.success("Attestation registered successfully");
          toast.remove();
          const newFormaData = {
            ...formData,
            energyCategory: {
              name: formData.energyCategory,
              color: randomColor(),
            },
            blockchainImages: [blockchains.find((blockchain) => blockchain.name === formData.blockchain)?.image.large],
            wallet: address,
            latitude: formData.latitude,
            longitude: formData.longitude,
            attestationId: values[0],
            donations: [],
          };
          toast.promise(sendProject(newFormaData), {
            loading: "Registering project",
            success: () => {
              closeModal();
              setFormData({
                projectName: "",
                city: "N/A",
                organizationType: "",
                date: "",
                country: "",
                region: "",
                description: "",
                website: "",
                energyCategory: "",
                subCategory: "",
                blockchain: "",
                blockchainImages: [],
                activityStatus: "Active",
                bfgid: "N/A",
                source: "N/A",
                latitude: latitude?.toString(),
                longitude: longitude?.toString(),
              });
              setLoadingSend(false);
              props.getProjects();
              return "Project registered successfully";
            },
            error: () => {
              setLoadingSend(false);
              return "Error registering project";
            },
          });
        } else {
          setLoadingSend(false);
          toast.remove();
          toast.error("Error registering attestation");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingSend(false);
        toast.error("Error registering attestation");
      });
  };

  const closeModal = () => {
    const modal = document.getElementById("modal-register-project") as HTMLDialogElement;
    modal?.close();
  };
  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <Modal id="modal-register-project">
      <Button onClick={closeModal} className="absolute top-0 right-0 text-2xl mt-4">
        <IoIosCloseCircle />
      </Button>
      <h2 className="text-2xl font-bold text-center">Register Project</h2>
      <form onSubmit={handleRegisterProject} className="flex flex-col gap-4 p-4">
        <label htmlFor="projectName">Name</label>
        <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} className="input input-bordered" required disabled={loadingSend} />

        <label htmlFor="organizationType">Organization Type</label>
        <select data-filter="organization-type" id="organizationType" className="select select-bordered" name="organizationType" onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })} disabled={loadingSend}>
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
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="input input-bordered" disabled={loadingSend} />

        <label htmlFor="countries">Country</label>
        <select
          id="countries"
          name="country"
          value={formData.country}
          className="select select-bordered"
          onChange={(e) => {
            setFormData({ ...formData, country: e.target.value });
          }}
          disabled={loadingSend}>
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <label htmlFor="region">Region</label>
        <select data-filter="region" id="region" className="select select-bordered" name="region" onChange={(e) => setFormData({ ...formData, region: e.target.value })} disabled={loadingSend}>
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
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="input input-bordered" required disabled={loadingSend} />

        <label htmlFor="website">Website</label>
        <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} className="input input-bordered" required disabled={loadingSend} />

        <label htmlFor="energyCategory">Energy Category</label>
        <select data-filter="category" id="energyCategory" className="select select-bordered" name="energyCategory" onChange={(e) => setFormData({ ...formData, energyCategory: e.target.value })} disabled={loadingSend}>
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
        <input type="text" id="subCategory" name="subCategory" value={formData.subCategory} onChange={handleChange} className="input input-bordered" disabled={loadingSend} />

        <label htmlFor="blockchain">Blockchain</label>
        <select id="blockchain" data-filter="blockchain" className="select select-bordered" name="blockchain" disabled={loadingSend} onChange={(e) => setFormData({ ...formData, blockchain: e.target.value })}>
          <option value="">Select a Blockchain</option>
          {blockchains.map((blockchain) => (
            <option key={blockchain.id} value={blockchain.name}>
              {blockchain.name}
            </option>
          ))}
        </select>

        {/* <label htmlFor="activityStatus">Activity Status</label>
                <input type="text" id="activityStatus" name="activityStatus" value={formData.activityStatus} onChange={handleChange} className="input input-bordered" /> */}

        <label htmlFor="sdgGoals">SDG Goals</label>
        <Select
          isMulti
          options={sdgOptions.map((sdg) => ({
            value: sdg.id.toString(),
            label: sdg.title,
            url_image: sdg.url_image,
          }))}
          onChange={(e) => handleSdgChange(e as { value: string; label: string; url_image: string }[])}
          isDisabled={loadingSend}
          styles={{
            control: (styles) => ({ ...styles, backgroundColor: "white" }),
            multiValue: (styles) => ({
              ...styles,
              backgroundColor: "#2563EB",
              color: "white",
            }),
            multiValueLabel: (styles) => ({ ...styles, color: "white" }),
            multiValueRemove: (styles) => ({ ...styles, color: "white" }),
          }}
        />

        {/* <label htmlFor="bfgid">BFG ID</label>
                <input type="text" id="bfgid" name="bfgid" value={formData.bfgid} onChange={handleChange} className="input input-bordered" /> */}

        {/* <label htmlFor="source">Source</label>
                <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} className="input input-bordered" /> */}

        <label htmlFor="latitude">Latitude</label>
        <input disabled={loadingSend} type="number" id="latitude" name="latitude" value={latitude?.toString()} className="input input-bordered" onChange={(e) => setFormData({ ...formData, latitude: e.target.value })} />

        <label htmlFor="longitude">Longitude</label>
        <input disabled={loadingSend} type="number" id="longitude" name="longitude" value={longitude?.toString()} className="input input-bordered" onChange={(e) => setFormData({ ...formData, longitude: e.target.value })} />

        <button type="submit" className="btn btn-primary mt-4 text-white rounded-badge" disabled={loadingSend}>
          {loadingSend ? (
            <div className="flex items-center justify-center">
              <span className="loading loading-spinner loading-md"></span>
              Registering
            </div>
          ) : (
            <>
              <FaEarthAmericas />
              Register Project
            </>
          )}
        </button>
      </form>
    </Modal>
  );
};

export default FormRegisterProject;
