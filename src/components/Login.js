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

function Login() {
  const navigate = useNavigate();

  const dummyUser = {
    email: "dummyuser@example.com",
    password: "password123",
    user_id: 345,
  };

  const handleLoginClick = () => {
    const enteredEmail = document.getElementById("emailInput").value;
    const enteredPassword = document.getElementById("passwordInput").value;

    // Hardcoded user authentication
    if (
      enteredEmail === dummyUser.email &&
      enteredPassword === dummyUser.password
    ) {
      navigate("/upload", { state: { user_id: dummyUser.user_id } });
    } else {
      alert("Invalid login credentials!");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="emailInput" 
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="passwordInput" 
                type="password"
                size="lg"
              />

              <p className="small mb-3 pb-lg-2">
                <a class="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>
              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={handleLoginClick}
              >
                Login
              </MDBBtn>

              <div>
                <p className="mb-0">
                  Don't have an account?{" "}
                  <a href="signup" class="text-white-50 fw-bold">
                    Sign Up
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;