import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-white p-4 sm:p-6 rounded shadow text-center">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-600">
            Expert Instructors
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Learn from industry professionals with real-world experience and deep knowledge in their domains.
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded shadow text-center">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-600">
            Flexible Learning
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Study at your own pace with lifetime access to course content and materials.
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded shadow text-center">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-600">
            Career Support
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Get help with resumes, interviews, and job placement after completing your course.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
