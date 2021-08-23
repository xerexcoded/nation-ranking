import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout/Layout'
import styles from '../styles/Home.module.css'
import SearchInput from "../components/SearchInput/SearchInput"
import CountriesTable from '../components/CountriesTable/CountriesTable'
import { useState } from 'react'
export default function Home({countries}) {
  console.log(countries);
   const [keyword, setKeyword] = useState("")
  const filteredCountries  =countries.filter((country) => country.name.toLowerCase().includes(keyword) || country.region.toLowerCase().includes(keyword) ||country.subregion.toLowerCase().includes(keyword));
  const onInputChange= (e) => {
    e.preventDefault();  
    setKeyword(e.target.value.toLowerCase());
  }
  
  
  
  return (
     
     <Layout>
       <div className={styles.inputContainer}>
       <div className={styles.counts}>
       Found {countries.length} Countries
       <div className={styles.input}>
       <SearchInput placeholder="Filter by name , region or subregion" onChange={onInputChange }/>
       </div>

       </div>
       

       <CountriesTable countries={filteredCountries}/>
       </div>
       </Layout>
  )
}
export const getStaticProps = async () => { // static props are useful as they get fetch the data at start time 

    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json()
    return {
      props :{
        countries,
      },
    }
   

}