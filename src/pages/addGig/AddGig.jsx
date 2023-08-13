import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import "./AddGig.scss";

function AddGig() {
  const [coverFile, setCoverFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    if (e.target[0].value.length === 0) {
      return;
    }
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const cover = await upload(coverFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setIsUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/myGigs");
  };

  return (
    <div className="addGig">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="cat">Category</label>
            <select required name="cat" id="cat" onChange={handleChange}>
              <option>Select a category</option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="16"
              placeholder="Brief descriptions to introduce your service to customers"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="right">
            <label htmlFor="shortTitle">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              id="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              name="shortDesc"
              id="shortDesc"
              cols="30"
              rows="10"
              placeholder="Short description of your service"
              onChange={handleChange}
            />
            <label htmlFor="deliveryTime">Delivery Time(e.g. 3 days)</label>
            <input
              type="number"
              name="deliveryTime"
              id="deliveryTime"
              min={1}
              onChange={handleChange}
            />
            <label htmlFor="revisionNumber">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              id="revisionNumber"
              min={1}
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((feature) => (
                <div key={feature} className="item">
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: feature })
                    }
                  >
                    {feature}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              min={1}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddGig };
