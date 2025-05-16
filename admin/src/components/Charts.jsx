import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, Cell } from "recharts";
import {
    generateCourseColorMap,
    renderCourseLegend
} from "../chartUtils.js";


const Charts = ({ moduleEnrollments, courseEnrollments, monthlyRegistrations, completedUsers }) => {
    const customFont = { fontFamily: '"SFRegular"', fontSize: 12 };
  
    // Create course -> color mapping
    const courseColors = generateCourseColorMap(courseEnrollments);
  
    const transformedCourses = courseEnrollments.map((course) => ({
        title: course.title,
        count: course.count,
      }));
      
    // Transform Module Enrollment Data
    const transformEnrollmentData = (data) => {
      const courseMap = {};
      data.forEach(({ courseTitle, moduleTitle, count }) => {
        if (!courseMap[courseTitle]) courseMap[courseTitle] = { courseTitle };
        courseMap[courseTitle][moduleTitle] = count;
      });
      return Object.values(courseMap);
    };
    const moduleData = transformEnrollmentData(moduleEnrollments);
    const moduleTitles = [...new Set(moduleEnrollments.map(item => item.moduleTitle))];
  
    // Map module -> course
    const moduleToCourseMap = {};
    moduleEnrollments.forEach(({ moduleTitle, courseTitle }) => {
      moduleToCourseMap[moduleTitle] = courseTitle;
    });

    const CustomTooltip = ({ payload, label }) => {
        // Check if there's any data in the payload (ensures data exists for tooltip)
        if (payload && payload.length > 0) {
          const { courseTitle, courseSectionTitle, moduleTitle, userCount } = payload[0].payload;
          return (
            <div className="bg-white p-2 shadow-lg rounded font-sf-regular text-sm">
              <p><strong>Module:</strong> {moduleTitle}</p>
              <p><strong>Course:</strong> {courseTitle}</p>
              <p><strong>Course Section:</strong> {courseSectionTitle}</p>
              <p><strong>Completed Users:</strong> {userCount}</p>
            </div>
          );
        }
        return null;
    };
  
    return (
      <div className="flex flex-col gap-4">
        {/* First Row */}
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          {/* Monthly Registrations */}
          <div className="w-full md:w-1/2 p-4 bg-white rounded-xl shadow h-[400px]">
            <h2 className="text-lg font-sf-bold text-blue-800 mb-4">Monthly User Registrations</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRegistrations} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={customFont} />
                <YAxis allowDecimals={false} tick={customFont} />
                <Tooltip contentStyle={customFont} />
                <Line type="monotone" dataKey="count" stroke="#266ca9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
  
          {/* Course Enrollments */}
          <div className="w-full md:w-1/2 p-4 bg-white rounded-xl shadow h-[400px]">
            <h2 className="text-lg font-sf-bold text-blue-800 mb-4">Course Enrollments</h2>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={transformedCourses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" tick={customFont}/>
                    <YAxis tick={customFont} />
                    <Tooltip contentStyle={customFont} />
                    <Legend wrapperStyle={customFont} content={renderCourseLegend(courseEnrollments, courseColors)} />
                    <Bar
                    dataKey="count"
                    name="Enrollments"
                    >
                    {transformedCourses.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={courseColors[entry.title]} />
                    ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
  
        {/* Second Row */}
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          {/* Module Enrollments */}
          <div className="w-full md:w-1/2 p-4 bg-white rounded-xl shadow h-[400px]">
            <h2 className="text-lg font-sf-bold text-blue-800 mb-4">Module Enrollments</h2>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={moduleData}>
                <XAxis dataKey="courseTitle" tick={customFont} />
                <YAxis tick={customFont} />
                <Tooltip contentStyle={customFont} />
                <Legend wrapperStyle={customFont} content={renderCourseLegend(courseEnrollments, courseColors)} />
                {moduleTitles.map((moduleTitle) => {
                  const courseTitle = moduleToCourseMap[moduleTitle];
                  return (
                    <Bar
                      key={moduleTitle}
                      dataKey={moduleTitle}
                      fill={courseColors[courseTitle]}
                      name={moduleTitle}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          {/* Completed Users */}
          <div className="w-full md:w-1/2 p-4 bg-white rounded-xl shadow h-[400px]">
            <h2 className="text-lg font-sf-bold text-blue-800 mb-4">Completed Users</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completedUsers} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="moduleTitle" tick={customFont} />
                <YAxis tick={customFont} />
                <Tooltip content={<CustomTooltip />} contentStyle={customFont} />
                <Legend wrapperStyle={customFont} />
                <Bar dataKey="userCount" fill="#266ca9" name="User Count" />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };
  
  export default Charts;