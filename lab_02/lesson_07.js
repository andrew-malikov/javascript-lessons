function getLessonGroupsComponent() {
    let lessons = new Array("Algebra", "Geometry", "Physics",
        "Chemistry", "History", "Literature");

    let lessonGroups = document.createElement("div");

    lessonGroups.appendChild(getLessonListComponent(lessons.slice(0, 4), "Exact Science"));
    lessonGroups.appendChild(getLessonListComponent(lessons.slice(4, 6), "Humanities"));

    return lessonGroups;
}

function getLessonListComponent(lessons, lessonsHeader) {
    let component = document.createElement("div");

    let header = document.createElement("h1");
    header.innerText = lessonsHeader;

    let lessonList = document.createElement("ul");
    lessons.forEach(lesson => {
        lessonList.appendChild(getLessonComponent(lesson));
    });

    component.appendChild(header);
    component.appendChild(lessonList);

    return component;
}

function getLessonComponent(lesson) {
    let lessonComponent = document.createElement("li");
    lessonComponent.innerText = lesson;
    return lessonComponent
}

document.body.appendChild(getLessonGroupsComponent());