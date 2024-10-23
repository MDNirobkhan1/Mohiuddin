import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useCart } from "../Cart/CartContext";

const Checkout = () => {
  const { checkoutDataHandler, cartItems } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    course_id: "",
    admission_date: "",
    father_name: "",
    father_phone_no: "",
    school_collage_name: "",
    job_title: "",
    email: "",
    gender: "",
    present_address: "",
    permanent_address: "",
    nid_no: "",
    phone_no: "",
    local_guardian_name: "",
    local_guardian_phone_no: "",
    date_of_birth: "",
    blood_group: "",
    course_fee: "",
    course_qty: "",
    total_course_fee: "",
    discount_course_fee: "",
    sub_total_course_fee: ""
  });

  const handleChange = e => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    checkoutDataHandler(formData);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch("https://itder.com/api/course-purchase", {
        method: "POST",
        body: data
      });

      console.log("🚀 ~ handleSubmit ~ response:", response);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success:", responseData);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block font-semibold text-base mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="admission_date"
                className="block font-semibold text-base mb-2"
              >
                Admission Date:
              </label>
              <input
                type="date"
                id="admission_date"
                name="admission_date"
                value={formData.admission_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="course_id"
                className="block font-semibold text-base mb-2"
              >
                Form No:
              </label>
              <input
                type="number"
                id="course_id"
                name="course_id"
                value={formData.course_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="father_name"
                className="block font-semibold text-base mb-2"
              >
                Father/Mother Name:
              </label>
              <input
                type="text"
                id="father_name"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="father_phone_no"
                className="block font-semibold text-base mb-2"
              >
                Number:
              </label>
              <input
                type="number"
                id="father_phone_no"
                name="father_phone_no"
                value={formData.father_phone_no}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school_collage_name"
                className="block font-semibold text-base mb-2"
              >
                School/College:
              </label>
              <input
                type="text"
                id="school_collage_name"
                name="school_collage_name"
                value={formData.school_collage_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="job_title"
                className="block font-semibold text-base mb-2"
              >
                Job Information:
              </label>
              <input
                type="text"
                id="job_title"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="present_address"
                className="block font-semibold text-base mb-2"
              >
                Present Address:
              </label>
              <textarea
                id="present_address"
                name="present_address"
                value={formData.present_address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="permanent_address"
                className="block font-semibold text-base mb-2"
              >
                Permanent Address:
              </label>
              <textarea
                id="permanent_address"
                name="permanent_address"
                value={formData.permanent_address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid_no"
                className="block font-semibold text-base mb-2"
              >
                NID Number:
              </label>
              <input
                type="number"
                id="nid_no"
                name="nid_no"
                value={formData.nid_no}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="phone_no"
                className="block font-semibold text-base mb-2"
              >
                Phone Number:
              </label>
              <input
                type="number"
                id="phone_no"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="local_guardian_name"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian Name:
              </label>
              <input
                type="text"
                id="local_guardian_name"
                name="local_guardian_name"
                value={formData.local_guardian_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="local_guardian_phone_no"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian Phone No:
              </label>
              <input
                type="number"
                id="local_guardian_phone_no"
                name="local_guardian_phone_no"
                value={formData.local_guardian_phone_no}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="date_of_birth"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="blood_group"
                className="block font-semibold text-base mb-2"
              >
                Blood Group:
              </label>
              <select
                id="blood_group"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="course_fee"
                className="block font-semibold text-base mb-2"
              >
                Course Fee:
              </label>
              <input
                type="number"
                id="course_fee"
                name="course_fee"
                value={formData.course_fee}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="course_qty"
                className="block font-semibold text-base mb-2"
              >
                Course Quantity:
              </label>
              <input
                type="number"
                id="course_qty"
                name="course_qty"
                value={formData.course_qty}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="total_course_fee"
                className="block font-semibold text-base mb-2"
              >
                Total Course Fee:
              </label>
              <input
                type="number"
                id="total_course_fee"
                name="total_course_fee"
                value={formData.total_course_fee}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="discount_course_fee"
                className="block font-semibold text-base mb-2"
              >
                Discount Course Fee:
              </label>
              <input
                type="number"
                id="discount_course_fee"
                name="discount_course_fee"
                value={formData.discount_course_fee}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="sub_total_course_fee"
                className="block font-semibold text-base mb-2"
              >
                Sub Total Course Fee:
              </label>
              <input
                type="number"
                id="sub_total_course_fee"
                name="sub_total_course_fee"
                value={formData.sub_total_course_fee}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block font-semibold text-base mb-2"
              >
                Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept=".jpg,.jpeg,.png,.gif,.svg"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div className="m-mt_16px">
          <div className="pt-p_16px">
            <div className="lg:flex items-start gap-3">
              <div className="w-full lg:w-[58%] bg-white border-2">
                <table className=" overflow-x-auto  w-full">
                  <thead>
                    <tr className="border-b-4 border-gray-300">
                      <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                        Course
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Price
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Quantity
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Sub Total
                      </th>
                    </tr>
                  </thead>

                  <tbody className="overflow-x-auto ">
                    <tr className="border-b border-gray-300 overflow-x-auto">
                      <td>
                        <div className="flex items-center justify-center ">
                          <div className="w-[20%] text-center flex items-center justify-center ">
                            <RiDeleteBin5Line className="text-xl hover:text-footer_color cursor-pointer" />
                          </div>
                          <div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
                            <div className="mask">
                              <img
                                className="h-[40px] w-[70px]"
                                src=""
                                alt="Course"
                              />
                            </div>
                            <p className="text-[14.4px] px-[7px] text-center flex ">
                              Course name{" "}
                              <span className="hidden lg:flex ">
                                - unit name
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                          discount price
                        </p>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          <div className="border">
                            <button className="px-4 w-[30px] font-bold font_standard my-1.5">
                              -
                            </button>
                          </div>
                          <div className="border-y">
                            <input
                              type="number"
                              className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                            />
                          </div>
                          <div className="border">
                            <button className="px-4 w-[30px] font-bold font_standard my-1.5">
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                          discount price * quantity
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="lg:w-[41%] bg-white border-2 ">
                <div className="px-[30px]">
                  <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                    Cart Summary
                  </h2>
                  <div className="py-3 flex justify-between border-b border-gray-300">
                    <p className="text-black font-bold">Total Price</p>
                    <p className="text-black font-bold" />
                  </div>

                  <button
                    type="submit"
                    className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
