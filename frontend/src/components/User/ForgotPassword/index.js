import React, { Fragment, useEffect, useState } from "react";
import Loader from "../../layout/Loader/loader";
import MetaData from "../../layout/MetaData";
import { GrMail } from "react-icons/gr";
import { useAlert } from "react-alert";
import "./forgotpassword.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, ForgotPassword } from "../../../redux/action/userAction";

const Index = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.forgot);
  const alert = useAlert();

  const UpdatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(ForgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [error, alert, dispatch, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                encType="multipart/form-data"
                onSubmit={UpdatePasswordSubmit}
              >
                <div className="updateProfileEmail">
                  <GrMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Index;
