import React from 'react'

function FollowerList({ followerList = [], createChat, onClose }) {

    console.log(followerList)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-black bg-white aspect-square rounded-3xl px-2 shadow-md hover:bg-gray-300"
        onClick={onClose}
      >
        ✕
      </button>


      <div className="w-min-[90%] p-10 rounded-xl flex justify-center items-center flex-col gap-5
                      bg-white bg-opacity-10 backdrop-blur-lg shadow-lg border border-white/20"
                      onClick={(e) => e.stopPropagation()}
                      >
        
        {followerList.length > 0 ? (
          followerList.map(follower => (
            <div className="flex flex-col gap-7 w-full bg-transparent" key={follower._id} >
              <div className="flex items-center justify-start gap-5 text-white ">
                <img src={follower.profileImage} alt="" className="w-16 rounded-full border border-white/30" />
                <p className=" font-poppins ">{follower.fullName || follower.following.fullName }</p>
                <p className="bg-[#4A90E2] h-fit rounded-lg p-2 w-fit text-white font-medium cursor-pointer ml-auto" onClick={() => createChat(follower.following?._id || follower._id)}>
                    Send Message
                    </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-full h-full  items-center bg-transparent p-10   ">
            <p className="   rounded-lg p-2 w-fit text-white font-medium  " onClick={createChat}>
             { !followerList.fullName? 'No user Found': 'No Followers'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FollowerList;