import React, { useEffect } from 'react';

const BookingWidget = ({
  latitude,
  longitude,
  landmarkName,
  address
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//cf.bstatic.com/static/affiliate_base/js/flexiproduct.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    return () => {
      document.getElementsByTagName('head')[0].removeChild(script);
    };
  }, []);

  return (
    <ins
      className="bookingaff"
      data-aid="2385798"
      data-target_aid="2385798"
      data-prod="map"
      data-width="400"
      data-height="800"
      data-lang="ualng"
      data-dest_id="0"
      data-dest_type="landmark"
      data-latitude={latitude}
      data-longitude={longitude}
      data-landmark_name={landmarkName}
      data-mwhsb="0"
      data-address={address}
    >
      {/* Anything inside will go away once the widget is loaded. */}
      <a href="//www.booking.com?aid=2385798">Booking.com</a>
    </ins>
  );
};

export default BookingWidget;
