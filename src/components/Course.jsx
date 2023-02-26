/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { category, languages, levelOptions } from "../constants";
import clsxm from "../lib/clsxm";
import { createCourse } from "../services/course";
import Button from "./Button";
import Dropdown from "./Dropdown";
import TextInput from "./TextInput";

export const useFirstMount = () => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  return isFirstMount.current;
};

const Course = () => {
  const [courseName, setCourseName] = useState("");
  const [courseSubtitle, setCourseSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedLevel, setSelectedLevel] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const isFirstMount = useFirstMount();

  const [error, setError] = useState({
    courseName: false,
    courseSubtitle: false,
    description: false,
    language: false,
    level: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedLevel && !isFirstMount) {
      setError((prev) => ({ ...prev, level: true }));
    } else {
      setError((prev) => ({ ...prev, level: false }));
    }

    if (!selectedLanguage && !isFirstMount) {
      setError((prev) => ({ ...prev, language: true }));
    } else {
      setError((prev) => ({ ...prev, language: false }));
    }
  }, [selectedLanguage, selectedLevel]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "courseName":
        if (value.trim() === "") {
          setError((prev) => ({ ...prev, courseName: true }));
        } else {
          setError((prev) => ({ ...prev, courseName: false }));
        }
        setCourseName(value);
        break;
      case "courseSubtitle":
        if (value.trim() === "") {
          setError((prev) => ({ ...prev, courseSubtitle: true }));
        } else {
          setError((prev) => ({ ...prev, courseSubtitle: false }));
        }
        setCourseSubtitle(value);
        break;
      case "description":
        if (value.trim() === "") {
          setError((prev) => ({ ...prev, description: true }));
        } else {
          setError((prev) => ({ ...prev, description: false }));
        }
        setDescription(value);
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
        course_language: selectedLanguage,
        course_difficulty_level: selectedLevel,
        course_category: "1",
        course_intro_file: "https://picsum.photos/200/239",
        course_thumbnail: "https://picsum.photos/200/300",
      };

      if (
        courseName.trim() === "" ||
        courseSubtitle.trim() === "" ||
        description.trim() === ""
      ) {
        setError((prev) => ({
          ...prev,
          courseName: true,
          courseSubtitle: true,
          description: true,
          language: true,
          level: true,
        }));
        return;
      }

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
                  style={{ "--percentage": "0", "--fill": "#3949AB " }}
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
          wrapperClassName={clsxm("mb-[22px]", { "mb-0": error.courseName })}
          name={"courseName"}
          onChange={handleChange}
          value={courseName}
        />
        {error.courseName && (
          <p className="text-red-500 text-sm my-2">Course name is required</p>
        )}
        <TextInput
          placeholder="Course subtitle"
          label="Course Subtitle"
          wrapperClassName={clsxm("mb-[22px]", {
            "mb-0": error.courseSubtitle,
          })}
          name={"courseSubtitle"}
          onChange={handleChange}
          value={courseSubtitle}
        />
        {error.courseSubtitle && (
          <p className="text-red-500 text-sm my-2">
            Course subtitle is required
          </p>
        )}
        <TextInput
          placeholder="Message : Congratulations in completing coursename."
          label="Course Description"
          variant="textarea"
          wrapperClassName={clsxm("mb-[22px]", { "mb-0": error.description })}
          name={"description"}
          onChange={handleChange}
          value={description}
        />
        {error.description && (
          <p className="text-red-500 text-sm my-2">
            Course description is required
          </p>
        )}
        <div className="lg:flex items-center justify-between  gap-7">
          <div className="w-full ">
            <Dropdown
              label="Language"
              options={languages}
              selectedOption={selectedLanguage}
              onClick={(language) => setSelectedLanguage(language)}
              placeholder="Select Language"
            />
            {error.language && (
              <p className="text-red-500 text-sm my-2">
                Course language is required
              </p>
            )}
          </div>
          <div className="w-full">
            <Dropdown
              label="level"
              options={levelOptions}
              selectedOption={selectedLevel}
              onClick={(level) => setSelectedLevel(level)}
              placeholder="Select Level"
            />
            {error.level && (
              <p className="text-red-500 text-sm my-2 inline-flex">
                Course level is required
              </p>
            )}
          </div>

          <Dropdown
            label="Category"
            options={category}
            selectedOption={selectedCategory}
            onClick={(category) => setSelectedCategory(category)}
            placeholder={category[0].label}
          />
        </div>

        <div className="my-[22px]">
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
            disabled={Object.keys(error).some((key) => error[key])}
          />
        </div>
      </div>
    </div>
  );
};

export default Course;
