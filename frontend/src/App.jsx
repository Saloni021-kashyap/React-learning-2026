
import { useEffect, useState } from "react";

function App() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/students"
                );

                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }

        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Student List</h1>

            {students.map((student) => (
                <p key={student.id}>
                    {student.name} - {student.course}
                </p>
            ))}
        </div>
    );
}

export default App;
