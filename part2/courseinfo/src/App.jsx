const Course = ({ course }) => {
  const sum = (part) => part.reduce((s, p) => s + p.exercises, 0);
  return (
    <>
      <h1>Web development curriculum</h1>
      {course.map((c) => (
        <>
          <Header key={c.id} course={c} />
          {c.parts.map((p) => (
            <Content key={p.id} part={p} />
          ))}
          <Total sum={sum(c.parts)} />
        </>
      ))}
    </>
  );
};

const Header = ({ course }) => (
  <>
    <h2>{course.name}</h2>
  </>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ part }) => (
  <>
    <Part key={part.id} part={part} />
  </>
);

const Total = ({ sum }) => <h3>total of {sum} exercises </h3>;

const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course course={course} />;
};

export default App;
