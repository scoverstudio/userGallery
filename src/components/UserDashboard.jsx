import React, {useEffect, useState} from "react";
import './UserDashboard.scss';
import Gallery from "react-photo-gallery";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';

function UserDashboard({user, onBack}) {
    const [photoUrl, setPhotoUrl] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [key, setKey] = useState(false);
    const addPhoto = () => {
        if (!photoUrl) return;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
            u.id === user.id ? {...u, photos: [...u.photos, photoUrl]} : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setPhotoUrl("");
        alert("Photo added!");
    };

    const updatedUser = JSON.parse(localStorage.getItem("users")).find(
        (u) => u.id === user.id
    );

    useEffect(() => { setTimeout(() => setKey(key + 1)); }, [isOpen]);

    const photos = updatedUser.photos || [];

    const photoSet = photos.map((url) => ({
        src: url,
        width: 4,
        height: 3,
    }));

    const openLightbox = (index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    return (
        <div className='dashboard'>
            <button onClick={onBack}>Back</button>
            <h2>
                {user.name}'s Dashboard
                {user.profilePicture && (
                    <img src={user.profilePicture} alt="Profile" width="100" style={{borderRadius: "50%"}}/>
                )}
            </h2>
            <h3 className='gallery-label'>Gallery</h3>
            <div className='gallery-content'>
                {photos.length === 0 ? (
                    <p>No photos yet.</p>
                ) : (
                    <Gallery
                        photos={photoSet}
                        onClick={(event, { index }) => openLightbox(index)}
                    />
                )}
            </div>
            {isOpen && (
                <Lightbox
                    key={key}
                    mainSrc={photos[photoIndex]}
                    nextSrc={photos[(photoIndex + 1) % photos.length]}
                    prevSrc={photos[(photoIndex + photos.length - 1) % photos.length]}
                    onCloseRequest={closeLightbox}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + photos.length - 1) % photos.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % photos.length)
                    }
                />
            )}
            <div>
                <h3 className='add-photo'>Add Photo</h3>
                <input
                    type="text"
                    placeholder="Photo URL"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <button onClick={addPhoto}>Add</button>
            </div>
        </div>
    );
}

export default UserDashboard;
