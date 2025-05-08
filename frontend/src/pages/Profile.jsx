import React from "react";

function Profile({ user }) {
  if (!user) {
    return <p className="text-center text-lg mt-10">You need to log in to view this page.</p>;
  }

  return (
    <div className="container-custom py-16">
      <h1 className="text-3xl font-semibold text-[#bc6c39] mb-8">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg">
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> {user.phone || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export default Profile;