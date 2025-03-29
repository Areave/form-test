import React, {useEffect, useState} from "react";
import "./TestForm.css";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FormSelect from 'react-bootstrap/FormSelect';
import Select from 'react-select';
import {pageTitleArray, provinces, regexs, errorHints} from './data.js'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css'
import {countries} from "./data";

const CustomSelect = ({formData, label, placeholder, required, fieldString, errors, isEmptyErrors, hintFieldString, validateField, handleChange}) => {
    return <>
        <Form.Label>{label + (required ? ' *' : '')}</Form.Label>
        <div className="tooltip_cont" data-tooltip={placeholder}>
            <Form.Control type={'text'}
                          value={formData[fieldString]}
                          bsPrefix={'form-control inp'}
                          name={fieldString}
                          placeholder={placeholder}
                          onChange={(e) => {
                              (regexs[hintFieldString] || required) && validateField(fieldString, e.target.value, regexs[hintFieldString]);
                              handleChange(e);
                          }}/>
        </div>
        {/*<div className="tooltip">{placeholder}</div>*/}
        <div className="hint_container">
            {hintFieldString && errors.includes(fieldString) && <div className="hint error">{errorHints[hintFieldString]}</div>}
            {required && (isEmptyErrors.includes(fieldString) || !formData[fieldString]) &&
            <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
        </div>
    </>
};


const TestForm = () => {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState([]);
    const [isEmptyErrors, setIsEmptyErrors] = useState([]);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
    const [formData, setFormData] = useState({
        province: "",
        fullName: "",
        otherNames: "",
        sex: "Male",
        idDocument: "Passport",
        idNumber: "",
        issuedOn: new Date(),
        issuedAt: "",
        placeOfBirth: "",
        dateOfBirth: new Date(),
        nationality: "",
        ethnicGroup: "",
        permanentAddress: "",
        temporaryAddress: "",
        fatherName: "",
        fatherDOB: new Date(),
        motherName: "",
        motherDOB: new Date(),
        spouseName: "",
        spouseDOB: new Date(),
        phone: "",
        email: "",
        lastEntry: new Date(),
        submissionDate: new Date(),
        occupation: "",
        workplace: "",
        criminalRecord: "No",
        crimeDetails: "",
        certificateType: 'Form N1',
        prohibitionConfirmation: "Yes",
        purpose: "",
        numberOfCertificates: 1,
        electronicCopy: "No",
        deliveryMethod: "Pickup at the office",
        deliveryAddress: "",
    });

    const nextStep = () => {
        setErrors([]);
        setStep((prev) => prev + 1)
    };
    const prevStep = () => {
        setErrors([]);
        setStep((prev) => prev - 1)
    };

    useEffect(() => {
        // console.log('formData', formData);
        const shouldNextButtonBeDisabled = checkIsNextButtonDisabled();
        console.log('shouldNextButtonBeDisabled', shouldNextButtonBeDisabled);
        if (isNextButtonDisabled !== shouldNextButtonBeDisabled) {
            setIsNextButtonDisabled(shouldNextButtonBeDisabled);
        }
    }, [formData, step]);

    useEffect(() => {
        // console.log('errors', errors);
    }, [errors]);
    useEffect(() => {
        console.log('isEmptyErrors', isEmptyErrors);
    }, [isEmptyErrors]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const checkIsNextButtonDisabled = () => {
        return errors.length > 0 || isEmptyErrors.length > 0 || document.getElementsByClassName('hint').length > 0;
    };

    const validateFieldByRegex = (fieldName, value, regex) => {
        const result = regex.test(value);
        if (result) {
            if (errors.includes(fieldName)) {
                setErrors(errors.filter(errorString => errorString !== fieldName));
            }
        } else {
            if (!errors.includes(fieldName)) {
                setErrors([...errors, fieldName]);
            }
        }
    };

    const validateField = (fieldName, value, regex, shouldBeFilled = true) => {

        if (!value) {
            setErrors(errors.filter(errorString => errorString !== fieldName));
        }

        if (shouldBeFilled) {
            if (!value) {
                if (!isEmptyErrors.includes(fieldName)) {
                    setIsEmptyErrors([...isEmptyErrors, fieldName]);
                }
            } else {
                console.log('value', value);
                console.log('isEmptyErrors.includes(fieldName)', isEmptyErrors.includes(fieldName));
                if (isEmptyErrors.includes(fieldName)) {
                    setIsEmptyErrors(isEmptyErrors.filter(errorString => errorString !== fieldName));
                }
                regex && validateFieldByRegex(fieldName, value, regex);
            }
        } else {
            regex && validateFieldByRegex(fieldName, value, regex);
        }
    };

    return (<div className={'content'}>

            <div className="page_title">{pageTitleArray[step] || ''}</div>

            <div className="glass-card">
                {step === 1 && (
                    <>
                        <div className="block">
                            <Form.Label> Please select the province where you reside and have either
                                temporary or permanent registration</Form.Label>
                            <Select isSearchable
                                    allowCreateWhileLoading={false}
                                    placeholder={'Select a Province'}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            // border: '2px solid black',
                                            // borderColor: state.isFocused ? 'blue' : 'none',
                                            height: '52px',
                                            borderRadius: '4px',
                                            backgroundColor: 'rgb(245, 247, 250)'
                                        }),
                                    }}
                                    options={provinces.map((provinceString) => {
                                        return {
                                            value: provinceString,
                                            label: provinceString,
                                        }
                                    })}
                                    classNamePrefix={'custom-select'}
                                    className={'custom-select-container'}
                                    defaultValue={formData.province}
                                // value={formData.selectSearchValue}
                                    onChange={(e) => {
                                        e && setFormData({...formData, province: e.value})
                                    }}/>
                            <div className="hint_container">
                                {(isEmptyErrors.includes('province') || !formData.province) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>
                    </>
                )}

                {/* Step 2: Applicant's Personal Data (1/2) */}
                {step === 2 && (
                    <>
                        {/*Name*/}
                        <div className="block">
                            <CustomSelect formData={formData}
                                          label={'Full Name'}
                                          placeholder={'Enter your full legal name'}
                                          required={true}
                                          fieldString={'fullName'}
                                          errors={errors}
                                          isEmptyErrors={isEmptyErrors}
                                          hintFieldString={'forOnlyEnglishAndVietnameeseLetters'}
                                          validateField={validateField}
                                          handleChange={handleChange}

                            />
                        </div>

                        {/*Sex*/}
                        <div className="block">
                            <Form.Label>{'Sex *'}</Form.Label>
                            <FormSelect bsPrefix={'form-select sel'}
                                        value={formData.sex}
                                        name={'sex'}
                                        onChange={handleChange}
                                        placeholder={'Select sex'}>
                                <option value="Male">{'Male'}</option>
                                <option value="Female">{'Female'}</option>
                            </FormSelect>
                        </div>

                        {/*ID document*/}
                        <div className="block">
                            <Form.Label>{'ID Document *'}</Form.Label>
                            <FormSelect bsPrefix={'form-select sel'}
                                        value={formData.idDocument}
                                        name={'idDocument'}
                                        onChange={handleChange}
                                        placeholder={'ID Document'}>
                                <option value="Passport">{'Passport'}</option>
                                <option value="National ID">{'National ID'}</option>
                            </FormSelect>
                        </div>

                        {/*ID number*/}
                        <div className="block">
                            <Form.Label>{'ID Number *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.idNumber}
                                          bsPrefix={'form-control inp'}
                                          name="idNumber"
                                          placeholder={'Enter ID Number'}
                                          onChange={(e) => {
                                              validateField('idNumber', e.target.value, regexs.forOnlyDigitsAndEnglishLetters);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('idNumber') && <div className="hint error">{errorHints.forOnlyDigitsAndEnglishLetters}</div>}
                                {(isEmptyErrors.includes('idNumber') || !formData.idNumber) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/*Issued On **/}
                        <div className="block">
                            <Form.Label>{'Issued On *'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.issuedOn}
                                onSelect={(e) => {
                                    setFormData({...formData, issuedOn: e});
                                }}
                            />
                        </div>

                        {/*Issued At **/}
                        <div className="block">
                            <Form.Label>{'Issued At *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.issuedAt}
                                          bsPrefix={'form-control inp'}
                                          name="issuedAt"
                                          placeholder={'Issued at'}
                                          onChange={(e) => {
                                              validateField('issuedAt', e.target.value, regexs.forOnlyDigitsAndEnglishLetters);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('issuedAt') && <div className="hint error">{errorHints.forOnlyDigitsAndEnglishLetters}</div>}
                                {(isEmptyErrors.includes('issuedAt') || !formData.issuedAt) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>
                    </>
                )}

                {/* Step 3: Applicant's Personal Data (2/2) */}
                {step === 3 && (
                    <>
                        {/* Place of Birth - Required, Only Latin */}
                        <div className="block">
                            <Form.Label>{'Place of Birth *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.placeOfBirth}
                                          bsPrefix={'form-control inp'}
                                          name="placeOfBirth"
                                          placeholder={'City, Country'}
                                          onChange={(e) => {
                                              validateField('placeOfBirth', e.target.value, regexs.forOnlyEnglishLettersAndSpaces);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('placeOfBirth') && <div className="hint error">{errorHints.forOnlyEnglishLettersAndSpaces}</div>}
                                {(isEmptyErrors.includes('placeOfBirth') || !formData.placeOfBirth) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Date of Birth - Required */}
                        <div className="block">
                            <Form.Label>{'Date of Birth *'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.dateOfBirth}
                                onSelect={(e) => {
                                    setFormData({...formData, dateOfBirth: e});
                                }}
                            />
                        </div>

                        {/* Nationality - Required */}
                        <div className="block">
                            <Form.Label>{'Nationality *'}</Form.Label>
                            <Select isSearchable
                                    allowCreateWhileLoading={false}
                                    placeholder={'Enter your nationality'}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            // border: '2px solid black',
                                            // borderColor: state.isFocused ? 'blue' : 'none',
                                            height: '52px',
                                            borderRadius: '4px',
                                            backgroundColor: 'rgb(245, 247, 250)'
                                        }),
                                    }}
                                    options={countries.map((country) => {
                                        return {
                                            value: country,
                                            label: country,
                                        }
                                    })}
                                    classNamePrefix={'custom-select'}
                                    className={'custom-select-container'}
                                    defaultValue={formData.nationality}
                                    onChange={(e) => {
                                        e && setFormData({...formData, nationality: e.value})
                                    }}/>
                            <div className="hint_container">
                                {(isEmptyErrors.includes('nationality') || !formData.nationality) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Ethnic Group - Required, Only Latin */}
                        <div className="block">
                            <Form.Label>{'Ethnic Group *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.ethnicGroup}
                                          bsPrefix={'form-control inp'}
                                          name="ethnicGroup"
                                          placeholder={'Enter your ethnic group'}
                                          onChange={(e) => {
                                              validateField('ethnicGroup', e.target.value, regexs.forOnlyEnglishLetters);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('ethnicGroup') && <div className="hint error">{errorHints.forOnlyEnglishLetters}</div>}
                                {(isEmptyErrors.includes('ethnicGroup') || !formData.ethnicGroup) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>
                    </>
                )}

                {/* Step 4: Applicant's Address */}
                {step === 4 && (
                    <>
                        <div className={'annotation'}>
                            A permanent address refers to your registered address in your
                            country of residency. A temporary address is your registered
                            address in Vietnam. If you have permanent registration in Vietnam,
                            please enter it in this field. Example of a correctly formatted
                            address in Vietnam: 123/5 Nguyen Hue, Phuong Vo Thi Sau, Quan 3,
                            Thanh pho Ho Chi Minh.{" "}
                        </div>

                        {/* Permanent Address - Required, Allow Latin, Numbers & Special Characters */}
                        <div className="block">
                            <Form.Label>{'Permanent Address *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.permanentAddress}
                                          bsPrefix={'form-control inp'}
                                          name="permanentAddress"
                                          placeholder={'Enter your permanent address'}
                                          onChange={(e) => {
                                              validateField('permanentAddress', e.target.value, regexs.forOnlyDigitsAndEnglishLettersSpacesChars);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('permanentAddress') && <div className="hint error">{errorHints.forOnlyEnglishLetters}</div>}
                                {(isEmptyErrors.includes('permanentAddress') || !formData.permanentAddress) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Temporary Address - Required, Allow Latin, Numbers & Special Characters */}
                        <div className="block">
                            <Form.Label>{'Temporary Address *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.temporaryAddress}
                                          bsPrefix={'form-control inp'}
                                          name="temporaryAddress"
                                          placeholder={'Enter your temporary address (if any)'}
                                          onChange={(e) => {
                                              validateField('temporaryAddress', e.target.value, regexs.forOnlyDigitsAndEnglishLettersSpacesChars);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('temporaryAddress') &&
                                <div className="hint error">{errorHints.forOnlyDigitsAndEnglishLettersSpacesChars}</div>}
                                {(isEmptyErrors.includes('temporaryAddress') || !formData.temporaryAddress) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>
                    </>
                )}

                {/* Step 5: Family Information */}
                {step === 5 && (
                    <>
                        <div className={'annotation'}>
                            If you do not have information about your parents and/or spouse,
                            please write "Don't have" in the "Name" field. Otherwise, provide
                            the relevant information.{" "}
                        </div>

                        {/* Father's Name - Required, Only Latin */}
                        <div className="block">
                            <Form.Label>{'Father\'s Name *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.fatherName}
                                          bsPrefix={'form-control inp'}
                                          name="fatherName"
                                          placeholder={'Enter your father\'s full name'}
                                          onChange={(e) => {
                                              validateField('fatherName', e.target.value, regexs.forOnlyEnglishLettersAndSpaces);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('fatherName') && <div className="hint error">{errorHints.forOnlyEnglishLettersAndSpaces}</div>}
                                {(isEmptyErrors.includes('fatherName') || !formData.fatherName) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Father's Date of Birth - Required */}
                        <div className="block">
                            <Form.Label>{'Father\'s Date of Birth *'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.fatherDOB}
                                onSelect={(e) => {
                                    setFormData({...formData, fatherDOB: e});
                                }}
                            />
                        </div>

                        {/* Mother's Name - Required, Only Latin */}
                        <div className="block">
                            <Form.Label>{'Mother\'s Name *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.motherName}
                                          bsPrefix={'form-control inp'}
                                          name="motherName"
                                          placeholder={'Enter your mother\'s full name'}
                                          onChange={(e) => {
                                              validateField('motherName', e.target.value, regexs.forOnlyEnglishLettersAndSpaces);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('motherName') && <div className="hint error">{errorHints.forOnlyEnglishLettersAndSpaces}</div>}
                                {(isEmptyErrors.includes('motherName') || !formData.motherName) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Mother's Date of Birth - Required */}
                        <div className="block">
                            <Form.Label>{'Mother\'s Date of Birth *'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.motherDOB}
                                onSelect={(e) => {
                                    setFormData({...formData, motherDOB: e});
                                }}
                            />
                        </div>

                        {/* Spouse's Name - Only Latin (Optional) */}
                        <div className="block">
                            <Form.Label>{'Spouse\'s Name'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.spouseName}
                                          bsPrefix={'form-control inp'}
                                          name="spouseName"
                                          placeholder={'Enter your spouse\'s full name (if any)'}
                                          onChange={(e) => {
                                              validateField('spouseName', e.target.value, regexs.forOnlyEnglishLettersAndSpaces);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('spouseName') && <div className="hint error">{errorHints.forOnlyEnglishLettersAndSpaces}</div>}
                            </div>
                        </div>

                        {/* Spouse's Date of Birth (Optional) */}
                        {formData.spouseName && <div className="block">
                            <Form.Label>{'Spouse\'s Date of Birth'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.spouseDOB}
                                onSelect={(e) => {
                                    setFormData({...formData, spouseDOB: e});
                                }}
                            />
                        </div>}
                    </>
                )}

                {/* Step 6: Contact Information */}
                {step === 6 && (
                    <>
                        {/* Phone Number - Required, Only Numbers and special symbols */}
                        <div className="block">
                            <Form.Label>{'Phone Number *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.phone}
                                          bsPrefix={'form-control inp'}
                                          name="phone"
                                          placeholder={'Enter your phone number (e.g., +84 123456789)'}
                                          onChange={(e) => {
                                              validateField('phone', e.target.value, regexs.forPhone);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('phone') && <div className="hint error">{errorHints.forPhone}</div>}
                                {(isEmptyErrors.includes('phone') || !formData.phone) && <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Email Address - Required, Only Valid Emails */}
                        <div className="block">
                            <Form.Label>{'Email Address *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.email}
                                          bsPrefix={'form-control inp'}
                                          name="email"
                                          placeholder={'Enter your email (e.g., example@mail.com)'}
                                          onChange={(e) => {
                                              validateField('email', e.target.value, regexs.forEmail);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('email') && <div className="hint error">{errorHints.forEmail}</div>}
                                {(isEmptyErrors.includes('email') || !formData.email) && <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>
                    </>
                )}

                {/* Step 7: Applicant's Background */}
                {step === 7 && (
                    <>
                        <div className={'annotation'}>
                            Enter the date of your last entry into Vietnam as shown in your
                            passport. Submission date – indicate the date when you plan to
                            submit your application. If you have not decided on the date yet,
                            you may leave this field blank{" "}
                        </div>

                        {/* Last Entry Date - Required */}
                        <div className="block">
                            <Form.Label>{'Last Entry Date *'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.lastEntry}
                                onSelect={(e) => {
                                    setFormData({...formData, lastEntry: e});
                                }}
                            />
                        </div>

                        {/* Submission Date - Required */}
                        <div className="block">
                            <Form.Label>{'Submission Date *'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.submissionDate}
                                onSelect={(e) => {
                                    setFormData({...formData, submissionDate: e});
                                }}
                            />
                        </div>


                        {/* Occupation - Required */}
                        <div className="block">
                            <CustomSelect formData={formData}
                                          label={'Occupation '}
                                          placeholder={'Enter your full legal name'}
                                          required={true}
                                          fieldString={'occupation'}
                                          errors={errors}
                                          isEmptyErrors={isEmptyErrors}
                                          validateField={validateField}
                                          handleChange={handleChange}

                            />
                        </div>

                        {/* Workplace - Required */}
                        <div className="block">
                            <CustomSelect formData={formData}
                                          label={'Workplace '}
                                          placeholder={'Enter your workplace'}
                                          required={true}
                                          fieldString={'workplace'}
                                          errors={errors}
                                          isEmptyErrors={isEmptyErrors}
                                          validateField={validateField}
                                          handleChange={handleChange}

                            />
                        </div>
                    </>
                )}

                {/* Step 8: Other Information (1/2) */}
                {step === 8 && (
                    <>
                        {/* Do you have a criminal record? - Required */}
                        <div className="block">
                            <Form.Label>{'Do you have a criminal record?'}</Form.Label>
                            <FormSelect bsPrefix={'form-select sel'}
                                        value={formData.criminalRecord}
                                        name={'criminalRecord'}
                                        onChange={handleChange}
                                        placeholder={'ID Document'}>
                                <option value="Yes">{'Yes'}</option>
                                <option value="No">{'No'}</option>
                            </FormSelect>
                        </div>

                        {/* Conditional Field: Crime Details (Only if "Yes" is selected) */}
                        {formData.criminalRecord === "Yes" && (
                            <div className="block">
                                <CustomSelect formData={formData}
                                              label={'Details of Criminal Record '}
                                              placeholder={'Enter details'}
                                              required={false}
                                              fieldString={'crimeDetails'}
                                              errors={errors}
                                              isEmptyErrors={isEmptyErrors}
                                              validateField={validateField}
                                              handleChange={handleChange}

                                />
                            </div>
                        )}

                        {/* Certificate Type - Required */}
                        <div className="block">
                            <Form.Label>{'Criminal Record Certificate Type'}</Form.Label>
                            <FormSelect bsPrefix={'form-select sel'}
                                        value={formData.certificateType}
                                        name={'certificateType'}
                                        onChange={handleChange}
                                        placeholder={'certificateType'}>
                                <option value="Form N1">{'Form N1'}</option>
                                <option value="Form N2">{'Form N2'}</option>
                            </FormSelect>
                        </div>

                        {/* Conditional Field: Prohibition Confirmation (Only if "Form N1" is selected) */}
                        {formData.certificateType === "Form N1" && (
                            <div className="block">
                                <Form.Label>{'Prohibition Confirmation (Form N1)'}</Form.Label>
                                <FormSelect bsPrefix={'form-select sel'}
                                            value={formData.prohibitionConfirmation}
                                            name={'prohibitionConfirmation'}
                                            onChange={handleChange}
                                            placeholder={'ID Document'}>
                                    <option value="Yes">{'Yes'}</option>
                                    <option value="No">{'No'}</option>
                                </FormSelect>
                            </div>
                        )}
                    </>
                )}

                {/* Step 9: Other Information (2/2) */}
                {step === 9 && (
                    <>
                        {/* Purpose of Applying - Required, Only Latin + Numbers + Symbols */}
                        <div className="block">
                            <CustomSelect formData={formData}
                                          label={'Purpose of Applying'}
                                          placeholder={'Enter the purpose of applying'}
                                          required={true}
                                          fieldString={'purpose'}
                                          errors={errors}
                                          isEmptyErrors={isEmptyErrors}
                                          hintFieldString={'forOnlyDigitsAndEnglishLettersSpacesChars'}
                                          validateField={validateField}
                                          handleChange={handleChange}
                            />
                        </div>

                        {/* Number of Criminal Clearance Certificates - Required */}
                        <div className="block">
                            <Form.Label>{'Number of certificates *'}</Form.Label>
                            <Form.Control type={'number'}
                                          value={formData.numberOfCertificates}
                                          bsPrefix={'form-control inp'}
                                          name={'numberOfCertificates'}
                                          onChange={handleChange}/>
                        </div>

                        {/* Receive Electronic Copy Online - Required */}
                        <div className="block">
                            <Form.Label>{'Receive Electronic Copy Online?'}</Form.Label>
                            <FormSelect bsPrefix={'form-select sel'}
                                        value={formData.electronicCopy}
                                        name={'electronicCopy'}
                                        onChange={handleChange}>
                                <option value="Yes">{'Yes'}</option>
                                <option value="No">{'No'}</option>
                            </FormSelect>
                        </div>

                        {/* Form and Methods of Receiving Results - Required */}
                        <div className="block">
                            <Form.Label>{'How to receive'}</Form.Label>
                            <FormSelect bsPrefix={'form-select sel'}
                                        value={formData.deliveryMethod}
                                        name={'deliveryMethod'}
                                        onChange={handleChange}>
                                <option value="Pickup at Office">{'Pickup at Office'}</option>
                                <option value="Delivery">{'Delivery'}</option>
                            </FormSelect>
                        </div>

                        {formData.deliveryMethod === 'Delivery' && <div className="block">
                            <CustomSelect formData={formData}
                                          label={'Delivery Address'}
                                          placeholder={'Enter full delivery address'}
                                          required={true}
                                          fieldString={'deliveryAddress'}
                                          errors={errors}
                                          isEmptyErrors={isEmptyErrors}
                                          hintFieldString={'forOnlyEnglishAndVietnameeseLetters'}
                                          validateField={validateField}
                                          handleChange={handleChange}

                            />
                        </div>}


                    </>
                )}

                {/* Step 10: Summary */}
                {step === 10 && (
                    <div>
                        <h3>Summary</h3>
                        <ul className="summary-list">
                            {Object.keys(formData).map((key) => (
                                <li key={key}>
                                    <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong>{" "}
                                    {String(formData[key])}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <h2 className={'card_title'}>Step {step} of 10</h2>

            </div>


            <div className="buttons">
                {step > 1 && <Button variant="primary" onClick={prevStep}>Back</Button>}
                {step < 10 && <Button disabled={isNextButtonDisabled} variant="primary" onClick={() => {
                    nextStep()
                }}>Next</Button>}
                {step === 10 && <button>Submit</button>}
            </div>
        </div>
    );
};

export default TestForm;
