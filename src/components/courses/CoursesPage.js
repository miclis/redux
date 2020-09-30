import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';

function CoursesPage(props) {
    const [course, setCourse] = useState({ title: '' });

    const handleChange = (event) => {
        setCourse({ ...course, title: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.dispatch(courseActions.createCourse(course));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Courses</h2>
            <h3>Add Course</h3>
            <input type="text" onChange={handleChange} value={course.title} />
            <input type="submit" value="Save" />
            {props.courses.map((course) => (
                <div key={course.title}>{course.title}</div>
            ))}
        </form>
    );
}

CoursesPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return { courses: state.courses };
}

export default connect(mapStateToProps)(CoursesPage);
