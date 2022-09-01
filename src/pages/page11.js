import styled from "styled-components";
import { useState } from "react";

export default function Form() {
  const initialProduct = { name: "", price: "", image: [] };
  const placeholderImage =
    "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740";
  const [product, setProduct] = useState(initialProduct);
  const [previewImage, setPreviewImage] = useState(placeholderImage);
  console.log(previewImage);
  console.log(product);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(product);
  }

  function handleChange(event) {
    const field = event.target;
    const value = field.value;
    setProduct({ ...product, [field.name]: value });
  }

  const CLOUD = "dbrzerj5z"; /* process.env.CLOUDINARY_CLOUD */
  const PRESET = "dembv1vl"; /* process.env.CLOUDINARY_PRESET */

  const uploadImage = async () => {
    try {
      const url = `https://api.cloudinary.com/v1_1/${CLOUD}/upload`;

      const fileData = new FormData();
      fileData.append("file", product.image);
      fileData.append("upload_preset", PRESET);

      const response = await fetch(url, {
        method: "POST",
        body: fileData
      });
      // ATTENTION: Does not work with headers, at least I did not find out how!

      setPreviewImage(await response.json());
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {/* ----------NAME---------- */}
      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={product.name}
      />

      {/* ----------PRICE---------- */}
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        onChange={handleChange}
        value={product.price}
      />

      {/* ----------IMAGE---------- */}
      <label htmlFor="image">Image</label>
      <input
        type="file"
        id="image"
        name="image"
        onChange={(event) => {
          handleChange(event);
          uploadImage();
        }}
        value={product.image}
      />
      <img src={previewImage} alt={product.name} />

      <button type="submit">Submit</button>
    </StyledForm>
  );
}

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: lightblue;
  padding: 1rem;
  label,
  legend {
    font-size: 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;
    margin: 0;
    min-width: 0;
  }
  select,
  input,
  button {
    border-radius: 5px;
    border: 1px solid #cccccc;
  }
  span {
    color: red;
  }
`;
