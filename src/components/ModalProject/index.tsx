import React, { useEffect, useState } from "react";
import { Project } from "../../models/projects.models";
import { FaCalendar, FaEthereum, FaGlobe, FaLink, FaTelegram, FaUser } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import Modal from "../Modal";
import Button from "../Button";
import { useSendTransaction } from "wagmi";
import { parseEther } from 'viem'
import toast from "react-hot-toast";
import { sendDonationAPI } from "../../services/projects.service";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const TOTAL_SDGS = 17;
// const IMAGE_URL_PATTERN = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { data: hash, isPending, isSuccess, sendTransactionAsync } = useSendTransaction();
  const [valueDonation, setValueDonation] = useState(0);
  const [showDonation, setDonation] = useState(false);
  const availableSdgs = Array.from(
    { length: TOTAL_SDGS },
    (_, index) => index + 1,
  )
    .map((sdg) => ({
      id: sdg,
      url: project[`sdgGoal${sdg}`],
    }))
    .filter((sdg) => sdg.url && /^https?:\/\/.+/i.test(sdg.url));
  // const validBlockchainImages = project.blockchainImages.filter((image) =>
  //   IMAGE_URL_PATTERN.test(image),
  // );


  const sendDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valueDonation) {
      toast.error("Please enter a valid donation amount");
      return;
    }
    if (valueDonation < 0.1) {
      toast.error("Minimum donation is 0.1 ETH");
      return;
    }
    try {
      const transaction = await sendTransactionAsync({
        to: project.wallet as `0x${string}`,
        value: parseEther(valueDonation.toString()),
      });
      if (transaction) {
        toast.success("Transaction sent! Awaiting confirmation...");
        setDonation(false);
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed. Please try again.");
    }
  };
  const sendDonationApi = async () => {
    if (hash) {
      toast.promise(sendDonationAPI(project.projectName, {
        donatorAddress: project.wallet,
        amount: valueDonation,
        date: new Date().toISOString(),
        txHash: hash?.toString() as string,
      }), {
        loading: "Sending donation...",
        success: "Donation sent successfully!",
        error: "Error sending donation",
      })
    } else {
      toast.error("Error sending donation");
    }
  };

  useEffect(() => {
    if (isSuccess && hash) {
      sendDonationApi();
      setDonation(false);
    }
  }, [isSuccess, hash]);;

  return (
    <Modal id={project.projectName} open>
      <Button
        onClick={onClose}
        className="absolute top-0 right-0 m-4 text-2xl text-dark"
      >
        <IoIosCloseCircle />
      </Button>
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-extrabold text-dark text-center uppercase">
          {project.projectName}
        </h2>
        <p className="text-lg text-gray-600">{project.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <p>
            <strong>Organization Type:</strong> {project.organizationType}
          </p>
          <p>
            <strong>Date:</strong> {project.date}
          </p>
          <p>
            <strong>City:</strong> {project.city}
          </p>
          <p>
            <strong>Country:</strong> {project.country}
          </p>
          <p>
            <strong>Region:</strong> {project.region}
          </p>
          <p>
            <strong>Energy Category:</strong>
            {project.energyCategory.name}
          </p>
          <p>
            <strong>Sub Category:</strong> {project.subCategory}
          </p>
          <p>
            <strong>Activity Status:</strong> {project.activityStatus}
          </p>
          <p>
            <strong>Source:</strong> {project.source}
          </p>
          <p>
            <strong>Latitude:</strong> {project.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {project.longitude}
          </p>

          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-center">
              Sustainable Development Goals
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {availableSdgs.map((sdg) => (
                <img src={sdg.url} alt={`SDG ${sdg.id}`} className="size-16" />
              ))}
            </div>
          </div>
        </div>

        {project.blockchainImages.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-center">Blockchain</h3>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {project.blockchainImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Blockchain ${index + 1}`}
                  className="size-16 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center mt-6">
          <p className="p-4 rounded text-gray-800 shadow-md">
            Blockchain:{" "}
            <span className="font-semibold">{project.blockchain}</span>
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-center">Donations</h3>
          <p className="text-center text-gray-600">
            Total donations: {project.donations.length}
          </p>
        </div>
        {project.donations.length > 0 && (
          <div className="h-[170px] overflow-auto p-2">
            {project.donations.map((donation, index) => (
              <div
                key={index}
                className="flex flex-col p-4 shadow-md rounded-md my-2 bg-white"
              >
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUser className="text-blue-500" />
                  <strong>Donator:</strong>
                  <span className="truncate">{donation.donatorAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 mt-1">
                  <FaEthereum className="text-yellow-500" />
                  <strong>Amount:</strong>
                  <span>{donation.amount} ETH</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 mt-1">
                  <FaCalendar className="text-green-500" />
                  <strong>Date:</strong>
                  <span>{donation.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 mt-1">
                  <FaLink className="text-purple-500" />
                  <strong>Transaction Hash:</strong>
                  <a
                    href={`https://alfajores-blockscout.celo-testnet.org/tx/${donation.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {donation.txHash}
                  </a>
                </div>
              </div>
            ))}
          </div>

        )}
        <a
          href={project.website}
          target="_blank"
          rel="noreferrer"
          className="btn w-full btn-primary text-white rounded-full"
        >
          <FaGlobe /> Visit Website
        </a>
        <div className="flex justify-center mt-6 flex-col">
          <Button className="btn bg-[#0098EA] text-white rounded-full hover:bg-blue-300 transition-all flex items-center gap-2 w-full" onClick={() => setDonation(true)}>
            <FaTelegram /> Donate to this project
          </Button>
          {showDonation && (
            <form className="flex flex-col items-center" onSubmit={sendDonation}>
              <input
                type="number"
                value={valueDonation}
                onChange={(e) => setValueDonation(+e.target.value)}
                // only allow positive numbers
                min={0}
                step={0.1}
                max={1000}
                maxLength={5}
                required
                placeholder="Amount in ETH"
                className="input w-full input-primary rounded-badge mt-4"
              />
              <Button className="btn btn-primary rounded-badge text-white mt-4">
                Donate {valueDonation} ETH
              </Button>

              {isPending && <p className="text-center mt-4">Sending donation...</p>}
              {isSuccess && (
                <p className="text-center mt-4 text-green-600">
                  Donation sent successfully!
                </p>
              )}
              {hash && (
                <a href={`https://celo-alfajores.blockscout.com/tx/${hash}`} target="_blank" rel="noreferrer" className="text-center mt-4 text-blue-600">
                  View on Celo Explorer
                </a>
              )}
            </form>)}
        </div>
        <Button
          onClick={onClose}
          className="btn bg-red-600 text-white w-full rounded-badge"
        >
          <IoIosCloseCircle />
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ProjectModal;
