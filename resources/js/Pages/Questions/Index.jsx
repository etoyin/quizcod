import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import Chirp from '@/Components/Chirp';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head, Link } from '@inertiajs/react';
// import sound from 

 
export default function Index({ auth, chirps }) {
    const [start, setStart] = useState(false)

    

    const handleMouse = () => {
        setStart(true);
    }

    return (
        <div>
            <div className="bg-dark-blue fixed left-0 top-0 h-full w-full h-screen text-white">
                <h2 className="text-3xl uppercase text-center p-5">Tabiths's Conference Genius Show</h2>
                    <div className="flex items-center mt-10 m-auto h-96 justify-center p-5">
                        <Link href="/question/cat1">
                            <div
                                onClick={handleMouse} 
                                className="shadow-md shadow-silver
                                rounded-lg h-64
                                border
                                text-center 
                                text-white text-bold 
                                hover:bg-blue
                                hover:text-midnight
                                hover:border-white
                                uppercase cursor-pointer text-2xl content-center w-36 mr-10 bg-dark-blue ">
                                Cat 1
                            </div>
                        </Link>

                        <Link href="/question/cat2">
                            <div 
                                onClick={handleMouse}
                                className="shadow-md shadow-silver
                                rounded-lg h-64
                                border
                                text-center 
                                text-white text-bold 
                                hover:bg-blue
                                hover:text-midnight
                                hover:border-white
                                uppercase cursor-pointer text-2xl content-center w-36 mr-10 bg-dark-blue ">
                                Cat 2
                            </div>
                        </Link>

                       

                        
                    </div>
            </div>
        </div>
    );
}