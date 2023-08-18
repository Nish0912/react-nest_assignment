import Input from '../components/Input';
import infoIcon from '../assets/info-icon.png';
import scrollGif from '../assets/scroll.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ErrorAlert from '../components/ErrorAlert';
import getUser from '../api/get-user';
import setUser from '../api/set-user';

const Form = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [dob, setDob] = useState('');
    const [searchParams] = useSearchParams();
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if(!firstLoad) 
            return;

        async function fetchUser() {
            const response = await getUser(searchParams.get('username'));

            if (response.status === 'failed') {
                setErrorMessage('Something went wrong. Please try again later');

                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
            } else if (response.data != null) {
                setName(response.data.name);
                setEmail(response.data.email);
                setNumber(response.data.number);  
                setDob(response.data.dob);
            }

            setIsLoading(false);
        }

        if (
            searchParams.has('username') &&
            searchParams.get('username').length > 3
        ) {
            fetchUser();
            setFirstLoad(false);
        } else {
            navigate('/');
        }
    }, []);

    const isFormValid = () => {
        if(email.trim().length > 0){
            const emailParts = email.trim().split('@');

            if(emailParts.length != 2 || emailParts[0].length < 1 || emailParts[1].length < 1){
                setErrorMessage('Please enter a valid email address');

                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);

                return false;
            }
        }

        if(number.length > 0){
            let start = 0;
            while(number[start] == '0')
                ++start;

            const phoneNumber = number.substring(start);

            if(phoneNumber.length != 10){
                setErrorMessage('Please enter a valid phone number');

                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);

                return false;
            }
        }

        return true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if(isFormValid()){
            setIsLoading(true);

            const response = await setUser({
                username: searchParams.get('username'),
                name: name.trim(),
                email: email.trim(),
                number,
                dob
            });

            if (response.status === 'failed') {
                setErrorMessage('Something went wrong. Please try again later');

                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
            }
            else{
                navigate('/result');
            }

            setIsLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-green-200 p-10'>
            {isLoading && (
                <span className='loading loading-spinner w-16 bg-blue-600'></span>
            )}

            {!isLoading && (
                <>
                    <div className='my-4 flex flex-col items-center space-y-4 transition'>
                        <h1 className='mb-2 text-3xl'>Fill in your details</h1>
                        <img
                            src={scrollGif}
                            className='h-6 w-12 animate-bounce'
                        ></img>
                    </div>

                    <form className='flex w-full flex-col items-center rounded-md bg-white px-8 py-10 transition md:w-[30rem]'>
                        <Input
                            placeholder='Enter name'
                            value={name}
                            class='my-4 outline-gray-200'
                            onChange={(e) => {setName(e.target.value)}}
                        />
                        <Input
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            class='my-4 outline-gray-200'
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <Input
                            type='number'
                            placeholder='Enter number'
                            value={number}
                            class='my-4 outline-gray-200'
                            onChange={(e) => {setNumber(e.target.value)}}
                        />
                        <div className='my-4 flex w-full items-center space-x-4'>
                            <Input
                                type='date'
                                value={dob}
                                class='outline-gray-200'
                                onChange={(e) => {setDob(e.target.value)}}
                            />
                            
                        </div>

                        <button onClick={submitHandler} className='my-4 w-full rounded-md bg-green-600 p-2 text-white transition ease-in-out hover:scale-110 hover:bg-green-400 md:w-96'>
                            Submit
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className='w-full rounded-md bg-red-600 p-2 text-white transition ease-in-out hover:scale-110 hover:bg-red-400 md:w-96'
                        >
                            Cancel
                        </button>
                    </form>
                </>
            )}

            {errorMessage.length > 0 && <ErrorAlert message={errorMessage} />}
        </div>
    );
};

export default Form;
