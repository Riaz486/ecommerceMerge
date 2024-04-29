import React from 'react'
import Helmet from "react-helmet"
const MetaData = ({ title }) => {
    return (
        //  -- Alert Helmet  library used for title , link , meta data
        <Helmet><title>{title}</title></Helmet>
    )
}

export default MetaData;