import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
function StatusQueryComp(props) {

    const initialState = {

        selected: 0,
        statusList: [],

    }

    const handleChange = (evt) => {

        let { name, value } = evt.target
        setState({ ...state, [name]: value })

    }
    const [state, setState] = useState(initialState);


    useEffect(async () => {

        try {

            const resStatus = await axios.get(`https://localhost:44357/api/Status`)
            setState({ ...state, statusList: resStatus.data })

        }
        catch (e) {
            console.log("error")
        }

    }, []);

    return (
        <div style={{display:"flex",width:"100%",justifyContent:"end"}}>
            <FormControl fullWidth sx={{ width:"25%" }}>
                <InputLabel id="demo-simple-select-label">Status Filter</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.selected}
                    label="Status"
                    onChange={(e) => {
                        setState({ ...state, selected: e.target.value })
                    }}
                    sx={{ textAlign: "left" }}
                >
                    <MenuItem selected key={0} value={0}>All</MenuItem>
                    {
                        state.statusList &&
                        state.statusList.map(item => (
                            <MenuItem key={item.statusId} value={item.statusId}>{item.message}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
            <div style={{width: '10%',alignSelf:"center"}}>
            <Button
                sx={{height:"56px"}}
                variant="outlined"
                color="success"
                onClick={() => {
                    props.setQuery(state.selected)
                }}
                endIcon={<FilterListIcon/>}
                
            >
                Filter</Button>
                </div>
        </div>
    )
}

export default StatusQueryComp
