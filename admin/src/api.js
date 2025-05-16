import axios from 'axios';

const axiosInstance = axios.create({
	baseURL:process.env.REACT_APP_API_URL,
        withCredentials: true
});

export const fetchAllUsers = async (page = 1, perPage = 20, search = '') => {
    try {
      const response = await axiosInstance.get('/userManagement/getUsers', {
        params: {
          page,
          perPage,
          search
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
};

// Fetch total number of users
export const fetchTotalUsers = async () => {
    const response = await axiosInstance.get(`/userManagement/countTotalUsers`);
    return response.data.totalUsers;
};

// Fetch total number of users with enrolled courses
export const fetchUsersWithEnrolledCourses = async () => {
    const response = await axiosInstance.get(`/userManagement/countEnrolledUsers`);
    return response.data.usersWithEnrolledCourses;
};

// Fetch users enrolled in each course
export const fetchUsersEnrolledInCourses = async () => {
    const response = await axiosInstance.get(`/userManagement/courseEnrollees`);
    return response.data;
};

// Fetch users enrolled in each modules
export const fetchModuleEnrollments = async () => {
  const response = await axiosInstance.get(`/userManagement/getEnrollmentData`);
  return response.data;
};


export const fetchUserRegistrationsByMonth = async () => {
  const response = await axiosInstance.get(`/userManagement/getUserRegistrationsByMonth`);
  
  const formattedData = response.data.map(item => {
    const year = item._id.year;
    const month = item._id.month.toString().padStart(2, '0'); // ensures '09' not '9'
    return {
      date: `${year}-${month}`,
      count: item.count
    };
  });

  return formattedData;
};


export const fetchCompletedUsers = async () => {
  const response = await axiosInstance.get(`/userManagement/getCompletedUsers`);
  return response.data;
};

