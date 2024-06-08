import React from 'react';
import DynamicText from './DynamicText.jsx';

const About = () => {
    const words = ['coder', 'Web Developer'];

    return (
        <section className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-16 px-4">
            <div className="container mx-auto flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-4">About the Creator</h2>
                <div className="w-24 h-1 bg-white rounded mb-6"></div>
                <div className="flex flex-col md:flex-row items-center md:items-start md:gap-12">
                    <div className="mb-8 md:mb-0 md:w-1/3 flex justify-center">
                        <img 
                            src="/image/myimg.jpg" 
                            alt="Creator" 
                            className="rounded-full shadow-lg w-48 h-48 object-cover"
                        />
                    </div>
                    <div className="md:w-2/3 text-center md:text-left">
                        <p className="mb-4 text-lg leading-relaxed">
                            Hello! I'm <span className="font-semibold">Samarth </span>, the creator of this blog. I'm a&nbsp;
                            <DynamicText words={words} interval={2000} />
                            
                        </p>
                        <p className="mb-4 text-lg leading-relaxed">
                            With a passion for web development and a love for sharing knowledge, I started this blog to provide insightful articles and tutorials to help others in their coding journey.
                        </p>
                        <p className="mb-4 text-lg leading-relaxed">
                            I  specialize in Full Stack Development. My goal is to create content that is both educational and engaging, making learning new technologies fun and accessible.
                        </p>
                        <p className="mb-4 text-lg leading-relaxed">
                            When I'm not coding, you can find me exploring the great outdoors, experimenting with new recipes in the kitchen, or indulging in my love for photography.
                        </p>
                       
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
