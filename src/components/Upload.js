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
  MDBIcon,
} from "mdb-react-ui-kit";
import { uploadFiles, getUserImages, getRecommendation } from "../api";

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const location = useLocation();
  const userId = location.state?.userId || 345;

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files.slice(0, 1)); // Allow only one file
    console.log(files);
    setUploading(true);
    // await handleFileUploadClick(files.slice(0, 1)); // Automatically trigger upload
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  const handleGenerateSchedule = async () => {
    setLoading(true);
    try {
      const response = await getRecommendation(userId);
      const data = await response.json();
      if (data && data.final_recc) {
        setRecommendations(data.final_recc); 
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploadedImages(userId);
  }, [userId]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUploadClick = async () => {
    const formData = new FormData();
    formData.append("user_id", userId);

    selectedFiles.forEach((file) => {
      console.log("file", file);
      formData.append("file", file);
    });
    try {
      await uploadFiles(formData);
      fetchUploadedImages(userId);
    } catch (error) {
      console.error("Error uploading files:", error);
    }  finally {
      setUploading(false); // Reset uploading status
    }
  };

  const scrollRefs = useRef([]);

  const handleScroll = (index, direction) => {
    const scrollAmount = 200; // Adjust scroll amount as needed
    if (direction === "left") {
      scrollRefs.current[index].scrollLeft -= scrollAmount;
    } else {
      scrollRefs.current[index].scrollLeft += scrollAmount;
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-5"
      style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}
    >
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
              <h2
                className="text-center mb-4"
                style={{ fontWeight: "bold", letterSpacing: "2px" }}
              >
                Upload Your Files
              </h2>

              <form onSubmit={handleSubmit} className="w-100">
                <div className="mb-4 d-flex flex-column flex-md-row justify-content-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <div className="d-flex justify-content-center flex-wrap">
                    <MDBBtn
                      color="info"
                      size="lg"
                      onClick={handleButtonClick}
                      className="mb-3 mx-2"
                      style={{
                        borderRadius: "50px",
                        backgroundColor: "#82c4f4",
                        transition: "background-color 0.3s ease",
                        minWidth: "150px",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#6db3e5")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#82c4f4")
                      }
                    >
                      <i className="fas fa-folder-open me-2"></i>
                      Select Files
                    </MDBBtn>

                    <MDBBtn
                      color="light"
                      size="lg"
                      type="submit"
                      className="mb-3 mx-2"
                      onClick={handleFileUploadClick}
                      style={{
                        borderRadius: "50px",
                        color: "#333",
                        borderColor: "#82c4f4",
                        transition: "all 0.3s ease",
                        minWidth: "150px", // Ensure buttons have a minimum width
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
                      onClick={() => handleGenerateSchedule(userId)}
                      className="mb-3 mx-2"
                      style={{
                        borderRadius: "50px",
                        transition: "background-color 0.3s ease",
                        minWidth: "150px",
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <>
                          <i className="fas fa-calendar-alt me-2"></i>
                          Generate Schedule
                        </>
                      )}
                    </MDBBtn>
                  </div>
                </div>
                {selectedFiles.length > 0 && (
                  <p className="text-center mb-3">
                    {uploading
                      ? `Uploading ${selectedFiles[0].name}...`
                      : `File ${selectedFiles[0].name} uploaded successfully.`}
                  </p>
                )}
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <MDBCard
          className="mb-4"
          style={{
            borderRadius: "1rem",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <MDBCardBody>
            <h5 className="text-center">Uploaded Images</h5>
            <div
              style={{
                display: "flex",
                overflowX: "auto", // Enable horizontal scrolling
                whiteSpace: "nowrap", // Prevent wrapping of child elements
                padding: "10px",
              }}
            >
              {uploadedImages.map((imageUrl, index) => (
                <MDBCard
                  key={index}
                  style={{
                    minWidth: "200px",
                    margin: "10px",
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
          </MDBCardBody>
        </MDBCard>
      </MDBRow>

      {/* Display Images for Selected Days Based on Recommendations */}
      <MDBRow>
        <MDBCard
          className="mb-4"
          style={{
            borderRadius: "1rem",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <MDBCardBody>
            {recommendations.length > 0 && (
              <>
                {recommendations.map((dayRec, index) => (
                  <MDBRow className="mt-4" key={index}>
                    <h5 className="text-center" style={{ color: "#007bff" }}>
                      {dayRec.day}
                    </h5>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        overflowX: "auto",
                        padding: "10px 30px", // Leave room for arrows
                      }}
                    >
                      {/* Left Arrow */}
                      <MDBIcon
                        icon="chevron-left"
                        onClick={() => handleScroll(index, "left")}
                        style={{
                          position: "absolute",
                          left: "10px",
                          cursor: "pointer",
                          zIndex: 1,
                        }}
                      />

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          gap: "10px",
                          overflowX: "scroll",
                          scrollBehavior: "smooth",
                        }}
                        ref={(el) => (scrollRefs.current[index] = el)} // Store ref per day
                      >
                        {dayRec.image_urls.map((imageUrl, imgIndex) => (
                          <MDBCard
                            key={imgIndex}
                            style={{
                              minWidth: "200px",
                              margin: "10px",
                              borderRadius: "15px",
                              overflow: "hidden",
                              boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
                            }}
                          >
                            <MDBCardImage
                              src={imageUrl}
                              alt={`Image for ${dayRec.day}`}
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                          </MDBCard>
                        ))}
                      </div>

                      {/* Right Arrow */}
                      <MDBIcon
                        icon="chevron-right"
                        onClick={() => handleScroll(index, "right")}
                        style={{
                          position: "absolute",
                          right: "10px",
                          cursor: "pointer",
                          zIndex: 1,
                        }}
                      />
                    </div>
                  </MDBRow>
                ))}
              </>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default Upload;
