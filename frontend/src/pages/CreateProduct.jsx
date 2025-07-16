import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import {toast} from "react-toastify"

const CreateProduct = () => {
    const {token , navigate , backendUrl} = useContext(ShopContext)
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    campus: "",
    category: "",
    condition: "new",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([null, null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...form.images];
    newImages[index] = file;

    const newPreviews = [...previewImages];
    newPreviews[index] = URL.createObjectURL(file);

    setForm((prev) => ({ ...prev, images: newImages }));
    setPreviewImages(newPreviews);
  };

  const removeImage = (index) => {
    const newImages = [...form.images];
    newImages[index] = undefined;

    const newPreviews = [...previewImages];
    newPreviews[index] = null;

    setForm((prev) => ({ ...prev, images: newImages }));
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      for (let key in form) {
        if (key === "images") {
          form.images.forEach((file, idx) => {
            if (file) formData.append(`image${idx + 1}`, file);
          });
        } else {
          formData.append(key, form[key]);
        }
      }

      const res = await axios.post(`${backendUrl}/api/product/add-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Product creation failed:", error);
      toast.error("Product creation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded shadow-sm"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-sm"
        />
        <input
          name="price"
          type="number"
          placeholder="Price (INR)"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded shadow-sm"
        />
        <input
          name="campus"
          placeholder="Campus"
          value={form.campus}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded shadow-sm"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded shadow-sm"
        />

        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-sm"
        >
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="refurbished">Refurbished</option>
        </select>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="relative border rounded aspect-square flex items-center justify-center bg-gray-50 overflow-hidden"
            >
              {previewImages[index] ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewImages[index]}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                  >
                    <X className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              ) : (
                <label className="w-full h-full flex items-center justify-center cursor-pointer text-sm text-gray-500">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageSelect(e, index)}
                    className="hidden"
                  />
                  + Add Image
                </label>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
