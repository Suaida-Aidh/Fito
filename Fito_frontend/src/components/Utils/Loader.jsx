import BounceLoader from 'react-spinners/BounceLoader';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // Arrange items vertically
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: '#bde800', // Black background color
        color: '#060606', // White text color
      }}
    >
      <BounceLoader color="rgba(255, 255, 255, 0.6)" size={130} /> {/* Semi-transparent white loader */}
      <h3
         style={{
            marginTop: '20px', // Space between loader and title
            fontSize: '36px',
            fontWeight: '900', // Extra bold font weight
            letterSpacing: '2px',
            fontFamily: '"Archivo Black", sans-serif', // Apply font
          }}
      >
        FITO
      </h3>
    </div>
  );
};

export default Loader;
