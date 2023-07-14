import React from "react";
import { setCourseModalShow } from "../reducers/addCourseModalReducer";
import { setCookMenuCourses, cookMenuCourses } from "../reducers/cookMenuReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";

const AddCourseModal = () => {

  const dispatch = useDispatch();
  const courses = useSelector(cookMenuCourses);
  const [formData, setFormData] = useState({
    courseName: '',
    courseType: 'Antipasto',
    courseDescription: '',
    courseImage: null
  });

  const saveButtonHandler = (event) => {
    event.preventDefault();
    if (checkFields()) {
      let arr = [...courses];
      arr.push(formData);
      dispatch(setCookMenuCourses(arr));
      dispatch(setCourseModalShow(false));
    } else {
      const myToast = new Toast('I campi sono tutti obbligatori');
      myToast.notifyError();
    }
  };

  const cancelButtonHandler = (event) => {
    event.preventDefault();
    dispatch(setCourseModalShow(false));
  };

  const onChangeHandler = (event) => {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onChangeFileHandler = (event) => {
    const data = {...formData, courseImage: event.target.files[0]};
    setFormData(data);
  };

  const checkFields = () => {
    if (formData.courseName !== '' && formData.courseType !== '' && formData.courseDescription !== '' && 
      formData.courseImage !== null) {
      return true;
    }
    return false;
  };

  return (
    <div className="fixed z-10 top-1/5 lg:left-1/3 left-2  bg-slate-50 rounded-lg sm:w-[600px] w-11/12">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="mb-5">
              <label
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                *Nome
              </label>
              <input
                type="text"
                name="courseName"
                onChange={onChangeHandler}
                value={formData.courseName}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                *Tipo
              </label>
              <select 
                name="courseType" 
                onChange={onChangeHandler} value={formData.courseType}
              >
                <option value="Antipasto">Antipasto</option>
                <option value="Primo">Primo</option>
                <option value="Secondo">Secondo</option>
                <option value="Contorno">Contorno</option>
                <option value="Dolce">Dolce</option>
                <option value="Frutta">Frutta</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                *Descrizione
              </label>
              <textarea
                rows="10"
                name="courseDescription"
                onChange={onChangeHandler}
                value={formData.courseDescription}
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>
            <div className="mb-5">
              <label
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                *Immagine
              </label>
              <input
                type="file"
                name="courseImage"
                onChange={onChangeFileHandler}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="flex gap-2 justify-center">
              <div>
                <button
                  onClick={saveButtonHandler}
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                >
                  Salva
                </button>
              </div>
              <div>
                <button
                  onClick={cancelButtonHandler}
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                >
                  Annulla
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
