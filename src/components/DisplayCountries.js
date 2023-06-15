import React from 'react';  
   
function DisplayCountries(props){  

    return (
        <>
            {props.filteredCountries.length > 0 ?
                //if countries found:
                (
                    <div class = "countries-container">
                        {props.filteredCountries.map((country) => (
                            <div className='country-wrapper' key={country.id}>
                                <h3>{country.name.common}</h3>
                                <img className='flag' src={country.flags.png} alt='' />
                                <p><strong>Capital:</strong> {country.capital}</p>
                                <p><strong>Continent:</strong> {country.continents}</p>
                                <p><strong>Timezone:</strong> {country.timezones.map((timezone) => (timezone) + ' ')}</p>
                                <p><strong>Languages Used:</strong> 
                                    {country.languages && Object.values(country.languages).map((language) => (
                                        <span className='language' key={language}>{language} </span>
                                    ))}
                                </p>
                                <p><strong>Currencies Used:</strong> {
                                    country.currencies && Object.values(country.currencies).map((currency) => (
                                        <span className='currency' key={currency.name}>{currency.name} <strong>({currency.symbol})</strong></span>
                                    ))
                                }</p>
                            </div>
                        ))}
                    </div>
                )  
                
                //if countries has no element:
                : (<p className='text-center'>No countries found.</p>)
            }
            
        </>
    );
}  
   
export default DisplayCountries;  