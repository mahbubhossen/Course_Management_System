import React from 'react';
import Banner from '../components/Banner';
import CoursesSection from '../components/CoursesSection';
import PopularCourses from '../components/PopularCourses';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import useTitle from '../hooks/useTitle';

const Home = () => {
    useTitle("Home");
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Banner />
            <CoursesSection />
            <PopularCourses />
            <WhyChooseUs />
            <Testimonials />
        </div>
    );
};

export default Home;
