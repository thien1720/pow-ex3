import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormattedMessage } from 'react-intl';
import toast, { Toaster } from 'react-hot-toast';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { Link } from 'react-router-dom';

interface Props {
    onLogin(values: ILoginParams): void;
    loading: boolean;
    errorMessage: string;
}


const LoginFormV2 = (props: Props) => {
    const { onLogin, loading, errorMessage } = props;
    const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '', rememberMe: false });
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        }
    });



    const onSubmit = React.useCallback(async (data: ILoginParams) => {
        await onLogin(formValues)

    }, [formValues]);

    return (<>
        
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
                              
                                field.onChange(e);
                                setFormValues({ ...formValues, password: e.target.value })
                            }}
                        />
                        {error && <small className="text-danger">
                            {error?.message}</small>}
                    </div>
                )}
            />

            <Controller
                name="rememberMe"
                control={control}

                render={({ field, fieldState: { error } }) => (
                    <div className="col-12">
                        <div className="form-check">
                            <input

                                className="form-check-input"
                                type="checkbox"
                                id="invalidCheck"

                                onChange={(e) => {
                                    field.onChange(e);
                                    setFormValues({ ...formValues, rememberMe: !!field.value })
                                }}
                            />
                            <label className="form-check-label" htmlFor="invalidCheck">
                                <FormattedMessage id="rememberMe" />
                            </label>
                        </div>
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

        <p>
            Bạn cần đăng kí ? <Link to="/sing-up" >Đăng kí.</Link>
        </p>
    </>
    );
};

export default LoginFormV2;
