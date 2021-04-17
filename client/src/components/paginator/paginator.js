import React from "react";
import Box from "@material-ui/core/Box";

import Pagination from '@material-ui/lab/Pagination';

export default function Paginator({shiftPage, last_page, currentPage}) {

    return (
        <Box style={{padding: "2vh 0"}}>
            <Pagination page={currentPage} color="secondary" count={last_page} onChange={
                (obj, page) => {shiftPage(page)}} />
        </Box>
    );

}