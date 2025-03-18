import React, { useState } from "react";
import profilePic from "../assets/profile_pic.png";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: profilePic,
    email: "edwardv@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-20",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-6">
        <img
          className="w-28 h-28 rounded-full border-4 border-primary"
          src={userData.image}
          alt="Profile"
        />
        {isEdit ? (
          <input
            className="text-2xl font-semibold border-b-2 focus:outline-none focus:border-primary"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
        )}
      </div>

      <hr className="border-gray-300" />

      <div className="space-y-4">
        <h3 className="text-gray-500 font-semibold uppercase">
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-600">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="border-b focus:outline-none focus:border-primary"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="space-y-1">
              <input
                className="border-b focus:outline-none focus:border-primary w-full"
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="border-b focus:outline-none focus:border-primary w-full"
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p>
              {userData.address.line1}, {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <hr className="border-gray-300" />

      <div className="space-y-4">
        <h3 className="text-gray-500 font-semibold uppercase">
          Basic Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="border-b focus:outline-none focus:border-primary"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="border-b focus:outline-none focus:border-primary"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-all"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Save Information" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
