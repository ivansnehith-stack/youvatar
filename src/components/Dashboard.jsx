import React, { useState } from "react";
import { useParams } from "react-router-dom";
import clsxm from "../lib/clsxm";
import {
  createCourseMoudle,
  createMoudleLecture,
  addLectureResource,
} from "../services/course";
import Button from "./Button";
import Modal from "./Modal";
import TextInput from "./TextInput";

const initialModule = {
  moduleName: "",
  moduleNumber: 1,
  edit: true,
  lectures: [],
};

const Dashboard = () => {
  const [modules, setModules] = useState([initialModule]);
  const [openResourceModal, setOpenResourceModal] = useState(false);
  const [resourceModalData, setResourceModalData] = useState({});
  console.log(openResourceModal);

  const params = useParams();
  const handleAddModule = () => {
    setModules((prevModules) => [
      ...prevModules,
      { ...initialModule, moduleNumber: prevModules.length + 1 },
    ]);
  };

  const handleDeleteModule = (moduleNumber) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this module?"
    );
    if (confirm) {
      setModules((prevModules) =>
        prevModules.filter((module) => module.moduleNumber !== moduleNumber)
      );
    }
  };

  const handleDeleteLecture = (lectureNumber) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this lecture?"
    );
    if (confirm) {
      setModules((prevModules) =>
        prevModules.map((module) => ({
          ...module,
          lectures: module.lectures.filter(
            (lecture) => lecture.lectureNumber !== lectureNumber
          ),
        }))
      );
    }
  };

  const handleAddLecture = (moduleNumber) => {
    setModules((prevModules) =>
      prevModules.map((module) => {
        if (module.moduleNumber === moduleNumber) {
          return {
            ...module,
            lectures: [
              ...module.lectures,
              {
                lectureName: "",
                lectureNumber: module.lectures.length + 1,
                resources: [],
                edit: true,
              },
            ],
          };
        }
        return module;
      })
    );
  };

  const handleOnModuleChange = (e, moduleNumber) => {
    const { name, value } = e.target;
    setModules((prevModules) =>
      prevModules.map((module) => {
        if (module.moduleNumber === moduleNumber) {
          return { ...module, [name]: value };
        }
        return module;
      })
    );
  };

  const handleOnLectureChange = (e, moduleNumber, lectureNumber) => {
    const { name, value } = e.target;
    setModules((prevModules) =>
      prevModules.map((module) => {
        if (module.moduleNumber === moduleNumber) {
          return {
            ...module,
            lectures: module.lectures.map((lecture) => {
              if (lecture.lectureNumber === lectureNumber) {
                return { ...lecture, [name]: value };
              }
              return lecture;
            }),
          };
        }
        return module;
      })
    );
  };

  const handleOnModuleSave = async (moduleNumber) => {
    try {
      const payload = {
        module_number: moduleNumber,
        module_name: modules.find(
          (module) => module.moduleNumber === moduleNumber
        ).moduleName,
        course_id: Number(params.courseId),
      };

      await createCourseMoudle(payload);

      setModules((prevModules) =>
        prevModules.map((module) => {
          if (module.moduleNumber === moduleNumber) {
            return { ...module, edit: false };
          }
          return module;
        })
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleEditModule = (moduleNumber) => {
    setModules((prevModules) =>
      prevModules.map((module) => {
        if (module.moduleNumber === moduleNumber) {
          return { ...module, edit: true };
        }
        return module;
      })
    );
  };

  const handleEditLecture = (moduleNumber, lectureNumber) => {
    setModules((prevModules) =>
      prevModules.map((module) => {
        if (module.moduleNumber === moduleNumber) {
          return {
            ...module,
            lectures: module.lectures.map((lecture) => {
              if (lecture.lectureNumber === lectureNumber) {
                return { ...lecture, edit: true };
              }
              return lecture;
            }),
          };
        }
        return module;
      })
    );
  };

  const handleOnLectureSave = async (moduleNumber, lectureNumber) => {
    try {
      const payload = {
        lecture_number: lectureNumber,
        lecture_name: modules
          .find((module) => module.moduleNumber === moduleNumber)
          .lectures.find((lecture) => lecture.lectureNumber === lectureNumber)
          .lectureName,
        module_id: moduleNumber,
      };

      await createMoudleLecture(payload);

      setModules((prevModules) =>
        prevModules.map((module) => {
          if (module.moduleNumber === moduleNumber) {
            return {
              ...module,
              lectures: module.lectures.map((lecture) => {
                if (lecture.lectureNumber === lectureNumber) {
                  return { ...lecture, edit: false };
                }
                return lecture;
              }),
            };
          }
          return module;
        })
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleOpenAddResourceModal = (moduleNumber, lectureNumber, e) => {
    e.stopPropagation();
    setOpenResourceModal(true);
    setResourceModalData({
      moduleNumber,
      lectureNumber,
    });
  };

  const handleAddResourceModalClose = () => {
    setOpenResourceModal(false);
    setResourceModalData({});
  };

  const handleOnResourceAdd = (e) => {
    let files = e.target.files;

    setResourceModalData((prevResourceModalData) => ({
      ...prevResourceModalData,
      resourceFile: files[0],
      resourceURL: URL.createObjectURL(files[0]),
    }));

    setModules((prevModules) =>
      prevModules.map((module) => {
        if (module.moduleNumber === resourceModalData.moduleNumber) {
          return {
            ...module,
            lectures: module.lectures.map((lecture) => {
              if (lecture.lectureNumber === resourceModalData.lectureNumber) {
                return {
                  ...lecture,
                  resources: [
                    ...lecture.resources,
                    {
                      resourceName: files[0].name,
                      resourceUrl: files[0].path,
                    },
                  ],
                };
              }
              return lecture;
            }),
          };
        }
        return module;
      })
    );
  };

  const handleUploadResource = async () => {
    try {
      const payload = {
        resource_file: "https://picsum.photos/200/300",
        lecture_id: resourceModalData.lectureNumber,
      };

      await addLectureResource(payload);

      alert("Resource added successfully");

      handleAddResourceModalClose();
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
          Curriculum
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
                  style={{ "--percentage": "50", "--fill": "#3949AB " }}
                />
                <div className="text-black absolute flex flex-col items-center">
                  <p>Percentage</p>
                  <div className="text-2xl font-bold">50%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h5 className="text-secondary text-base font-normal">
          Start putting together your course by creating sections, lectures and
          practice
        </h5>

        {modules.map((module, index) => (
          <div key={module.moduleNumber} className="mb-[22px]">
            <div className="border border-dark-grey py-5 px-4 mt-5 mb-4">
              <div className="flex items-center mb-4 ">
                <h1>
                  Module {index + 1}: {module.moduleName}
                </h1>

                {!module.edit && (
                  <>
                    <img
                      src="/assets/edit.svg"
                      alt="edit"
                      className="ml-2 cursor-pointer"
                      role={"button"}
                      onClick={handleEditModule.bind(this, module.moduleNumber)}
                    />

                    <img
                      src="/assets/delete.svg"
                      alt="delete"
                      className="ml-2 cursor-pointer"
                      role="button"
                      onClick={handleDeleteModule.bind(
                        this,
                        module.moduleNumber
                      )}
                    />
                  </>
                )}
              </div>
              {module.edit && (
                <div className="flex items-center">
                  <TextInput
                    placeholder="Module title"
                    value={module.moduleName}
                    name="moduleName"
                    onChange={(e) =>
                      handleOnModuleChange(e, module.moduleNumber)
                    }
                  />
                  <Button
                    label="Save"
                    variant="link"
                    onClick={handleOnModuleSave.bind(this, module.moduleNumber)}
                  />
                </div>
              )}

              {module.lectures.map((lecture, index) => (
                <div key={lecture.lectureNumber} className="mb-[22px]">
                  <div className="border border-dark-grey py-5 px-4 mt-5 mb-4">
                    <div className="flex items-center  justify-between">
                      <div className="flex items-center">
                        <h1>
                          Lecture {index + 1}: {lecture.lectureName}
                        </h1>
                        {!lecture.edit && (
                          <>
                            <img
                              src="/assets/edit.svg"
                              alt="edit"
                              className="ml-2 cursor-pointer"
                              role={"button"}
                              onClick={handleEditLecture.bind(
                                this,
                                module.moduleNumber,
                                lecture.lectureNumber
                              )}
                            />

                            <img
                              src="/assets/delete.svg"
                              alt="delete"
                              className="ml-2 cursor-pointer"
                              role={"button"}
                              onClick={handleDeleteLecture.bind(
                                this,
                                lecture.lectureNumber
                              )}
                            />
                          </>
                        )}
                      </div>

                      <div className="flex items-center">
                        <Button
                          variant="link"
                          label="Add assignments"
                          className="mr-4"
                        />
                        <Button
                          label="Add resource"
                          onClick={handleOpenAddResourceModal.bind(
                            this,
                            module.moduleNumber,
                            lecture.lectureNumber
                          )}
                        />
                      </div>
                    </div>
                    {lecture.edit && (
                      <div className="flex items-center mt-4">
                        <TextInput
                          placeholder="Lecture title"
                          value={lecture.lectureName}
                          name="lectureName"
                          onChange={(e) =>
                            handleOnLectureChange(
                              e,
                              module.moduleNumber,
                              lecture.lectureNumber
                            )
                          }
                        />
                        <Button
                          label="Save"
                          variant="link"
                          onClick={handleOnLectureSave.bind(
                            this,
                            module.moduleNumber,
                            lecture.lectureNumber
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button
                label="Add next lecture"
                className="mt-5"
                onClick={handleAddLecture.bind(this, module.moduleNumber)}
              />
            </div>
          </div>
        ))}
        <Button label="Add New Module" onClick={handleAddModule} />

        <div className="flex items-center justify-between mt-[50px]">
          <Button label="Back" variant="link" className="pl-0" />
          <Button label="Proceed" className="w-[274px]" />
        </div>
      </div>
      {openResourceModal && (
        <Modal onClose={handleAddResourceModalClose} title="Add resource">
          <div className="mb-9">
            <p className="mb-4">Upload Landing photo</p>
            {resourceModalData.resourceURL ? (
              `Added file ${resourceModalData.resourceFile.name}`
            ) : (
              <label
                htmlFor="banner"
                className={clsxm(
                  "rounded border border-dashed border-black p-6",
                  "flex cursor-pointer items-center justify-center"
                )}
              >
                <input
                  type={"file"}
                  id="banner"
                  className="hidden"
                  onChange={handleOnResourceAdd}
                />
                <div className="flex  flex-col items-center justify-center">
                  <div className="py-2 px-1">
                    <img src={"/assets/upload.svg"} alt="upload" />
                  </div>

                  <div className="cursor-pointer text-sm font-medium">
                    <span className="font-bold ">Browse</span> to upload
                  </div>
                </div>
              </label>
            )}
            <div className="flex justify-end mt-8">
              <Button label="Upload" onClick={handleUploadResource} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
