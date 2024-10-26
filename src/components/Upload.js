import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { uploadFiles, getUserImages } from "../api";

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const fileInputRef = useRef(null);
  const location = useLocation();
  const userId = location.state?.userId || 345;

  const handleFileChange = (event) => {
    console.log("1");
    const files = Array.from(event.target.files);
    console.log("Files selected:", files);
  
    // Set only the latest selected file (single file)
    setSelectedFiles(files.slice(0, 1)); // Limit to one file
    console.log("2");
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userId);
    console.log("user id", userId);

    selectedFiles.forEach((file) => {
      console.log("file", file);
      formData.append("file", file);
    });
    console.log(formData);
    try {
      await uploadFiles(formData);
      fetchUploadedImages(userId);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const fetchUploadedImages = async (userId) => {
    try {
      const response = await getUserImages(userId);
      setUploadedImages(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Failed to fetch images. Please try again.");
    }
  };

  useEffect(() => {
    fetchUploadedImages(userId);
  }, [userId]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleGenerateSchedule = () => {
    alert("Schedule generated successfully!");
    // Add functionality here to handle schedule generation
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
     <MDBContainer fluid className="p-5" style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="text-white my-5 mx-auto"
            style={{
              borderRadius: "1rem",
              maxWidth: "1400px",
              background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="text-center mb-4" style={{ fontWeight: "bold", letterSpacing: "2px" }}>
                Upload Your Files
              </h2>

              <form onSubmit={handleSubmit} className="w-100">
                {/* Select Files Button */}
                <div className="mb-4 d-flex justify-content-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <div className="mb-4 d-flex justify-content-center">
  <MDBBtn
    color="info"
    size="lg"
    onClick={handleButtonClick}
    className="mb-3 mx-2"
    style={{
      borderRadius: "50px",
      backgroundColor: "#82c4f4",
      transition: "background-color 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#6db3e5")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "#82c4f4")}
  >
    <i className="fas fa-folder-open me-2"></i>
    Select Files
  </MDBBtn>

  <MDBBtn
    color="light"
    size="lg"
    type="submit"
    className="mb-3 mx-2"
    style={{
      borderRadius: "50px",
      color: "#333",
      borderColor: "#82c4f4",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.color = "#fff")}
    onMouseLeave={(e) => (e.target.style.color = "#333")}
  >
    <i className="fas fa-upload me-2"></i>
    Upload
  </MDBBtn>

  <MDBBtn
    color="success"
    size="lg"
    onClick={handleGenerateSchedule}
    className="mb-3 mx-2"
    style={{
      borderRadius: "50px",
      transition: "background-color 0.3s ease",
    }}
  >
    <i className="fas fa-calendar-alt me-2"></i>
    Generate Schedule
  </MDBBtn>
</div>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {/* Day Selector Dropdown */}
      <MDBRow className="mb-4">
        <MDBCol md="6" className="offset-md-3">
          <MDBDropdown className="w-100">
            <MDBDropdownToggle caret color="info" className="w-100">
              {selectedDay}
            </MDBDropdownToggle>
            <MDBDropdownMenu className="w-100">
              {daysOfWeek.map((day, index) => (
                <MDBDropdownItem
                  key={index}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </MDBDropdownItem>
              ))}
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBCol>
      </MDBRow>

      {/* Display Images for the Selected Day */}
      <MDBRow>
        <MDBCard className="mb-4" style={{ borderRadius: "1rem", boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}>
          <MDBCardBody>
          {uploadedImages.length > 0 && (
  <MDBRow className="mt-4">
    <h5 className="text-center">{selectedDay}</h5>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap", // Use wrap for better responsiveness
        justifyContent: "center", // Center the images horizontally
        alignItems: "center", // Center the images vertically
        padding: "10px",
      }}
    >
      {uploadedImages.map((imageUrl, index) => (
        <MDBCard
          key={index}
          style={{
            minWidth: "200px",
            margin: "10px", // Use margin for spacing
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
          }}
        >
          <MDBCardImage
            src={imageUrl}
            alt={`Uploaded by user ${userId}`}
            style={{ height: "200px", objectFit: "cover" }}
          />
        </MDBCard>
      ))}
    </div>
  </MDBRow>
)}
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default Upload;
