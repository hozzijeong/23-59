const convertDiaryTitleToKor = (YYYYMMDD: string) => {
  return `${YYYYMMDD?.slice(0, 4)}년 ${YYYYMMDD?.slice(4, 6)}월 ${YYYYMMDD?.slice(6, 8)}일 결산`;
};

export { convertDiaryTitleToKor };
