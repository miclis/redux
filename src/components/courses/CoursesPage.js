import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';

function CoursesPage(props) {
    const { courses, authors, actions } = props;

    const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

    useEffect(() => {
        if (courses.length === 0) {
            actions.loadCourses().catch((error) => {
                alert('Loading courses failed ' + error);
            });
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch((error) => {
                alert('Loading authors failed ' + error);
            });
        }
    }, []);

    return (
        <>
            {redirectToAddCoursePage && <Redirect to="/course" />}
            <h2>Courses</h2>
            <button
                style={{ marginBottom: 20 }}
                className="btn btn-primary add-course"
                onClick={() => setRedirectToAddCoursePage(true)}>Add Course</button>
            <CourseList courses={props.courses} />
        </>
    );
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        courses:
            state.authors.length === 0
                ? []
                : state.courses.map((course) => {
                      return {
                          ...course,
                          authorName: state.authors.find((a) => a.id === course.authorId).name,
                      };
                  }),
        authors: state.authors,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
