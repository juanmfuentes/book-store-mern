import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from "../components/Spinner";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setSynopsis(response.data.synopsis);
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' })
                console.log(error);
            })
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
            synopsis
        };
        setLoading(true);
        axios
            .put(`${import.meta.env.VITE_API_URL}/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book edited successfully', { variant: 'success' })
                navigate('/')
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' })
                console.log(error);
            });
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl max-w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input
                        type='number'
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Synopsis</label>
                    <textarea
                        type='text'
                        maxLength={800}
                        rows={10}
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className="p-2 bg-sky-300" onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditBook