import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-12 mx-4 rounded mb-18">
      <div className="max-w-7xl mx-auto px-4 ">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded shadow">
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
              "This platform helped me switch careers into web development.
              Highly recommended!"
            </p>
            <h4 className="text-blue-600 font-semibold text-sm sm:text-base">— Jamil Ahmed</h4>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded shadow">
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
              "The instructors are knowledgeable, and the content is easy to follow. Great experience!"
            </p>
            <h4 className="text-blue-600 font-semibold text-sm sm:text-base">— Nadia Rahman</h4>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded shadow">
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
              "I loved the flexibility! I could learn after my job hours without any pressure."
            </p>
            <h4 className="text-blue-600 font-semibold text-sm sm:text-base">— Tareq Hossain</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
