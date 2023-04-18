import React, { useState } from 'react';
import LoginFormV2 from '../components/LoginFormV2';
import LoginForm from '../components/LoginForm';
import toast, { Toaster } from 'react-hot-toast';

import logo from '../../../logo-420-x-108.png';
import { ILoginParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import { mapStateToProps, getMessages } from "../../intl/component/ConnectedIntlProvider";
// import { connectRouter, RouterState } from 'connected-react-router';
// import authReducer, { AuthState } from '../../../modules/auth/redux/authReducer';
// import intlReducer, { IntlState } from '../../../modules/intl/redux/intlReducer;
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { setLocale } from "../../intl/redux/intlReducer"

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function toastMessage(json: string) {
    if (json.trim() === "OK") {
      // console.log(json)
      toast.success("Login sucess!", {
        duration: 2000,
      })

    } else {
      toast.error(json, {
        duration: 2000,
      })
    }

  }
  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        toastMessage(json.message)
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.home));
        console.log(json)
        // setErrorMessage(getErrorMessageResponse("Login succes"));

        return;
      } else {
        console.log(json)

        toastMessage(json.message)
      }

      // setErrorMessage(getErrorMessageResponse(json));

    },
    [dispatch],
  );

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
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      <LoginFormV2 onLogin={onLogin} loading={loading} errorMessage={errorMessage} />

      <div>
        <p className=""
          // type="submit"
          style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: "pointer" }}
          // onClick={() => mapStateToProps({locale : "en"})}
          onClick={() => setLocale("en")}

        >
          <span>Tiếng Anh</span>
        </p>

        <p className=" mt-3"
          style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: "pointer" }}
          // type="submit"
          onClick={() => setLocale("vi")}

        >
            <span>Tiếng Việt</span>
        </p>
    </div>
    </div >
  );
};

export default LoginPage;
