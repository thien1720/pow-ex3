import React, { useEffect, useState } from 'react';
import logo from '../../../logo-420-x-108.png';
import { ISignUpParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import SignupForm from "../components/SingupForm"
import toast, { Toaster } from 'react-hot-toast';


const SignUpPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [locations, setLocations] = useState([]);
    const [states, setStates] = useState([]);
    const [idRegion, setIdRegion] = useState('');
    // console.log(states)
    const getLocation = React.useCallback(async (idRegion?: string) => {
        setLoading(true);

        const json = await dispatch(
            fetchThunk(idRegion ? `${API_PATHS.getLocation}?pid=${idRegion}` : API_PATHS.getLocation, 'get'),
        );

        setLoading(false);

        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            // console.log(json.data);

            idRegion ? setStates(json.data) : setLocations(json.data);
            return;
        }
    }, []);

    useEffect(() => {
        getLocation(idRegion);
    }, [getLocation, idRegion]);

    function toastMessage(json: string) {
        console.log(json)
        if (json.trim() === "OK") {
            toast.success("SingUp user sucess!", {
                duration: 2000,
            })

        } else {
            toast.error(json, {
                duration: 2000,
            })
        }

    }
    const onSignUp = React.useCallback(
        async (values: ISignUpParams) => {
            setErrorMessage('');
            setLoading(true);

            const json = await dispatch(
                fetchThunk(API_PATHS.signUp, 'post', values),
            );
            setLoading(false);

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                dispatch(setUserInfo(json.data));
                // Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
                toastMessage(json.message)

                dispatch(replace(ROUTES.home));
                return;
            } else {
                toastMessage(json.message)
            }

            // setErrorMessage(getErrorMessageResponse(json));
        },
        [dispatch],
    );

    const onChangeRegion = (idRegion: string) => {
        setIdRegion(idRegion);
    };

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
            <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <SignupForm
                onSignUp={onSignUp}
                loading={loading}
                errorMessage={errorMessage}
                locations={locations}
                states={states}
                onChangeRegion={onChangeRegion}
            />

            <div>
                <button>
                    <span>Tiếng Anh</span>
                </button>

                <button>
                    <span>Tiếng Việt</span>
                </button>
            </div>
        </div>
    );
};

export default SignUpPage;
