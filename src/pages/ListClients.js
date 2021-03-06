import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import DeletClient from '../component/DeletClient';
import Pagination from '../component/Pagination';
import Header from '../component/Header';

import { Link } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";


const ListClients = () => {
    const [clients, setClients] = useState([]);
    const [changeValue, setChangeValue] = useState(false);
    const [noClients, setNoClients] = useState("");
    const [pageOfItems, setPageOfItems] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/api/client/',{withCredentials: true, credentials: 'include'}
        )
            .then(response => {
                if (response.status === 200) {
                    setClients(response.data);
                    if (response.data.length === 0){
                        setNoClients("Pas d'utilisateurs dans la base")
                    }
                } else {
                    console.log(response.data)
                }

            });
    }, [changeValue]);

    const changeEtat = (value) => {
        value === true && setChangeValue(!changeValue);
        console.log(changeValue);

    }

   const onChangePage = (pageOfItems) => {
        console.log("pageOfItems ===>", pageOfItems)
        // update state with new page of items
        setPageOfItems( pageOfItems );
    }
    return (
        <div>
            <Header />
            <h1>Liste des clients</h1>
            
                <div>
                    <Container>
                        
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>FirstName</TableCell>
                                        <TableCell align="right">LastName</TableCell>
                                        <TableCell align="right">Phone</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                        <TableCell align="right">Adress</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pageOfItems.map((el, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{el.firstName}</TableCell>
                                            <TableCell align="right">{el.lastName}</TableCell>
                                            <TableCell align="right">{el.phone}</TableCell>
                                            <TableCell align="right">{el.email}</TableCell>
                                            <TableCell align="right">{el.adress}</TableCell>
                                            <TableCell align="right"><Link to={`/editClient/${el._id}`}><FaUserEdit /></Link> </TableCell>
                                            <TableCell align="right"><DeletClient idClient={el._id} changeEtatDelete={changeEtat.bind()} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Pagination items={clients} onChangePage={onChangePage.bind()} />
                    </Container>
                    


                </div>
            

            
        </div>
    );
};

export default ListClients;