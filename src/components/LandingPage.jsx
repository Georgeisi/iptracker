import React, { useEffect, useState } from "react";
import arrow from "../images/icon-arrow.svg";
import Map from "./Map";
import { useMap } from "react-leaflet";
import { isIP } from "is-ip";

// at_lUdcaQku2djnWWuxXn6VFSP6WluE5

const LandingPage = () => {
  const [data1, setData1] = useState([]);
  const [region, setRegion] = useState("");
  const [zone, setZone] = useState("");
  const [lat, setLat] = useState(51.505);
  const [lng, setLng] = useState(-0.09);
  const [userIp, setUserIp] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetch(
  //       "https://geo.ipify.org/api/v2/country,city?apiKey=at_jomt30uMxL9ukos95LKLP7nA5gD8p"
  //     );
  //     const data = await res.json();
  //     // console.log(data.location.region);
  //     setRegion(data.location.region);
  //     setZone(data.location.timezone);
  //     setLat(data.location.lat);
  //     setLng(data.location.lng);
  //     // console.log(data);
  //     // console.log(lat);
  //     setData1(data);
  //   };

  //   setTimeout(() => {
  //     // getData()
  //   }, 1000);
  // }, [lat, lng]);
 let getInfo= isIP(`https://geo.ipify.org/api/v2/country,city?apiKey=at_jomt30uMxL9ukos95LKLP7nA5gD8p&ipAddress=${userIp}`)
  useEffect(() => {
    const getIp = async () => {
      const res = await fetch(
       getInfo===true? `https://geo.ipify.org/api/v2/country,city?apiKey=at_jomt30uMxL9ukos95LKLP7nA5gD8p&ipAddress=${userIp}`:`https://geo.ipify.org/api/v2/country,city?apiKey=at_jomt30uMxL9ukos95LKLP7nA5gD8p&domain=${userIp}`
      );

      if (res.status >= 400 && res.status <= 499) {
        setError("Something went wrong");
        return;
      }

      const data = await res.json();
      // console.log(data.location.region);
      setRegion(data.location.region);
      setZone(data.location.timezone);
      setLat(data.location.lat);
      setLng(data.location.lng);
      console.log(data);
      // console.log(lat);
      setData1(data);
      // setUserIp(data.ip);
      setError(null)
    };

    getIp();
    // console.log("rr");
  }, [userIp]);

  

  return (
    <div>
      <section className="">
        <div className="bg-image position-relative">
          <h2 className="py-lg-3 fw-bold">IP Address Tracker</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUserIp(e.target.userInput.value);
            }}
          >
            <div className="d-flex  justify-content-center mw650 mx-auto mb-lg-5">
              <input
                onChange={(e) => {
                  // setUserIp(e.target.value);
                }}
                className="p-2 border-none brad1 border-0 w-100 "
                type="text"
                placeholder="search for any ip address or domain"
                name="userInput"
              />
              <button
                onClick={() => {
                  // getIp();
                }}
                className="bg-dark p-2 brad  "
              >
                <img src={arrow} alt="" />
              </button>
            </div>
          </form>
        </div>
        {data1 ? (
          <Map lng={lng} lat={lat} />
        ) : (
          <p className="text-sucess">loading...</p>
        )}

        {data1 && !error ? (
          <div className="mw1240 bg-white mx-auto rounded-3 row position-absolute ip p-0">
            <div className="col-md-3 col-sm-4 border-end-1 border-gray x  p-0">
              <h3 className="bg-gray f ">IP ADDRESS</h3>
              <p className="f">{data1.ip}</p>
            </div>
            <div className="col-md-3 col-sm-4 x border-right p-0 ">
              <h3 className="bg-gray f">LOCATION</h3>
              <p className="f">{region}</p>
            </div>
            <div className="col-md-3 col-sm-4 border-right p-0 x ">
              <h3 className="bg-gray f">TIMEZONE</h3>
              <p className="f">{zone}</p>
            </div>
            <div className="col-md-3 p-0 col-sm-4 x ">
              <h3 className="bg-gray f ">ISP</h3>
              <p className="f ">{data1.isp}</p>
            </div>
          </div>
        ) : error ? (
          <div className="mw1240 bg-white mx-auto rounded-3 row position-absolute ip p-1">
            {error}
          </div>
        ) : (
          <p>loading</p>
        )}
      </section>
    </div>
  );
};

export default LandingPage;
