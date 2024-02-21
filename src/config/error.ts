const handleAxiosError = (status: number) => {
  switch (status) {
    case 503: {
      ('로스트아크 서비스 점검 중입니다.');
      console.log('503', '점검');
      break;
    }

    default:
      break;
  }
};

export default handleAxiosError;
