// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { useHistory } from "react-router-dom";
// import TextField from "../common/form/textField";
// import SelectField from "../common/form/selectField";
// import RadioField from "../common/form/radioField";
// import MultySelectField from "../common/form/multiSelectField";
// import { useAuth } from "../../hooks/useAuth";
// import { useSelector } from "react-redux";
// import {
//     getQualities,
//     getQualitiesLoadingStatus
// } from "../../store/qualities";
// import {
//     getProfessions,
//     getProfessionsLoadingStatus
// } from "../../store/professions";
// import { getCurrentUserData } from "../../store/users";

// const EditUserPage = () => {
//     const history = useHistory();
//     const [isLoading, setIsLoading] = useState(false);
//     const [data, setData] = useState({
//         name: "",
//         email: "",
//         profession: "",
//         sex: "",
//         qualities: []
//     });
//     const currentUser = useSelector(getCurrentUserData());
//     // const { currentUser, updateUserData } = useAuth();
//     const { updateUserData } = useAuth();
//     const qualities = useSelector(getQualities());
//     const professions = useSelector(getProfessions());
//     const professionsLoading = useSelector(getProfessionsLoadingStatus());
//     const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
//     const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }));
//     const professionsList = professions.map(p => ({ label: p.name, value: p._id }));
//     useEffect(() => {
//         setIsLoading(true);
//         if (!professionsLoading && !qualitiesLoading && currentUser) {
//             setData({
//                 ...currentUser,
//                 qualities: transformData(currentUser.qualities)
//             });
//         }
//         if (currentUser._id) setIsLoading(false);
//     }, [currentUser, qualitiesLoading, professionsLoading]);
//     const transformData = (elements) => {
//         const qualitiesArray = [];
//         for (const elem of elements) {
//             for (const quality in qualities) {
//                 if (elem === qualities[quality]._id) {
//                     qualitiesArray.push({
//                         value: qualities[quality]._id,
//                         label: qualities[quality].name,
//                         color: qualities[quality].color
//                     });
//                 }
//             }
//         }
//         return qualitiesArray;
//     };
//     const handleChange = (target) => {
//         setData((prevState) => ({
//             ...prevState,
//             [target.name]: target.value
//         }));
//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         updateUserData({
//             ...data,
//             qualities: data.qualities.map(qual => qual.value)
//         });
//     };
//     const handleClick = () => {
//         history.goBack();
//     };
//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-4">
//                     <button className="btn btn-primary" onClick={handleClick}>
//                         <i className="bi bi-caret-left"></i> Назад
//                     </button>
//                 </div>
//                 <div className="col-8">
//                     {!isLoading && (
//                         <form onSubmit={handleSubmit}>
//                             <TextField
//                                 label="Имя"
//                                 value={ data.name }
//                                 name="name"
//                                 onChange={ handleChange }
//                             />
//                             <TextField
//                                 label="Электронная почта"
//                                 name="email"
//                                 value={ data.email }
//                                 onChange={ handleChange }
//                             />
//                             <SelectField
//                                 label="Выбери свою профессию"
//                                 defaultOption = "Choose..."
//                                 value={ data.profession}
//                                 options={professionsList}
//                                 name="profession"
//                                 onChange={ handleChange }
//                             />
//                             <RadioField
//                                 options={[
//                                     { name: "Male", value: "male" },
//                                     { name: "Female", value: "female" },
//                                     { name: "Other", value: "other" }
//                                 ]}
//                                 value={data.sex}
//                                 name= "sex"
//                                 label="Выберите ваш пол"
//                                 onChange={ handleChange }
//                             />
//                             {
//                                 data.qualities.length > 0 && <MultySelectField
//                                     defaultValue={data.qualities}
//                                     options={qualitiesList}
//                                     onChange={handleChange}
//                                     name="qualities"
//                                     label="Выберите ваши качества"
//                                 />
//                             }
//                             <button type="submit"
//                                 className="btn btn-primary w-100 mx-auto"
//                             >
//                                         Обновить
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// EditUserPage.propTypes = {
//     edit: PropTypes.string
// };
// export default EditUserPage;
import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import BackHistoryButton from "../common/backButton";
import { useSelector, useDispatch } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/professions";
import { getCurrentUserData, updateUser } from "../../store/users";

const EditUserPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateUser({
                ...data,
                qualities: data.qualities.map((q) => q.value)
            })
        );
    };
    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    const transformData = (data) => {
        const result = getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));

        return result;
    };
    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfog = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={professionsList}
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качесвта"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
