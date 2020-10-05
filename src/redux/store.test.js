import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as courseActions from './actions/courseActions';

it('Should handle creating courses', function () {
    // arrange
    const store = createStore(rootReducer, initialState);
    const course = { title: 'Clean Code' };

    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert
    const createdCourse = store.getState().courses[0];
    expect(createdCourse).toEqual(course);
});

it('Should handle 2 create courses and 1 update', function () {
    // arrange
    const store = createStore(rootReducer, initialState);
    const course1 = { id: 1, title: 'Clean Code' };
    const course2 = { id: 2, title: 'Dirty Code' };
    const courseToUpdate = { id: 2, title: 'Fixed Code' };

    // act
    const action1 = courseActions.createCourseSuccess(course1);
    const action2 = courseActions.createCourseSuccess(course2);
    const action3 = courseActions.updateCourseSuccess(courseToUpdate);
    store.dispatch(action1);
    store.dispatch(action2);
    store.dispatch(action3);

    // assert
    const createdCourse1 = store.getState().courses.find((c) => c.id == 1);
    const createdCourse2 = store.getState().courses.find((c) => c.id == 2);
    expect(store.getState().courses.length).toEqual(2);
    expect(createdCourse1).toEqual(course1);
    expect(createdCourse2).not.toEqual(course2);
    expect(createdCourse2).toEqual(courseToUpdate);
});
