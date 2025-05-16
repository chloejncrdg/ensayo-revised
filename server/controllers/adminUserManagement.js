import User from "../models/User.js"
import { Module, Course } from '../models/Content.js'
import Progress from '../models/Progress.js'


// count all users 
export const countTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// count users with wherein length of "enrolled courses" are more than 0
export const countUsersWithEnrolledCourses = async (req, res) => {
    try {
        const usersWithEnrolledCourses = await User.countDocuments({ enrolledCourses: { $exists: true, $not: { $size: 0 } } });
        res.status(200).json({ usersWithEnrolledCourses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// count users enrolled for each course
export const countUsersEnrolledInCourses = async (req, res) => {
    try {
        // Aggregate the users by their enrolled courses and count
        const results = await User.aggregate([
            { $unwind: '$enrolledCourses' },
            {
                $lookup: {
                    from: 'modules',
                    localField: 'enrolledCourses',
                    foreignField: '_id',
                    as: 'module'
                }
            },
            { $unwind: '$module' },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'module.courseId',
                    foreignField: '_id',
                    as: 'course'
                }
            },
            { $unwind: '$course' },
            {
                $group: {
                    _id: '$course._id',
                    title: { $first: '$course.title' },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error counting users enrolled in courses' });
    }
};

// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password -address');
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching users' });
//     }
// };

// with pagination
export const getAllUsers = async (req, res) => {
    try {
      const { page = 1, perPage = 20, search = '' } = req.query;
      const skip = (page - 1) * perPage;
  
      let query = {};
      if (search) {
        query = {
          $or: [
            { firstName: { $regex: search, $options: 'i' } }, // Case-insensitive regex search
            { lastName: { $regex: search, $options: 'i' } },
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        };
      }
  
      const users = await User.find(query)
        .select('-password -address')
        .skip(skip)
        .limit(perPage);
  
      const totalUsers = await User.countDocuments(query);
  
      res.status(200).json({
        users,
        totalPages: Math.ceil(totalUsers / perPage),
        currentPage: page,
        perPage
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching users' });
    }
  };

export const getUserDetails = async (req, res, next) => {
    const userId = req.params.userId; // Assuming the route parameter is userId
  
    try {
      // Fetch user details including enrolledCourses
      const user = await User.findById(userId).populate({
        path: 'enrolledCourses',
        select: 'title', // Select only the title of each enrolled module
      });
  
      if (!user) {
        return next(createError(404, 'User not found'));
      }
  
      // Fetch progress records for the user
      const progresses = await Progress.find({ userId })
        .populate({
          path: 'unitId',
          select: 'title image', // Specify fields to select: title and image
        })
        .populate({
          path: 'moduleId',
          select: 'title courseId', // Select moduleId and courseId
          populate: {
            path: 'courseId',
            select: 'title', // Select course title
          }
        });
  
      // Map progresses to include courseTitle from moduleId.courseId
      const progressesWithCourseTitle = progresses.map(progress => ({
        ...progress.toObject(), // Convert Mongoose document to plain JavaScript object
        courseTitle: progress.moduleId.courseId.title // Access course title through moduleId.courseId.title
      }));
  
      // Prepare response object
      const userDetails = {
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        enrolledCourses: user.enrolledCourses.map(course => course.title),
        progress: progressesWithCourseTitle,
      };
  
      res.status(200).json(userDetails);
    } catch (error) {
      next(error);
    }
  };


  export const getEnrollmentData = async (req, res) => {
    try {
        const results = await User.aggregate([
            {
                $unwind: "$enrolledCourses"
            },
            {
                $lookup: {
                    from: "modules",
                    localField: "enrolledCourses",
                    foreignField: "_id",
                    as: "moduleDetails"
                }
            },
            {
                $unwind: "$moduleDetails"
            },
            {
                $group: {
                    _id: "$moduleDetails._id",
                    count: { $sum: 1 },
                    moduleTitle: { $first: "$moduleDetails.title" },
                    courseId: { $first: "$moduleDetails.courseId" }
                }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "courseId",
                    foreignField: "_id",
                    as: "courseInfo"
                }
            },
            {
                $unwind: "$courseInfo"
            },
            {
                $project: {
                    moduleId: "$_id",
                    moduleTitle: 1,
                    courseId: 1,
                    courseTitle: "$courseInfo.title",
                    count: 1
                }
            }
        ]);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error counting users enrolled in each module' });
    }
};


export const getUserRegistrationsByMonth = async (req, res) => {
  try {
      // Aggregate users by month and year
      const results = await User.aggregate([
          {
              $project: {
                  // Extract the year and month from the createdAt field
                  year: { $year: '$createdAt' },
                  month: { $month: '$createdAt' }
              }
          },
          {
              $group: {
                  // Group by year and month
                  _id: { year: '$year', month: '$month' },
                  count: { $sum: 1 } // Count the number of users
              }
          },
          {
              $sort: { '_id.year': 1, '_id.month': 1 } // Sort by year and month in ascending order
          }
      ]);

      res.status(200).json(results); // Send the results back in the response
  } catch (error) {
      res.status(500).json({ error: 'Error counting users created each month' });
  }
};

export const getCompletedUsers = async (req, res) => {
    try {
      const results = await Progress.aggregate([
        // Step 1: Filter users who have completed a unit (progress = 100)
        { $match: { progress: 100 } },
  
        // Step 2: Group by userId and moduleId, collect all completed unitIds per user
        { 
          $group: { 
            _id: { userId: "$userId", moduleId: "$moduleId" }, 
            completedUnits: { $addToSet: "$unitId" }
          }
        },
  
        // Step 3: Lookup the module data to get all units in a module
        { 
          $lookup: { 
            from: "units", 
            localField: "_id.moduleId", 
            foreignField: "moduleId", 
            as: "moduleUnits"
          }
        },
  
        // Step 4: Ensure users have completed all units in the module
        { 
          $project: { 
            moduleId: "$_id.moduleId", 
            userId: "$_id.userId", 
            completedAllUnits: { $eq: [ { $size: "$completedUnits" }, { $size: "$moduleUnits" } ] }
          } 
        },
  
        // Step 5: Filter only users who completed all units
        { $match: { completedAllUnits: true } },
  
        // Step 6: Group by moduleId to count unique users per module
        { 
          $group: { 
            _id: "$moduleId", 
            completedUsers: { $addToSet: "$userId" } 
          } 
        },
  
        // Step 7: Count total users per module
        { 
          $project: { 
            moduleId: "$_id", 
            userCount: { $size: "$completedUsers" }
          } 
        },
  
        // Step 8: Lookup module title from the Module collection
        { 
          $lookup: { 
            from: "modules", 
            localField: "moduleId", 
            foreignField: "_id", 
            as: "moduleData"
          } 
        },
  
        // Step 9: Lookup course data from the Course collection
        { 
          $lookup: { 
            from: "courses", 
            localField: "moduleData.courseId", 
            foreignField: "_id", 
            as: "courseData"
          }
        },
  
        // Step 10: Lookup course section data from the CourseSection collection
        { 
          $lookup: { 
            from: "coursesections", 
            localField: "moduleData.courseSectionId", 
            foreignField: "_id", 
            as: "courseSectionData"
          }
        },
  
        // Step 11: Format the output, including course title and course section title
        { 
          $project: { 
            moduleTitle: { $arrayElemAt: ["$moduleData.title", 0] },
            userCount: 1,
            courseTitle: { $arrayElemAt: ["$courseData.title", 0] },
            courseSectionTitle: { $arrayElemAt: ["$courseSectionData.title", 0] }
          } 
        }
      ]);
  
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: "Error counting users who completed each module" });
    }
  };
  