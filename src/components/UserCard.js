import React, { useState, useEffect } from "react";

const UserCard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&results=1&seed=abc")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.results[0]);
      });
  }, []);

  if (!user) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-blue-100 shadow-lg rounded-lg p-6 grid grid-cols-2 gap-4 max-w-xl mx-auto border border-gray-200">
      {/* Column 1: Image */}
      <div className="flex justify-center items-center">
        <img
          src={user.picture.large}
          alt={{  }}
          className="w-46 h-46 rounded-md border-2 border-violet-100 aspect-square shadow-md" loading="lazy"
        />
      </div>

      {/* Column 2: User Details */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {user.name.first} {user.name.last}
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-medium text-gray-700">Gender:</span> {user.gender}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">DOB:</span>{" "}
          {new Date(user.dob.date).toLocaleDateString()}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">phone number:</span>{" "}
          {(user.phone)}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
