import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
// import { useQualities } from "../../../hooks/useQualities";
import { useSelector, useDispatch } from "react-redux";
import {
    getQualitiesLoadingStatus, getQualitiesByIds, loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    // const { isLoading } = useQualities();
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) return "Loading...";
    return (
        !isLoading
            ? qualitiesList.map((qual) => (
                <Qualitie key={qual._id} {...qual}/>
            ))
            : "Loading..."
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
