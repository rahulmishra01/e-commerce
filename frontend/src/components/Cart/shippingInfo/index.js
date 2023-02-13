import React, { Fragment, useState } from "react";
import "./shippinginfo.css";
import { useDispatch, useSelector } from "react-redux";
import { SaveShippingInfo } from "../../../redux/action/cartAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { FcHome } from "react-icons/fc";
import { FaCity } from "react-icons/fa";
import { MdRealEstateAgent } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { AiTwotonePushpin } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import CheckputStep from "./CheckoutStep";
const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const sippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      return alert.error("Phone no should be 10 digit");
    }
    dispatch(
      SaveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckputStep activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Deatils</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={sippingSubmit}
          >
            <div>
              <FcHome />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <FaCity />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <AiTwotonePushpin />
              <input
                type="Number"
                placeholder="PinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
              />
            </div>
            <div>
              <BiPhoneCall />
              <input
                type="number"
                placeholder="Phone no."
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            <div>
              <BiWorld />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <MdRealEstateAgent />
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
