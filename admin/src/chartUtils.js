export const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7f50',
    '#a2d2ff', '#ffafcc', '#b5ead7', '#f7d794'
];
  
export const generateCourseColorMap = (courses) => {
    const map = {};
    courses.forEach((course, i) => {
      map[course.title] = colors[i % colors.length];
    });
    return map;
};
  
export const renderCourseLegend = (courses, courseColors) => () => (
    <ul className="flex flex-wrap justify-center items-center space-x-4 text-sm mt-4 overflow-x-auto max-w-full">
      {courses.map((course, i) => (
        <li key={course.title} className="flex items-center mb-1">
          <span
            className="inline-block w-3 h-3 mr-2"
            style={{ backgroundColor: courseColors[course.title] }}
          ></span>
          {course.title}
        </li>
      ))}
    </ul>
  );
  
  