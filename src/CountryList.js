import React,{useState} from 'react'
import { useQuery,gql } from '@apollo/client'

const COUNTRY_QUERY=gql`
   query{
    countries{
        code
        name
    }
   }
`;

export default function CountryList() {
    const {loading,error,data}=useQuery(COUNTRY_QUERY);
    const [filter,setFilter]=useState("");
    const [secilenSehir,setSecilenSehir]=useState("");

    if (loading) return <p>Veriler yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error.message}</p>;

const filteredCountries = data.countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handeFilterChange=(e)=>{
    setFilter(e.target.value)
  }

  const handleCountryClick = (country) => {
    if (secilenSehir === country) {
      setSecilenSehir(null);
    } else {
      setSecilenSehir(country);
    }
  };

  function getRandomColor() {
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#33aaff', '#ff33aa'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log('Sayfa sonunda!');
    }
  };

  return (
    <div>
        <input
        type='text'
        placeholder='Ülke Ara'
        value={filter}
        onChange={handeFilterChange}
        style={{padding:"10px",textAlign:"center",borderRadius:"25px"}}
        />
      <ul onScroll={handleScroll} style={{ maxHeight: '100%', overflowY: 'auto' }}>
        {filteredCountries.map((country) => (
          <li
            key={country.code}
            onClick={() => handleCountryClick(country)}
            style={{
              backgroundColor:
              secilenSehir === country
              ? getRandomColor() // Seçilen öğe için rastgele renk
              : 'white',
            }}
          >
            {country.name} ({country.code})
          </li>
        ))}
      </ul>
    </div>
  )
}

