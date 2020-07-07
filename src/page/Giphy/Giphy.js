
import React, { useState , useEffect} from "react";
import styled from "styled-components";


const CardList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;
const Card = styled.div`
    width: 200px;
    & img {
        width: 100%;
    }
`;

export default function Github() {
    const [datas, setDatas] = useState([]);
     // eslint-disable-next-line
    const [name,setName ] = useState('');
    
    const fetchData = (async () => {
        const url = `https://api.giphy.com/v1/gifs/trending?api_key=xgyUElZK5dc7HACk7p8bb05XcrWj8RZz&limit=6&rating=g
        `;
        const response = await fetch(url);
        const result = await response.json();

        setDatas([result])
    })

    useEffect(() => {
       fetchData()     
    },[]);
    
    function handleChange(event){
        setName(event.target.value)
    }


    const handleSubmit = ( async (event) => {
        event.preventDefault();

        const url = `https://api.giphy.com/v1/gifs/search?api_key=xgyUElZK5dc7HACk7p8bb05XcrWj8RZz&q=${name}&limit=6&offset=0&rating=g&lang=en`;
        const response = await fetch(url);
        const result = await response.json();

        setDatas([result]);
        console.log(datas.data);
    });
   
    

    return (
        <div>
            <form onSubmit={handleSubmit}>

             <input type="text" name="name" id="name" placeholder="Search for GIF and enter" value={name} 
             onChange={handleChange}/>
            </form>

            <CardList id="content">
                {datas.map((data) => {
                    return (
                    <Card>
                        <img src={data.images_original_url} alt="gif"/>
                    </Card>
                    );
                })}
               
            </CardList>
        </div>
    );
}