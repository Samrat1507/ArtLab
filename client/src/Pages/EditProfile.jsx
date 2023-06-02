import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [user, setUser] = useState({
    username: '',
    profilePic: '',
    email: '',
  });
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const [editProfilePicMode, setEditProfilePicMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedProfilePic, setEditedProfilePic] = useState('');
  const navigate = useNavigate();

  // Simulated data fetching
  useEffect(() => {
    // Replace this with your actual data fetching logic
    const fetchUser = async () => {
      try {
        // Simulating API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Replace with your API response data
        const userData = {
          username: 'JohnDoe',
          profilePic: 'profile-image.jpg',
          email: 'johndoe@example.com',
        };

        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleEditUsername = () => {
    setEditUsernameMode(!editUsernameMode);
  };

  const handleEditProfilePic = () => {
    setEditProfilePicMode(!editProfilePicMode);
  };

  const handleSaveChanges = () => {
    // Update the username and profile picture with edited values
    setUser({ ...user, username: editedUsername, profilePic: editedProfilePic });
    setEditUsernameMode(false);
    setEditProfilePicMode(false);
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    // Perform any necessary validation or processing for the uploaded file
    // For now, simply update the edited profile picture state
    setEditedProfilePic(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-10 md:px-20 px-10 py-10">
      <h1 className="header-text text-bold">Profile</h1>
      <div className="flex items-center gap-8">
        <h3 className="sub-header-text text-bold mr-4">Username:</h3>

        {editUsernameMode ? (
          <input
            type="text"
            className="h3-header-text text-bold mr-4 placeholder-white"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
            placeholder="Enter username"
          />
        ) : (
          <p className="h3-header-text text-bold mr-4">{user.username}</p>
        )}

        <button
          className="flex gap-4 w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
          onClick={handleEditUsername}
        >
          {editUsernameMode ? 'Cancel' : 'Edit'}
        </button>

        {editUsernameMode && (
          <button
            className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
            onClick={handleSaveChanges}
          >
            Save
          </button>
        )}
      </div>

      <div className="flex items-center">
  <h3 className="sub-header-text text-bold">Profile Picture:</h3>
  {editProfilePicMode ? (
    <div className="flex items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePicUpload}
        className="hidden"
        id="profilePicInput"
      />
      <label
        htmlFor="profilePicInput"
        className="cursor-pointer w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white ml-4"
      >
        Upload
      </label>
    </div>
  ) : (
    <div style={{ width: '125px', height: '125px', borderRadius: '50%', overflow: 'hidden' }}>
      <img src={editedProfilePic || user.profilePic} alt="Profile" style={{ width: '100%', height: '100%' }} />
    </div>
  )}

  <div className="flex gap-4 ml-4">
    {editProfilePicMode ? (
      <>
        <button
          className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
          onClick={handleSaveChanges}
        >
          Save
        </button>
        <button
          className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
          onClick={handleEditProfilePic}
        >
          Cancel
        </button>
      </>
    ) : (
      <button
        className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
        onClick={handleEditProfilePic}
      >
        Edit
      </button>
    )}
  </div>
</div>








      <div>
        <h3 className="sub-header-text text-bold">Email:</h3>
        <p className="h3-header-text text-bold">{user.email}</p>
      </div>
    </div>
  );
};

export default EditProfile;