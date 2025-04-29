import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({ site: '', username: '', password: '' });

    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem('passwords')
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const savePassword = () => {
        if (form.site.length >= 1 && form.username.length >= 1 && form.password.length >= 1) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setForm({ site: '', username: '', password: '' })
            toast.success('Password saved successfully',
                {
                    style: {
                        borderRadius: '8px',
                        background: '#1e2939',
                        color: '#fff',
                        position: 'relative',
                        top: '-40px',
                    },
                }
            );
        }
        else {
            toast.error('Please fill all the fields!',
                {
                    style: {
                        borderRadius: '8px',
                        background: '#1e2939',
                        color: '#fff',
                        position: 'relative',
                        top: '-40px',
                    },
                }
            );
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id ", id)
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deletePassword = (id) => {
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        toast.success('Password deleted successfully',
            {
                style: {
                    borderRadius: '8px',
                    background: '#1e2939',
                    color: '#fff',
                    position: 'relative',
                    top: '-40px',
                },
            }
        );
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to clipboard',
            {
                style: {
                    borderRadius: '8px',
                    background: '#1e2939',
                    color: '#fff',
                    position: 'relative',
                    top: '-40px',
                },
            }
        );
    };


    return (
        <div>
            <Toaster position="bottom-left" />
            <div className="container mx-auto px-4 max-w-4xl my-5">
                <div className="flex flex-col text-white p-4 bg-gray-800 rounded-lg w-full">
                    <span className="pb-3 text-center sm:text-left text-lg">Secure your Data</span>

                    <div className="flex flex-col gap-4 text-black">
                        <input maxLength={20} name='site' id='site' value={form.site} onChange={handleChange} placeholder='Platform' spellCheck='false' className="bg-white rounded-md py-1 px-2 w-full" type="text" />

                        <div className="flex flex-col md:flex-row gap-4 relative">
                            <input maxLength={20} name='username' id='username' value={form.username} onChange={handleChange} placeholder='Username' spellCheck='false' className="bg-white rounded-md py-1 px-2 w-full" type="text" />

                            <div className="relative w-full">
                                <input maxLength={20} name='password' id='password' value={form.password} onChange={handleChange}
                                    placeholder='Password'
                                    autoComplete='off'
                                    spellCheck='false'
                                    className="bg-white rounded-md py-1 px-2 w-full pr-10"
                                    type={showPassword ? 'text' : 'password'}

                                />
                                <span
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-black"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        // Eye open
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="#000000" strokeWidth="2"></path>
                                            <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="#000000" strokeWidth="2"></path>
                                        </svg>
                                    ) : (
                                        // Eye closed
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
                                            <path d="M3 3L21 21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className='flex justify-center'>
                            <button aria-label="Save Password" onClick={savePassword} className="relative overflow-hidden py-1 px-2 border-2 rounded-md border-white text-white transition cursor-pointer w-1/4 group active:scale-95">
                                <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300 ease-in-out origin-bottom" />
                                <span className="relative z-10 group-hover:text-black group-active:text-black transition-colors duration-300">Save</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="passwords container mx-auto max-w-4xl my-6 text-black">
                    <h2 className="mb-3 text-lg">Your Saved Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-center text-gray-500 my-20 ml-5'>No passwords saved yet.</div>}
                    {passwordArray.length !== 0 && <div className='h-[40vh] sm:h-[35vh] overflow-y-auto scrollbar-custom'>
                        <table className="table-auto w-full">
                            <thead className="bg-gray-800 text-white sticky top-[-1px] z-10">
                                <tr>
                                    <th className="px-4 py-2 font-medium">Platform</th>
                                    <th className="px-4 py-2 font-medium">Username</th>
                                    <th className="px-4 py-2 font-medium">Password</th>
                                    <th className="px-4 py-2 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => {
                                    return (<tr key={index}>
                                        <td className="text-center px-4 py-2 min-w-[170px] sm:min-w-[200px]">{item.site}</td>
                                        <td className="text-center px-4 py-2 min-w-[170px] sm:min-w-[200px]">{item.username}</td>
                                        <td className="text-center px-4 py-2 min-w-[170px] sm:min-w-[200px] flex justify-center items-center gap-2">{'••••••••••'}
                                            <svg onClick={() => copyText(item.password)} className='CopyText cursor-pointer' xmlns="http://www.w3.org/2000/svg" id="Layer_1" height="15" viewBox="0 0 24 24" width="15" data-name="Layer 1"><path d="m15 20h-10a5.006 5.006 0 0 1 -5-5v-10a5.006 5.006 0 0 1 5-5h10a5.006 5.006 0 0 1 5 5v10a5.006 5.006 0 0 1 -5 5zm9-1v-13a1 1 0 0 0 -2 0v13a3 3 0 0 1 -3 3h-13a1 1 0 0 0 0 2h13a5.006 5.006 0 0 0 5-5z" /></svg>
                                        </td>
                                        <td className="text-center px-4 py-2">
                                            <div className='flex justify-center items-center gap-3'>
                                                <svg aria-label="Edit Item" onClick={() => { editPassword(item.id) }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#000000" fill="none">
                                                    <path d="M8.17151 19.8284L19.8284 8.17157C20.3736 7.62632 20.6462 7.3537 20.792 7.0596C21.0693 6.50005 21.0693 5.8431 20.792 5.28354C20.6462 4.98945 20.3736 4.71682 19.8284 4.17157C19.2831 3.62632 19.0105 3.3537 18.7164 3.20796C18.1568 2.93068 17.4999 2.93068 16.9403 3.20796C16.6462 3.3537 16.3736 3.62632 15.8284 4.17157L4.17151 15.8284C3.59345 16.4064 3.30442 16.6955 3.15218 17.063C2.99994 17.4305 2.99994 17.8393 2.99994 18.6568V20.9999H5.34308C6.16059 20.9999 6.56934 20.9999 6.93688 20.8477C7.30442 20.6955 7.59345 20.4064 8.17151 19.8284Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M12 21H18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M14.5 5.5L18.5 9.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                                <svg aria-label="Delete Item" onClick={() => { deletePassword(item.id) }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#000000" fill="none">
                                                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
                                                    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
                                                    <path d="M9.5 16.5L9.5 10.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
                                                    <path d="M14.5 16.5L14.5 10.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Manager;
