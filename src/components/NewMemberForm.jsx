import React, { useEffect, useState } from "react";
import { commonPostApi, commonPutApi } from "../server/Api";
import { domain } from "../utils/constent";
import { toast } from "react-toastify";

export default function BookForm({ onOk = () => {}, editData = "" }) {
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    status: "Available", // default
  });

  const [loading, setLoading] = useState(false); // 🔹 loader state

  useEffect(() => {
    setFormValues({
      title: editData?.title || "",
      author: editData?.author || "",
      genre: editData?.genre || "",
      year: editData?.year || "",
      status: editData?.status || "Available",
    });
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader

    const postData = {
      title: formValues.title,
      author: formValues.author,
      genre: formValues.genre,
      year: parseInt(formValues.year),
      status: formValues.status,
    };

    try {
      let response;
      if (editData) {
        response = await commonPutApi(
          `${domain}/books/${editData?._id}`,
          postData
        );
      } else {
        response = await commonPostApi(`${domain}/books`, postData);
      }

      if (response.status >= 200 && response.status < 300) {
        setFormValues({
          title: "",
          author: "",
          genre: "",
          year: "",
          status: "Available",
        });
        toast.success(editData ? "Book updated successfully!" : "Book added successfully!");
        onOk();
      } else {
        toast.error("Failed to submit the form!");
        console.error("Failed to submit the form. Status:", response.status);
      }
    } catch (error) {
       toast.error("Error submitting the form!");
      console.error("Error submitting the form:", error);
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div>
      <form className="py-3" onSubmit={submitHandler}>
        {/* ---- Inputs ---- */}
        <div className="pb-3">
          <p className="fs-14-12 mb-1 fw-semibold">
            Title <span className="text-danger">*</span>
          </p>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
            className="input-box mw-100 form-input"
            placeholder="Enter book title"
          />
        </div>

        <div className="pb-3">
          <p className="fs-14-12 mb-1 fw-semibold">
            Author <span className="text-danger">*</span>
          </p>
          <input
            type="text"
            name="author"
            value={formValues.author}
            onChange={handleChange}
            required
            className="input-box mw-100 form-input"
            placeholder="Enter author name"
          />
        </div>

        <div className="pb-3">
          <p className="fs-14-12 mb-1 fw-semibold">
            Genre <span className="text-danger">*</span>
          </p>
          <input
            type="text"
            name="genre"
            value={formValues.genre}
            onChange={handleChange}
            required
            className="input-box mw-100 form-input"
            placeholder="Enter genre"
          />
        </div>

        <div className="pb-3">
          <p className="fs-14-12 mb-1 fw-semibold">
            Published Year <span className="text-danger">*</span>
          </p>
          <input
            type="number"
            name="year"
            value={formValues.year}
            onChange={handleChange}
            required
            className="input-box mw-100 form-input"
            placeholder="Enter published year"
          />
        </div>

        <div className="pb-3">
          <p className="fs-14-12 mb-1 fw-semibold">
            Status <span className="text-danger">*</span>
          </p>
          <select
            name="status"
            value={formValues.status}
            onChange={handleChange}
            required
            className="input-box mw-100 form-input"
          >
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>
        </div>

        {/* ---- Submit Button ---- */}
        <div className="d-flex justify-content-center">
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
