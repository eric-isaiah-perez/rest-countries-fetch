import React from 'react';  
import Filter from '../components/Filter';

import {useState, useEffect} from 'react';
import axios from 'axios';
   
function Home (){  

    const [countries,setCountries] = useState([]);

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
            }
            catch (error) {
                setCountries([]);
            }
        }

        fetchData();
    },[]);

    return (
        <>
            <Filter countries={countries} />

        </>
    );
}  
   
export default Home;  