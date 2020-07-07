
import React, { useState , useEffect} from "react";
import styled from "styled-components";


const CardList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;
const Card = styled.div`
    width: 200px;
    margin:50px;
    & img {
        width: 100%;
    }
`;

const Form = styled.form`
    width:300px;
    margin:auto;
    margin-top:50px;
    margin-bottom:50px;
`;
const Input = styled.input`
    width:200px;
    height:50px;
`;
export default function Github() {
    const [datas, setDatas] = useState({})
    const [name,setName ] = useState('');
    
    const fetchData = (async () => {
        const url = `https://api.giphy.com/v1/gifs/trending?api_key=xgyUElZK5dc7HACk7p8bb05XcrWj8RZz&limit=6&rating=g
        `;
        const response = await fetch(url);
        const result = await response.json();

        await setDatas(result)
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

        setDatas(result);
       
    });
   
    
    console.log(datas);
    return (
        <div>
            <Form onSubmit={handleSubmit}>

             <Input type="text" name="name" id="name" placeholder="Search for GIF and enter" value={name} 
             onChange={handleChange}/>
            </Form>

            <CardList id="content">
            {datas.data !== undefined &&
                    datas.data.map((item) => {

                        return (
                        

                            <Card key={item.id}>
                                <img src={item.images.original.url} alt="gif"/> 
                                   
                            </Card>
                       
                           
                        );
                    })}
            </CardList>
        </div>
    );
}