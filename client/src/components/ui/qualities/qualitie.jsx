import React from "react";
import PropTypes from "prop-types";
// import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ _id, color, name }) => {
    // const { getQuality } = useQualities();
    // const qual = getQuality(id);
    // return (
    //     <span className={"badge m-1 bg-" + qual.color}>
    //         {qual.name}
    //     </span>
    // );
    return (
        <span className={"badge m-1 bg-" + color} key = {_id}>
            {name}
        </span>
    );
};

Qualitie.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string
};
export default Qualitie;
