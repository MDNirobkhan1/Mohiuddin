// src/components/Courses.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../Cart/CartContext";
// Import the useCart hook

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://itder.com/api/get-course-list"
        );
        console.log("API Response:", response.data);
        setCourses(response.data.courseData);
      } catch (error) {
        setError("Error fetching courses");
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  if (!Array.isArray(courses)) {
    return <div>No courses available.</div>;
  }

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map(course =>
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={course.photo || "https://via.placeholder.com/300"}
                alt={course.title}
                className="w-full object-cover"
              />
              <div className="absolute top-0 left-0 p-2">
                <h3 className="text-white text-xl font-bold">
                  {course.course_name}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-gray-800 text-lg font-semibold mb-2">
                {course.course_name}
              </h2>
              <div className="flex items-center justify-between mb-4">
                <span className="flex text-blue-500 text-md">★★★★☆</span>
                <span className="ml-2 text-gray-600 text-md font-bold">
                  {course.trainer_data.name}
                </span>
              </div>
              <p className="text-gray-600 text-md mb-4">
                {course.details}
                <span className="text-blue-500"> Show Details </span>
              </p>
              <hr />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="line-through text-gray-400 text-sm">
                    Tk {course.regular_price}
                  </span>
                  <span className="text-green-600 text-md font-bold ml-2">
                    -{course.discount_price}%
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => addToCart(course)} // Add course to cart
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full font-bold text-md"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
