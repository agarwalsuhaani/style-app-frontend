import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  
  const handleSignupClick = () => {
    navigate("/");
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}
    >
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="text-white my-5 mx-auto"
            style={{
              borderRadius: "1rem",
              maxWidth: "400px",
              background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
              <p className="text-white mb-5">Please enter your details!</p>
              
              <MDBInput
                wrapperClass="mb-4 w-100"
                labelClass="text-white"
                label="Name"
                id="nameInput"
                type="text"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 w-100"
                labelClass="text-white"
                label="Email address"
                id="emailInput"
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 w-100"
                labelClass="text-white"
                label="Password"
                id="passwordInput"
                type="password"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 w-100"
                labelClass="text-white"
                label="Confirm Password"
                id="confirmPasswordInput"
                type="password"
                size="lg"
              />

              <p className="small mb-3 pb-lg-2">
                <a className="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>

              <MDBBtn
                color="light"
                size="lg"
                style={{
                  borderRadius: "50px",
                  color: "#333",
                  backgroundColor: "#82c4f4",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#6db3e5")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#82c4f4")}
                onClick={handleSignupClick}
              >
                Sign Up
              </MDBBtn>

              <p className="mt-4 mb-0">
                Already have an account?{" "}
                <a href="/" className="text-white-50 fw-bold">
                  Login
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;
