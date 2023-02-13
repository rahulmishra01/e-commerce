import React, { Fragment } from "react";
import { FaShippingFast } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { BsBank } from "react-icons/bs";
import { Typography, Stepper, Step, StepLabel } from "@material-ui/core";
import "./checkoutstep.css";

const index = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <FaShippingFast />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <GiConfirmed />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <BsBank />,
    },
  ];

  const stepStyle = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default index;
