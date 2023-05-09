import express from "express";
const app = express();
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// CREATE ROLE API REQUESTS
// POST request to create a new role
app.post("/api/roles", async (req, res) => {
  const { roleType, roleCode } = req.body;
  const role = await prisma.role.create({
    data: {
      roleType,
      roleCode,
    },
  });
  res.json(role);
});

// GET request to fetch all roles
app.get("/api/roles", async (req, res) => {
  const roles = await prisma.role.findMany();
  res.json(roles);
});

// CREATE YEAR API REQUESTS
// POST request to create a new years
app.post("/api/yeargroups", async (req, res) => {
  const { yearGroup } = req.body;
  const year = await prisma.year.create({
    data: {
      yearGroup,
    },
  });
  res.json(year);
});

// GET request to fetch all years
app.get("/api/yeargroups", async (req, res) => {
  const year = await prisma.year.findMany();
  res.json(year);
});

// CREATE CLASSES API REQUESTS
// POST request to create a new class
app.post("/api/classes", async (req, res) => {
  const { className } = req.body;
  const createClass = await prisma.class.create({
    data: {
      className,
    },
  });
  res.json(createClass);
});

// GET request to fetch all class
app.get("/api/classes", async (req, res) => {
  const className = await prisma.class.findMany();
  res.json(className);
});

// CREATE SESSIONS API REQUESTS
// POST request to create a new SESSION
app.post("/api/sessions", async (req, res) => {
  const { sessionType, sessionLength } = req.body;
  const session = await prisma.session.create({
    data: {
      sessionType,
      sessionLength,
    },
  });
  res.json(session);
});

// GET request to fetch all SESSION
app.get("/api/sessions", async (req, res) => {
  const session = await prisma.session.findMany();
  res.json(session);
});

// CREATE TEACHER API REQUESTS
// POST request to create a new TEACHER
app.post("/api/teachers", async (req, res) => {
  const {
    firstName,
    lastName,
    FTE,
    mandatedTime,
    roleId,
    yearId,
    classroomId,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
  } = req.body;
  const teacher = await prisma.teacher.create({
    data: {
      firstName,
      lastName,
      FTE,
      mandatedTime,
      roleId,
      yearId,
      classroomId,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
    },
  });
  res.json(teacher);
});

// GET request to fetch all TEACHERS

app.get("/api/teachers", async (req, res) => {
  const teachers = await prisma.teacher.findMany({
    include: {
      role: true,
      year: true,
      class: true,
    },
  });
  res.json(teachers);
});

// PUT request to update Teachers

app.put("/api/teachers/:id", async (req, res) => {
  const { id } = req.params;
  const { additionalTime } = req.body;
  try {
    const teacher = await prisma.teacher.update({
      where: { id },
      data: {
        additionalTime,
      },
    });
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating teacher");
  }
});

// PUT request to update Sessions via Allocation.tsx
// /api/teachers/${teacherId}/sessions/${sessionId}

app.put("/api/teachers/:id/sessions/:sessionId", async (req, res) => {
  const { id, sessionId } = req.params;
  const { numSessions } = req.body;
  console.log(id, sessionId);
  try {
    const teacherSessions = await prisma.TeacherSessions.create({
      where: { id, sessionId },
      data: {
        numSessions,
      },
    });
    res.json(teacherSessions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating teacher");
  }
});

app.post("/api/teachers/:teacherId/sessions/:sessionId", async (req, res) => {
  const { teacherId, sessionId } = req.params;
  const { updatedData, columnData } = req.body;
  console.log(updatedData, columnData);
  try {
    const numSessions = parseInt(updatedData[columnData.field], 10);
    console.log("numSessions:", numSessions);

    const teacherSession = await prisma.teacherSession.upsert({
      where: {
        teacherId_sessionId: {
          teacherId: teacherId,
          sessionId: sessionId,
        },
      },
      update: {
        numSessions: numSessions,
      },
      create: {
        teacher: {
          connect: { id: teacherId },
        },
        session: {
          connect: { id: sessionId },
        },
        numSessions: numSessions,
      },
    });

    res.json(teacherSession);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating teacher");
  }
});

// app.get("/api/teachers/:teacherId/sessions/:sessionId", async (req, res) => {
//   const { teacherId, sessionId } = req.params;
//   try {
//     const teacherSession = await prisma.teacherSession.findUnique({
//       where: {
//         id: `${teacherId}_${sessionId}`,
//       },
//     });

//     res.json(teacherSession);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error retrieving teacher session");
//   }
// });

app.get("/api/teachers/sessions", async (req, res) => {
  try {
    const teacherSessions = await prisma.teacherSession.findMany();
    res.json(teacherSessions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving teacher sessions");
  }
});

// OTHER
app.get("/", (req, res) => {
  res.send("hello world");
});

const port = 8000;
app.listen(port, () => {
  console.log("server is listening on port 8000");
});
