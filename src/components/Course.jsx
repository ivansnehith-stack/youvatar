import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { category, languages, levelOptions } from "../constants";
import clsxm from "../lib/clsxm";
import { createCourse } from "../services/course";
import Button from "./Button";
import Dropdown from "./Dropdown";
import TextInput from "./TextInput";

const Course = () => {
  const [courseName, setCourseName] = useState("");
  const [courseSubtitle, setCourseSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedLevel, setSelectedLevel] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    switch (name) {
      case "courseName":
        setCourseName(value);
        break;
      case "courseSubtitle":
        setCourseSubtitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "language":
        setLanguage(value);
        break;
      case "level":
        setLevel(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        school_id: "27",
        course_title: courseName,
        course_subtitle: courseSubtitle,
        course_description: description,
        course_language: language,
        course_difficulty_level: level,
        course_category: "1",
        course_intro_file: "https://picsum.photos/200/239",
        course_thumbnail: "https://picsum.photos/200/300",
      };

      const response = await createCourse(payload);

      navigate(`/courses/${response.data.course_id}`);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex  xl:mr-[215px] pt-4 pb-[50px]">
      <div className="hidden md:block">
        <img src="/assets/mobile.png" alt="mobile" />
        <Button
          startIcon={<img src={"/assets/preview.svg"} alt="preview" />}
          label="preview on desktop"
          variant="outline"
          className="mt-10 text-sm font-normal"
        />
      </div>
      <div className="md:pl-[84px] w-full">
        <h1
          className={clsxm(
            "text-secondary font-bold md:text-[32px] md:leading-[42px] mb-4",
            "text-2xl font-bold"
          )}
        >
          Course Landing Page
        </h1>
        <div className="mb-5">
          <div className="flex w-full items-center justify-between">
            <div className="hidden md:block">
              <img src="/assets/landing-image.png" alt="course" />
            </div>
            <div className="hidden lg:block relative">
              <div className="multi-graph">
                <div
                  className="graph "
                  data-name="completed"
                  style={{ "--percentage": "0", "--fill": "#0A6ED1 " }}
                />
                <div className="text-black absolute flex flex-col items-center">
                  <p>Percentage</p>
                  <div className="text-2xl font-bold">0%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TextInput
          placeholder="course title"
          label="Course Title"
          wrapperClassName="mb-[22px]"
          name={"courseName"}
          onChange={handleChange}
          value={courseName}
        />
        <TextInput
          placeholder="Course subtitle"
          label="Course Subtitle"
          wrapperClassName="mb-[22px]"
          name={"courseSubtitle"}
          onChange={handleChange}
          value={courseSubtitle}
        />
        <TextInput
          placeholder="Message : Congratulations in completing coursename."
          label="Course Description"
          variant="textarea"
          wrapperClassName="mb-6"
          name={"description"}
          onChange={handleChange}
          value={description}
        />
        <div className="lg:flex items-center justify-between mb-[22px] gap-7">
          <Dropdown
            label="Language"
            options={languages}
            selectedOption={selectedLanguage}
            onClick={(language) => setSelectedLanguage(language)}
            placeholder="Select Language"
          />
          <Dropdown
            label="level"
            options={levelOptions}
            selectedOption={selectedLevel}
            onClick={(level) => setSelectedLevel(level)}
            placeholder="Select Level"
          />
          <Dropdown
            label="Category"
            options={category}
            selectedOption={selectedCategory}
            onClick={(category) => setSelectedCategory(category)}
            placeholder="Select Category"
          />
        </div>

        <div className="mb-[22px]">
          <p>Upload Video or ppt</p>
          <label
            htmlFor="banner"
            className={clsxm(
              "rounded border border-dashed border-black p-6",
              "flex cursor-pointer items-center justify-center"
            )}
          >
            <div className="flex  flex-col items-center justify-center">
              <div className="py-2 px-1">
                <img src={"/assets/upload.svg"} alt="upload" />
              </div>

              <div className="cursor-pointer text-sm font-medium">
                <span className="font-bold ">Browse</span> to upload
              </div>
            </div>
          </label>
        </div>
        <div className="mb-9">
          <p>Upload Landing photo</p>
          <label
            htmlFor="banner"
            className={clsxm(
              "rounded border border-dashed border-black p-6",
              "flex cursor-pointer items-center justify-center"
            )}
          >
            <div className="flex  flex-col items-center justify-center">
              <div className="py-2 px-1">
                <img src={"/assets/upload.svg"} alt="upload" />
              </div>

              <div className="cursor-pointer text-sm font-medium">
                <span className="font-bold ">Browse</span> to upload
              </div>
            </div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <Button label="Back" variant="link" className="pl-0" />
          <Button
            label="Proceed"
            className="w-[274px]"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Course;
