import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getitembyid, putitem } from '../Redux/Crudslice';
import { useDispatch} from 'react-redux';

export default function Update() {

    const dispatch = useDispatch()
    // const selector = useSelector(state => state.Product.value)


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)

    const { id } = useParams()
    useEffect(() => {
        dispatch(getitembyid(id))
            .unwrap()
            .then(res => {
                setName(res.Name)
                setPrice(res.Price)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id, dispatch]);



    function Submit() {
        try{
            const data = {_id:id, Name: name, Price: price, image };
        dispatch(putitem(data))
        //    window.location = '/list'
        }
        catch(err){
            console.log(err);
            
        }   
    }

    console.log(name, price);


    return (
        <div style={{ height: '400px', width: '300px', margin: '100px auto auto auto', backgroundColor: 'skyblue' }}>
            <Box sx={{ backgroundColor: 'transparent', margin: '0px 50px 0px 50px', padding: '30px 0px' }}>

                <TextField type='text' color='secondary' value={name} onChange={(e) => { setName(e.target.value) }} label="Product_name" variant="filled" />

                <TextField type='number' value={price} onChange={(e) => { setPrice(e.target.value) }} color='secondary' label="Price" variant="filled" />

                <TextField type='file' color='secondary' onChange={(e) => { setImage(e.target.files[0]) }} variant="filled" />

                <Button color='secondary' variant='contained' onClick={Submit}>Send</Button>
            </Box>
        </div>
    )
}
