import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormattedMessage } from 'react-intl';
import toast, { Toaster } from 'react-hot-toast';
import { ISignUpParams, ILocationParams, ISignUpValidation } from '../../../models/auth';
import { GENDER } from "../../intl/constants"
import { values } from 'lodash';

interface Props {
    onSignUp(values: ISignUpParams): void;
    loading: boolean;
    errorMessage: string;
    locations: Array<ILocationParams>;
    states: Array<ILocationParams>;
    onChangeRegion(idRegion: string): void;
}


const SingupForm = (props: Props) => {
    const { onSignUp, loading, errorMessage, locations, states, onChangeRegion } = props;
    // console.log(states)
    // console.log(locations)
    
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: '',
            name: '',
            gender: '',
            region: [],
            state: [],
        }
    });
    const [formValues, setFormValues] = React.useState<ISignUpParams>({
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        gender: '',
        region: '',
        state: '',
    });
    // const [validate, setValidate] = React.useState<ISignUpValidation>();
    const [reatPass, setReatPass] = useState<string>("")

    const onSubmit = React.useCallback(() => {
        // setValidate(validate);
        onSignUp(formValues);
        // console.log("thien")
    }, [formValues, onSignUp]);

    function toastMessage() {
        if (errorMessage.trim() === "Login succes") {
            toast.success("Login sucess!", {
                duration: 2000,
            })

        } else {
            toast.error("Invalid username / password", {
                duration: 1000,
            })
        }

    }

    // console.log(formValues)
    return (
        <div
            className="container"
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >


            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ maxWidth: '560px', width: '100%' }}
                className="row g-3 needs-validation"
            >

                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Value is not email"
                        },
                        required: "This email is required.",
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="col-md-12">
                            <label htmlFor="inputEmail" className="form-label">
                                <FormattedMessage id="email" />
                            </label>
                            <input
                                {...field}
                                type="text"
                                name="email"
                                className="form-control"
                                id="inputEmail"
                                onChange={(e) => {
                                    field.onChange(e);
                                    setFormValues({ ...formValues, email: e.target.value })
                                }}
                            />
                            {error && <small className="text-danger">
                                {error.message}
                            </small>}
                        </div>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        minLength: {
                            value: 6,
                            message: "This input must exceed 6 characters"
                        },
                        required: "This password is required.",

                    }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="col-md-12">
                            <label htmlFor="inputPassword" className="form-label">
                                <FormattedMessage id="password" />
                            </label>
                            <input {...field}
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                onChange={(e) => {
                                    // console.log(e)
                                    field.onChange(e);
                                    setFormValues({ ...formValues, password: e.target.value })
                                }}
                            />
                            {

                                error && <small className="text-danger">
                                    {error?.message}</small>
                            }

                        </div>
                    )}
                />

                {/* repeat password */}
                <Controller
                    name="repeatPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                        minLength: {
                            value: 6,
                            message: "This input must exceed 6 characters"
                        },
                        required: "This repeat password is required.",
                        validate: (val: string) => {
                     
                            if (val !== formValues.password) {
                                return "Your passwords do no match";
                            }
                        },
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="col-md-12">
                            <label htmlFor="inputPassword" className="form-label">
                                <FormattedMessage id="Xác nhập lại mật khẩu" />
                            </label>
                            <input {...field}
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                onChange={(e) => {
                                    // console.log(e)
                                    if (e.target.value !== formValues.password) {
                                        // console.log(e.target.value)
                                        // console.log()

                                        setReatPass("Your passwords do no match")
                                        // return
                                        setFormValues({ ...formValues, repeatPassword: e.target.value })

                                    } else {
                                        // console.log(formValues.password)
                                        setReatPass("")
                                        setFormValues({ ...formValues, repeatPassword: e.target.value })

                                    }
                                    // console.log("skfjdk")
                                    field.onChange(e);
                                    // setFormValues({ ...formValues, repeatPassword: e.target.value })
                                }}
                            />
                            {
                                reatPass
                                    ? <small className="text-danger">
                                        {reatPass}</small>
                                    : error && <small className="text-danger">
                                        {error?.message}</small>
                            }
                        </div>
                    )}
                />
                {/* Họ và Tên */}
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: "This fullname is required.",

                    }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="col-md-12">
                            <label htmlFor="inputPassword" className="form-label">
                                <FormattedMessage id="name" />
                            </label>
                            <input {...field}
                                type="text"
                                className="form-control"
                                id="inputPassword"
                                onChange={(e) => {
                                    // console.log("name", e.target.value)
                                    field.onChange(e);
                                    setFormValues({ ...formValues, name: e.target.value })
                                }}
                            />
                            {error && <small className="text-danger">
                                {error?.message}</small>}
                        </div>
                    )}
                />
                {/* Giới Tính */}
                <Controller
                    name="gender"
                    control={control}
                    rules={{
                        required: "This gender is required.",

                    }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="col-md-12">
                            <label htmlFor="inputPassword" className="form-label">
                                <FormattedMessage id="gender" />
                            </label>
                            <select
                                onChange={(e) => {
                                    // console.log("gender",e.target.value)
                                    field.onChange(e);
                                    setFormValues({ ...formValues, gender: e.target.value })
                                }}
                                className="form-select"
                                aria-label="Default select example">
                                <option selected>--select an option--</option>
                                {GENDER.map((gen) => {
                                    return <option key={gen.label}>{gen.value}</option>
                                })}
                            </select>
                            {error && <small className="text-danger">
                                {error?.message}</small>}
                        </div>
                    )}
                />

                {/* QUốc gia */}
                <Controller
                    name="region"
                    control={control}
                    rules={{
                        required: "This region is required.",

                    }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="col-md-12">
                            <label htmlFor="inputPassword" className="form-label">
                                <FormattedMessage id="region" />
                            </label>
                            <select
                                onChange={(e) => {
                                    let nameRegion = e.target.value
                                    // console.log( "region", typeof nameRegion);
                                    onChangeRegion(e.target.value)
                                    field.onChange(e);
                                    setFormValues({ ...formValues, region: nameRegion  })
                                }}
                                className="form-select"
                                name="region"
                                aria-label="Default select example">
                                <option selected>--select an option--</option>
                                {locations.map((ci) => {
                                    return <option key={ci.id} value={ci.id} name-id={ci.name}>{ci.name}</option>
                                })}
                            </select>
                            {error && <small className="text-danger">
                                {error?.message}</small>}
                        </div>
                    )}
                />

                {/* Thành Phố */}
                <Controller
                    name="state"
                    control={control}
                    rules={{
                        required: "This city is required.",

                    }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="col-md-12">
                            <label htmlFor="inputPassword" className="form-label">
                                <FormattedMessage id="Thành Phố" />
                            </label>
                            <select
                                onChange={(e) => {
                                    // console.log("state", e.target.value)
                                    field.onChange(e);
                                    setFormValues({ ...formValues, state: e.target.value })
                                }}
                                className="form-select"
                                aria-label="Default select example"
                            >
                                <option selected>--select an option--</option>
                                {states.map((ci) => {
                                    return <option key={ci.id} value={ci.id}>{ci.name}</option>
                                })}
                            </select>
                            {error && <small className="text-danger">
                                {error?.message}</small>}
                        </div>
                    )}
                />



                <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
                    <div className="col-md-auto" style={{ position: "relative" }}>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            disabled={loading}
                            value="Đăng Nhập"
                        >
                            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                            <FormattedMessage id="register" />


                        </button>
                    </div>
                </div>
            </form >

        </div>

    );
};

export default SingupForm;
