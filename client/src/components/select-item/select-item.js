import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function SelectItem({parameters, onChangeSearch, onChangeCategory, onChangeTypeAPI}) {

    const onEnter = (e) => {

        if (e.which === 13 || e.target.value.length === 0) {
            onChangeSearch(e.target.value);
        }
    }

    return (
        <div style={{margin: "10px 10px", display: "flex", flexDirection: "column"}}>
            <Select style={{marginBottom: "10px"}} 
                    defaultValue={'vcnd'}
                    onChange={(e) => onChangeTypeAPI(e.target.value)}>
                <MenuItem value={'vcnd'}>VideoCND</MenuItem>
                <MenuItem value={'bazon'}>Bazon</MenuItem>
            </Select>
            <Select style={{marginBottom: "10px"}} 
                    defaultValue={parameters.category}
                    value={parameters.category}
                    onChange={(e) => onChangeCategory(e.target.value)}>
                <MenuItem value={'/movies'}>Фильмы</MenuItem>
                <MenuItem value={'/tv-series'}>Сериалы</MenuItem>
                <MenuItem value={'/animes'}>Полнометражные аниме</MenuItem>
                <MenuItem value={'/anime-tv-series'}>Сериальное аниме</MenuItem>
                <MenuItem value={'/show-tv-series'}>ТВ Шоу</MenuItem>
            </Select>
            <TextField size={'small'} variant="outlined" label="Поиск" onKeyUp={onEnter}/>
        </div>
    );
}