import React, { useState } from "react";
import { updateUser } from "../api/api";
import { toast } from "react-toastify"


function Profile({ user, setUser }) {
  console.log("user in profile:", user); // Vérifiez l'utilisateur dans le profil

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || "",
    shipping: {
      address: user.shipping?.address || "",
      city: user.shipping?.city || "",
      postalCode: user.shipping?.postalCode || "",
      country: user.shipping?.country || "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("shipping.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        shipping: { ...prev.shipping, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(formData);
      console.log("User updated:", response.data);
      const updatedUser = { ...user, ...response.data }; // Merge the old user data with the updated data
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Save the updated user object
      setUser(updatedUser);

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container-custom py-16">
      <h1 className="text-3xl font-semibold text-[#bc6c39] mb-8">Profile</h1>
      <div className="bg-[#F0E4CF] shadow-md rounded-lg p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-[#bc6c39] mt-2 mb-4">User Information</h2>
            <div className="mb-4">
              <label className="block text-md font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 text-gray-600 rounded-sm p-1 shadow-sm focus:ring-[#bc6c39] focus:border-[#bc6c39]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 text-gray-600 rounded-sm p-1 shadow-sm focus:ring-[#bc6c39] focus:border-[#bc6c39]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 text-gray-600 rounded-sm p-1 shadow-sm focus:ring-[#bc6c39] focus:border-[#bc6c39]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 text-gray-600 rounded-sm p-1 shadow-sm focus:ring-[#bc6c39] focus:border-[#bc6c39]"
              />
            </div>
            <h2 className="text-xl font-semibold text-[#bc6c39] mt-6 mb-4">Shipping Information</h2>
            <div className="mb-4">
              <label className="block text-md font-semibold">Address</label>
              <input
                type="text"
                name="shipping.address"
                value={formData.shipping.address}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 text-gray-600 rounded-sm p-1 shadow-sm focus:ring-[#bc6c39] focus:border-[#bc6c39]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold">City</label>
              <input
                type="text"
                name="shipping.city"
                value={formData.shipping.city}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 text-gray-600 rounded-sm p-1 shadow-sm focus:ring-[#bc6c39] focus:border-[#bc6c39]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold">Postal Code</label>
              <input
                type="text"
                name="shipping.postalCode"
                value={formData.shipping.postalCode}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 text-gray-600 rounded-sm p-1 shadow-sm focus:ring-[#bc6c39] focus:border-[#bc6c39]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold">Country</label>
              <input
                type="text"
                name="shipping.country"
                value={formData.shipping.country}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 text-gray-600 rounded-sm p-1 shadow-sm focus:ring-[#bc6c39] focus:border-[#bc6c39]"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mr-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#bc6c39] text-white px-4 py-2 rounded-md hover:bg-[#8f974a] transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-[#bc6c39] mt-2 mb-4">User Information</h2>

            <p className="text-lg">
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> {user.phone || "Not provided"}
            </p>
            <h2 className="text-xl font-semibold text-[#bc6c39] mt-6 mb-4">Shipping Information</h2>
            <p className="text-lg">
              <strong>Address:</strong> {user.shipping?.address || "Not provided"}
            </p>
            <p className="text-lg">
              <strong>City:</strong> {user.shipping?.city || "Not provided"}
            </p>
            <p className="text-lg">
              <strong>Postal Code:</strong> {user.shipping?.postalCode || "Not provided"}
            </p>
            <p className="text-lg">
              <strong>Country:</strong> {user.shipping?.country || "Not provided"}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 bg-[#bc6c39] text-white px-4 py-2 rounded-md hover:bg-[#8f974a] transition duration-200"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;