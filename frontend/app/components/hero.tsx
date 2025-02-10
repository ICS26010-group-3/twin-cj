import styles from "./hero.module.scss";

interface HeroProps {
    imageURL: string;
    children?: React.ReactNode;
    height?: string; // Fix: Added height as an optional prop
}

const Hero: React.FC<HeroProps> = ({ imageURL, children, height }) => {
    return (
        <section 
            className={styles.hero} 
            style={{ 
                backgroundImage: `url(${imageURL})`, 
                height: height
            }}
        >
            {children}
        </section>
    );
};

export default Hero;
