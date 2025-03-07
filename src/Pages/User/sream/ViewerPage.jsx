// pages/ViewerPage.js
import React from 'react';
import VideoRoom from '../../../Components/User/stream/VideoRoom';

const ViewerPage = () => {
  const roomId = '123'; // Get this from URL or props

  return (
    <div className="min-h-screen bg-gray-900 ml-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-white mb-8">Live Stream</h1>
        <VideoRoom 
          roomId={roomId}
          isPublisher={false} // This makes it a viewer view
        />
      </div>
    </div>
  );
};

export default ViewerPage;