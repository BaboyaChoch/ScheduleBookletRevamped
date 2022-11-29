const API_ENDPOINT = "http://localhost:8080";

function getAllCoursesRequest(departmentYear) {
  console.log(`${API_ENDPOINT}/${departmentYear}/getAll`);
  return fetch(`${API_ENDPOINT}/${departmentYear}/getAll`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((e) => console.log(`GetAllCoursesError: ${e}`));
}

module.exports = {
  getAllCoursesRequest,
};
