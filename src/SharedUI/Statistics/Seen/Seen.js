import React from 'react';
import { SeenIcon } from '../../../Assets/Svg/Statistics';

const Seen = ({ seen }) => {
    return (
        <div className="seen" style={{display: 'flex'}}>
            <SeenIcon alt="" />
            <p style={{fontSize : "12px"}}>{seen || "N/A"}</p>
        </div>
    );
};

export default Seen;