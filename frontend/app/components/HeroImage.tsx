const HeroImage = (props: any) => {
    return (
        <section style={{ backgroundImage: `url('/assets/${props.imageURL}')`, height: "335px", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: "transparent" }}>
            
        </section>
    );
};

export default HeroImage;
