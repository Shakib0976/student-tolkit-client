import React from "react";

function AvatarCircles({ numPeople, avatarUrls }) {
    return (
        <div className="flex items-center -space-x-2">
            {avatarUrls.slice(0, 5).map((avatar, index) => (
                <a
                    key={index}
                    href={avatar.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-10 h-10 rounded-full overflow-hidden border-2 border-white"
                >
                    <img
                        src={avatar.imageUrl}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />
                </a>
            ))}

            {numPeople > avatarUrls.length && (
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-sm font-semibold text-gray-600 border-2 border-white">
                    +{numPeople - avatarUrls.length}
                </span>
            )}
        </div>
    );
}

export default function AvatarCirclesDemo() {
    const avatars = [
        {
            imageUrl: "https://avatars.githubusercontent.com/u/16860528",
            profileUrl: "https://github.com/dillionverma",
        },
        {
            imageUrl: "https://avatars.githubusercontent.com/u/20110627",
            profileUrl: "https://github.com/tomonarifeehan",
        },
        {
            imageUrl: "https://avatars.githubusercontent.com/u/106103625",
            profileUrl: "https://github.com/BankkRoll",
        },
        {
            imageUrl: "https://avatars.githubusercontent.com/u/59228569",
            profileUrl: "https://github.com/safethecode",
        }
    ];

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Our Contributors</h2>
            <AvatarCircles numPeople={99} avatarUrls={avatars} />
        </div>
    );
}
