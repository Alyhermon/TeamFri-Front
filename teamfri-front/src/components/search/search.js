import React, { useState, useEffect } from 'react'

const Search = (props) => {
    //hooks useState
    const [ users, setUsers ] = useState([]);
    const [ search, setSearch ] = useState("");

    //traer datos de la api
    // const url= 'https://localhost:7116/api/User';
    const url = 'http://localhost:3002/empleados';

    const show = async () =>{
        const response = await fetch(url);
        const data = await response.json();
    }

    //filtro
    const searcher = (e) =>{
        setSearch(e.target.value);
        console.log(e.target.value);
    }

    const results = users.filter((dato) => dato.name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        show();
    }, [])

    //render
    return(
        <div className='search'>
            <input type="text" onChange={searcher} className="form-control" value={search} placeholder='filtrar...' />
        </div>
    )
}

export default Search