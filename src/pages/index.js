import React from "react"
import { navigate } from "gatsby"

import Header from "../components/Header"
import Lolly from "../components/Lolly"

const Home = () => {
  return (
    <div className="container">
      <Header />
      <div className="banner">
        <div className="first">
          <Lolly />
        </div>
        <div className="second">
          <Lolly />
        </div>
        <div className="third">
          <Lolly
            lollyTopFill="green"
            lollyMiddleFill="blue"
            lollyBottomFill="lightBlue  "
          />
        </div>
        <div className="forth">
          <Lolly
            lollyTopFill="yellow"
            lollyMiddleFill="gray"
            lollyBottomFill="purple"
          />
        </div>
        <div className="fifth">
          <Lolly />
        </div>
        <div className="sixth">
          <Lolly />
        </div>
      </div>
      <div className="btn-top">
        <button
          onClick={() => {
            navigate("/createNew")
          }}
        >
          Make a new lolly to send to a friend
        </button>
      </div>
    </div>
  )
}

export default Home
