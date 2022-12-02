const API_ENDPOINT = "http://localhost:8080";

export default function getAllCoursesRequest(departmentYear) {
  return fetch(`${API_ENDPOINT}/${departmentYear}/getAll`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((e) => console.log(`GetAllCoursesError: ${e}`));
}
