import React, { useEffect, useState} from "react";
import VideoCNDServices from "../../services/videoCND-services";
import {useDispatch, useSelector} from "react-redux";
import {listSet, parameterSet, toggleMenu, urlSet} from "../../actions";
import Paginator from "../paginator";
import SelectItem from "../select-item";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "../list-item";
import BazonServices from "../../services/bazon-services";

export default function SelectionBar({io}) {

    const list = useSelector(state => state.list);
    const parameters = useSelector(state => state.parameters);
    const loading = useSelector(state => state.loading);
    const isOpenMenu = useSelector(state => state.isOpenMenu);

    const [videoAPI, setVideoAPI] = useState(new VideoCNDServices());

    const dispatch = useDispatch();

    const onChangeTypeAPI = (type) => {
        switch (type) {
            case 'vcnd':
                setVideoAPI(new VideoCNDServices());
                break;
            case 'bazon':
                setVideoAPI(new BazonServices());
                break;
            default:
                break;
        }

        dispatch(parameterSet(parameters));
    }

    const shiftPage = (page) => {
        dispatch(parameterSet(  Object.assign( {}, parameters, {page: page}) ));
    }

    const onChangeSearch = (search) => {
        dispatch(parameterSet(  Object.assign( {}, parameters, {search, page: 1})));
    }

    const onChangeCategory = (category) => {
        dispatch(parameterSet(  Object.assign( {}, parameters, {category, page: 1}) ));
    }

    const onChangeUrl = (url) => {
        io.sendUrlMessage(url);
    }

    const onChangeSrc = (src) => {
        dispatch(urlSet(src));
    }

    useEffect( () => {
        io.changeUrlMessage(onChangeSrc);
        io.receiveDataMessage((data) => onChangeSrc(data.url));
        }, []
    )

    useEffect( () => {
        videoAPI.getList(  ...Object.values(parameters) ).then( (res) => {
            dispatch(listSet(res));
        });
    }, [parameters, dispatch, videoAPI]);

    return (
        <Drawer anchor={'left'} open={isOpenMenu} onClose={() => dispatch(toggleMenu())}>
            <div style={{display: "flex", flexDirection: "column", height: "100vh",
                        overflow: "hidden", justifyContent: "space-between"}}>
                <SelectItem parameters={parameters}
                            onChangeCategory={onChangeCategory}
                            onChangeSearch={onChangeSearch}
                            onChangeTypeAPI={onChangeTypeAPI}/>
                <ListItem list={list} loading={loading} onChangeUrl={onChangeUrl}/>
                <Paginator currentPage={parameters.page} shiftPage={shiftPage} last_page={list.last_page}/>
            </div>
        </Drawer>
    );
}