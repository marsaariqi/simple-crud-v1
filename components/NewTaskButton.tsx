"use client"

import { ChangeEvent, FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { CgGoogleTasks } from "react-icons/cg";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

const NewTaskButton = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [prio, setPrio] = useState("low");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState(false);
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrio(e.target.value);
    };

    const handleSubmitToDo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!title.trim() || !desc.trim()) {
            //alert("Title and Description are required.");
            setShowAlert(true);
            return;
        }
        try {
            const res = await fetch(`${baseUrl}/api/todos`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title, desc, prio }),
                cache: "no-store",
            })

            if (res.ok) {

                setTitle("");
                setDesc("");
                setPrio("low");
                setOpenModal(false);
                router.refresh();
            } else {
                throw new Error("Failed to create a ToDo")
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleModalClose = () => {
        setOpenModal(false);
        setShowAlert(false);
    }


    return (
        <div className="grid grid-cols-8 gap-4">
            <button
                className="btn btn-info gap-2 col-start-2 col-span-6 text-xl mb-5 rounded-xl md:col-start-3 md:col-span-4 hover:scale-105"
                onClick={() => setOpenModal(true)}
            >
                <CgGoogleTasks size={26} />
                New ToDo!
                <FaPlus size={20} />
            </button>

            <Modal openModal={openModal} setOpenModal={handleModalClose}>
                <form onSubmit={handleSubmitToDo} className='flex flex-col items-center'>
                    <h1 className="text-xl font-bold mb-5 max-w-4xl mx-auto">Create New ToDo!</h1>
                    <input
                        type="text"
                        placeholder="Title here"
                        className="input input-bordered w-full max-w-xs rounded-xl"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="textarea textarea-bordered mt-2 max-w-xs w-full rounded-xl"
                        placeholder="Description here"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                setDesc(prevDesc => prevDesc + '\n');
                            }
                        }}
                        rows={5}
                    />
                    <label className="font-bold text-lg -mb-2 mt-2">Priority</label>
                    <div className="flex mt-2">
                        <div className="form-control">
                            <label className="label cursor-pointer mr-2">
                                <span className="label-text  text-lg mr-2">
                                    Do Now!
                                </span>
                                <input
                                    type="radio"
                                    value="high"
                                    checked={prio === 'high'}
                                    onChange={handlePriorityChange}
                                    className="radio checked:bg-red-400"
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer mr-2">
                                <span className="label-text  text-lg mr-2">
                                    Can Wait
                                </span>
                                <input
                                    type="radio"
                                    value="low"
                                    checked={prio === 'low'}
                                    onChange={handlePriorityChange}
                                    className="radio checked:bg-orange-300"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-wide btn-primary rounded-xl mt-5 ">
                            Submit
                        </button>
                    </div>
                    {showAlert && (
                        <div role="alert" className='alert alert-error mt-4 rounded-xl w-fit flex flex-col'>
                            <div className="flex flex-row items-center">
                                <IoMdCloseCircleOutline size={26} color="#222222" />
                                <span className="ml-2">Title and Description are required.</span>
                            </div>
                        </div>
                    )}
                </form>
            </Modal>
        </div >
    );
};

export default NewTaskButton;