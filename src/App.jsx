import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getColorByRegion = (region) => {
        switch (region) {
            case 'Africa':
                return 'blue';
            case 'Americas':
                return 'green';
            case 'Asia':
                return 'red';
            case 'Europe':
                return 'yellow';
            case 'Oceania':
                return 'purple';
            default:
                return 'grey'; // Standaardkleur als de regio niet overeenkomt
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function fetchData() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countryData = response.data;

            // Extract the relevant information from the response and set it to the state
            const countryInfo = countryData.map((country) => ({
                name: country.name.common,
                flag: country.flags.svg,
                population: country.population,
                region: country.region,
            }));

            const sortedCountryInfo = countryInfo.sort((a, b) => a.population - b.population);

            setData(sortedCountryInfo);
            setShowData(true); // Toon de gegevens
        } catch (e) {
            console.error(e);
            console.log('De statuscode van de fout is:', e.response.status);
        }
    }

    const hideData = () => {
        setShowData(false); // Verberg de gegevens
    };

    return (
        <>
            <img src="src/assets/world_map.png" alt="worldmap" />
            <main>
                <h2>Reza en Pim tool </h2>
                <br />

                {showData ? (
                    <button type="button" onClick={hideData}>
                        Verberg informatie
                    </button>
                ) : (
                    <button type="button" onClick={fetchData}>
                        Laat informatie zien
                    </button>
                )}

                <input
                    type="text"
                    placeholder="Zoek land..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                {showData && filteredData.length > 0 && (
                    <ul>
                        {filteredData.map((country, index) => (
                            <li key={index} style={{ color: getColorByRegion(country.region) }}>
                                <p>Naam: {country.name}</p>
                                <p>regio: {country.region}</p>
                                <p>
                                    <img
                                        className="flagImage"
                                        src={country.flag}
                                        alt={`Vlag van ${country.name}`}
                                    />
                                </p>
                                <p>Bevolking: {country.population} mensen</p>
                                <br />
                                <br />
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </>
    );
}

export default App;