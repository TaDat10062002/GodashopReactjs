import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function ItemPerPage({ ItemPerPage, setItemPerPage }) {

    const style = {
        position: 'absolute',
        top: '0%',
        left: '100%',
        transform: 'translate(-50%, -50%)',
    };

    return (
        <>
            <div>
                <Box sx={{ minWidth: 150 }} {...style}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Số lượng sản phẩm</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ItemPerPage}
                            label="Hiển thị số lượng sản phẩm"
                            onChange={(e) => setItemPerPage(e.target.value)}
                        >
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
        </>
    );
}
