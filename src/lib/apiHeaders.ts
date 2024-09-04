export const getToken = () => localStorage.getItem("authorization");

export const getApiHeaders = () => {
  return {
    headers: {
      Authorization: `${getToken()}`,
      "Content-Type": "application/json",
    },
  };
};
