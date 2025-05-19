import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import './All.css';

const categoryList = [
  { name: 'veg', image: 'images/veg.png' },
  { name: 'nonveg', image: 'images/nonveg.jpg' },
  { name: 'cafe', image: 'images/cafe.jpg' },
  { name: 'toys', image: 'images/toys.jpg' },
  { name: 'electronics', image: 'images/electronics.jpg' },
  { name: 'baby', image: 'images/babyproducts.jpg' },
  { name: 'mobiles', image: 'images/mobiles.jpg' }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { y: -100, opacity: 0, filter: 'blur(6px)' },
  show: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

function All() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/${category}`);
  };

  return (
    <motion.div
      className="all-container"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <h2 className="animated-heading">✨ Shop by Category ✨</h2>
      <motion.div className="category-grid">
        {categoryList.map((cat, idx) => (
          <Tilt
            key={idx}
            glareEnable={true}
            glareMaxOpacity={0.4}
            glareColor="#ffffff"
            glarePosition="all"
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
          >
            <motion.div
              className="category-card"
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(cat.name)}
            >
              <img src={cat.image} alt={cat.name} className="category-image" />
              <h3 className="category-name">{cat.name.toUpperCase()}</h3>
            </motion.div>
          </Tilt>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default All;
