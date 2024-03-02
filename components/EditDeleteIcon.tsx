"use client"
import { useState } from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import Modal from './Modal'
import { useRouter } from 'next/navigation'



const EditDeleteIcon = ({ id, title, desc, prio }: { id: string, title: string, desc: string, prio: string }) => {
    const router = useRouter();

    const [newTitle, setNewTitle] = useState(title)
    const [newDesc, setNewDesc] = useState(desc)
    const [newPrio, setNewPrio] = useState(prio)

    const [openModalEdit, setopenModalEdit] = useState<boolean>(false)
    const [openModalDelete, setopenModalDelete] = useState<boolean>(false)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const handleDelete = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/todos?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setopenModalDelete(false);
                router.refresh();
            } else {
                throw new Error('Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleUpdate = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch(`${baseUrl}/api/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ newTitle, newDesc, newPrio }),
            })

            if (!res.ok) {
                throw new Error("Failed to update ToDo")
            }
            setopenModalEdit(false);
            router.push("/", { scroll: false })
            router.refresh();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <button onClick={() => setopenModalEdit(true)} className="icon-wrapper">
                <FaRegEdit size={22} />
            </button>
            <Modal openModal={openModalEdit} setOpenModal={setopenModalEdit}>
                <form onSubmit={handleUpdate} className='flex flex-col items-center'>
                    <h1 className="text-xl font-bold mb-5">Edit this ToDo!</h1>
                    <input
                        type="text"
                        placeholder="Title here"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        className="input input-bordered w-full max-w-xs rounded-xl"
                    />
                    <textarea
                        className="textarea textarea-bordered mt-2 max-w-xs w-full rounded-xl"
                        placeholder="Description here"
                        value={newDesc}
                        onChange={e => setNewDesc(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                setNewDesc(prevDesc => prevDesc + '\n');
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
                                    name="Priority"
                                    className="radio checked:bg-red-400"
                                    checked={newPrio === 'high'}
                                    onChange={() => setNewPrio('high')}
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
                                    name="Priority"
                                    className="radio checked:bg-orange-300"
                                    checked={newPrio === 'low'}
                                    onChange={() => setNewPrio('low')}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-wide btn-primary rounded-xl mt-5">
                            Update
                        </button>
                    </div>
                </form>
            </Modal>
            <button onClick={() => setopenModalDelete(true)} className="icon-wrapper">
                <FaRegTrashAlt size={22} color="red" />
            </button>
            <Modal openModal={openModalDelete} setOpenModal={setopenModalDelete}>
                <div className='flex flex-col items-center h-full'>
                    <h1 className='text-xl font-bold mb-5'>Are you sure you want to delete this?</h1>
                    <h1>You will be deleting this ToDo:</h1>
                    <p className='text-red-400 font-bold mb-2'>{title}</p>
                    <button onClick={handleDelete} className='btn btn-outline btn-wide rounded-xl text-red-500 mt-5'>DELETE</button>
                </div>
            </Modal>
        </>
    )
}

export default EditDeleteIcon