import React from "react";

import "./ProfilePhoto.css";
import profilePhoto from "../../assets/profilephoto.jpg";

interface ProfilePhotoProps {
    name: string;
}

//In an ideal world, the src would be fetched from a CMS. In this case, it's just a placeholder image fo the test.

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ name }) => {
    return (
        <div className="profile-photo">
            <img src={profilePhoto} alt={name} className="profile-photo__image" />
        </div>
    );
};

export default ProfilePhoto;