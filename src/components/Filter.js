import React from 'react'; 
import DisplayCountries from '../components/DisplayCountries'; 
import { useState, useEffect } from 'react';
const moment = require('moment-timezone');


function Filter(props){  
    const [filteredCountries, setFilteredCountries] = useState(props.countries);
    const uniqueContinents = [];
    props.countries.forEach((country) => {
      if (!uniqueContinents.toString().includes(country.continents)) {
        uniqueContinents.push(country.continents);
      }
    });

    const timezones = moment.tz.names();
    const formattedTimezones = timezones.map((timezone) => {
      const offset = moment.tz(timezone).format('Z');
      return `UTC${offset}`;
    });
    const uniqueFormattedTimezones = [...new Set(formattedTimezones)];

    useEffect(() => {
        setFilteredCountries(props.countries);
    },[props.countries])

    function resetFilter() {
        const inputcountry = document.getElementById('input-country');
        inputcountry.value = '';
        
        const selectcontinent = document.getElementById('select-continent');
        selectcontinent.selectedIndex = 0;

        const selecttimezone = document.getElementById('select-timezone');
        selecttimezone.selectedIndex = 0;

        setFilteredCountries(props.countries);
    }

    function countryFilter() {
        const countryNameInput = document.getElementById('input-country').value;
        const continentSelect = document.getElementById('select-continent');
        const selectedContinent = continentSelect.options[continentSelect.selectedIndex].value
        const timezoneSelect = document.getElementById('select-timezone');
        const selectedTimezone = timezoneSelect.options[timezoneSelect.selectedIndex].value;    

        const filtered = props.countries.filter((country) => {
            const nameMatch = country.name.common.toLowerCase().includes(countryNameInput.toLowerCase());
            const continentMatch = selectedContinent ? country.continents.includes(selectedContinent) : true;
            const timezoneMatch = selectedTimezone ? country.timezones.includes(selectedTimezone) : true

            return nameMatch && continentMatch && timezoneMatch;
        });

        setFilteredCountries(filtered);
    }

    return (
        <>
            <div class="form-group">
                {/* country name */}
                <div class="input-wrapper">
                    <label for="country-name">Country:</label>
                    <input type="text"
                    class="form-control" id='input-country' name="country-name" aria-describedby="helpname" placeholder="Type in here..." onChange={countryFilter} />
                    <small id="helpname" class="form-text text-muted">Type in the name of the country</small>
                </div>
                {/* continent */}
                <div class="input-wrapper">
                    <label for="continent">Continent:</label>
                    <select className="form-control" name="continent" id='select-continent' onChange={countryFilter}>
                        <option value='' selected disabled>Select continent</option>
                        {
                            uniqueContinents.map((continent) => (
                                <option key={continent} value={continent}>{continent}</option>
                            ))
                        }
                    </select>
                    <small id="helpname" class="form-text text-muted">Select which continent</small>
                </div>
                {/* timezone */}
                <div class="input-wrapper">
                    <label for="timezone">Timezone:</label>
                    <select class="form-control" name="timezone" id='select-timezone' onChange={countryFilter}>
                        <option value='' selected disabled>Select Timezone</option>
                        {
                            uniqueFormattedTimezones.sort().map((timezone) => (
                                <option key={timezone} value={timezone}>{timezone}</option>
                            ))
                        }
                      </select>
                    <small id="helpname" class="form-text text-muted">Select which timezone</small>
                </div>
                {/* reset filter */}
                <div class="input-wrapper button-wrapper">
                    <button onClick={resetFilter} className='reset-filter'>Reset Filter</button>
                </div>
            </div>

            <DisplayCountries filteredCountries={filteredCountries} />

        </>
    );
}  
   
export default Filter;  