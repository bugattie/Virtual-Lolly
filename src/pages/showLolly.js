import React from 'react'
import { useQueryParam } from 'gatsby-query-params'
import { useQuery, gql } from "@apollo/client"

import Header from "../components/Header"
import Lolly from "../components/Lolly"

const GetLolly = gql`
    query getData($lollyPath: String!) {
        getLolly(lollyPath: $lollyPath) {
            recipientName
            message
            senderName
            flavourTop
            flavourMiddle
            flavourBottom
            lollyPath
        }
    }
`;

const ShowLolly = ({ location }) => {
    console.log(location)    
    const id = useQueryParam("id", "123");


    const { data, loading, error } = useQuery(GetLolly, {
        variables: {
            lollyPath: id
        }
    })

    return (
        <div className="container">
      <Header/>
      {loading && <p>Loading Client Side Querry...</p>}
      {error && <p>Error: ${error.message}</p>}
      {data && data.getLolly && 
      <div className="newLollyForm1">
        <div>
            <Lolly lollyTopFill={data.getLolly.flavourTop} lollyMiddleFill={data.getLolly.flavourMiddle} lollyBottomFill={data.getLolly.flavourBottom} />
        </div>
        <div className="result">
            <div className="details" >
                <h1>Your lolly is freezing. Share it with this link:</h1>
                <h3>{location.origin}/showLolly/{data.getLolly.lollyPath}</h3>
                <div className="result__details">
                    <div id="recipient" className="reciever">
                        {data.getLolly.recipientName}
                    </div>
                    <div id="message" className="message">
                        {data.getLolly.message}
                    </div>
                    <div id="from" className="sender">
                        {data.getLolly.senderName}
                    </div>
                </div>
            </div>
        </div>
      </div>}
    </div>
    )
}

export default ShowLolly;