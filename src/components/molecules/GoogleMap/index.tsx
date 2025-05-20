const GoogleMap = ({ address }: { address: string }) => {
    const encodedAddress = encodeURIComponent(address);
    const mapSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

    return (
        <div style={{ width: "100%", height: "350px" }}>
            <iframe
                title="Google Map"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default GoogleMap;
