export const validEmailRegex =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getErrorMessageResponse = (response: any) => {
  // console.log(response === "Login succes")
  if (typeof response?.message === 'string') {

    return response?.message;
  }
  if(response === "Login succes"){

    return response
  }

  if (response?.message?.details[0]) {
    return response?.message?.details[0]?.message;
  }

  return '';
};
