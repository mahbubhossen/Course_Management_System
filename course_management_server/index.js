const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qoghsen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// DB collections
let courseCollection;
let enrollmentCollection;

async function run() {
  try {
    // await client.connect();

    const db = client.db("courseManagement");
    courseCollection = db.collection("course");
    enrollmentCollection = db.collection("enrollments");

    console.log("Connected to MongoDB");

    // await db.command({ ping: 1 });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}
run();

// Root test route
app.get("/", (req, res) => {
  res.send("Course management API is running!");
});

// Add a new course
app.post("/courses", async (req, res) => {
  try {
    const courseData = req.body;

    if (typeof courseData.seats !== "number" || courseData.seats < 1) {
      return res.status(400).json({ error: "Seats must be a positive number" });
    }

    const result = await courseCollection.insertOne(courseData);
    res.status(201).json({
      message: "Course added successfully!",
      insertedId: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add course", details: err });
  }
});

// GET all courses
app.get("/all-courses", async (req, res) => {
  try {
    const courses = await courseCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses", details: err });
  }
});

// Fetch latest courses
app.get("/courses", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const courses = await courseCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses", details: err });
  }
});

// Get course by ID
app.get("/courses/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await courseCollection.findOne({
      _id: new ObjectId(courseId),
    });

    if (!course) return res.status(404).json({ error: "Course not found" });

    const enrollmentsCount = await enrollmentCollection.countDocuments({
      courseId,
    });

    const seatsLeft = course.seats - enrollmentsCount;

    res.json({
      ...course,
      seatsLeft: seatsLeft >= 0 ? seatsLeft : 0,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get course", details: err.message });
  }
});

// Enroll in a course
app.post("/enrollments", async (req, res) => {
  try {
    const { email, courseId } = req.body;
    if (!email || !courseId)
      return res.status(400).json({ error: "Email and courseId required" });

    const course = await courseCollection.findOne({
      _id: new ObjectId(courseId),
    });
    if (!course) return res.status(404).json({ error: "Course not found" });

    const userEnrollmentsCount = await enrollmentCollection.countDocuments({
      email,
    });
    if (userEnrollmentsCount >= 3) {
      return res
        .status(403)
        .json({ error: "User cannot enroll in more than 3 courses" });
    }

    const enrollmentsCount = await enrollmentCollection.countDocuments({
      courseId,
    });

    if (course.seats !== undefined && enrollmentsCount >= course.seats) {
      return res.status(409).json({ error: "No seats left" });
    }

    const alreadyEnrolled = await enrollmentCollection.findOne({
      email,
      courseId,
    });
    if (alreadyEnrolled) {
      return res.status(409).json({ error: "Already enrolled" });
    }

    const result = await enrollmentCollection.insertOne({
      email,
      courseId,
      enrolledAt: new Date(),
    });

    res.status(201).json({
      message: "Enrolled successfully",
      insertedId: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to enroll", details: err.message });
  }
});

// Check if user is enrolled in a course
app.get("/enrollments", async (req, res) => {
  try {
    const { email, courseId } = req.query;

    if (!email || !courseId) {
      return res.status(400).json({ error: "Missing email or courseId" });
    }

    const existing = await enrollmentCollection.findOne({ email, courseId });
    res.json({ enrolled: !!existing });
  } catch (err) {
    res.status(500).json({ error: "Check failed", details: err });
  }
});

//Enrollment count
app.get("/enrollments/count/:courseId", async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    const count = await enrollmentCollection.countDocuments({ courseId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch enrollment count",
      details: err.message,
    });
  }
});

// popular courses
app.get("/popular-courses", async (req, res) => {
  try {
    const db = client.db("courseManagement");
    const enrollmentCollection = db.collection("enrollments");

    const pipeline = [
      {
        $addFields: {
          courseIdObj: { $toObjectId: "$courseId" },
        },
      },
      {
        $group: {
          _id: "$courseIdObj",
          enrollments: { $sum: 1 },
        },
      },
      {
        $sort: { enrollments: -1 },
      },
      {
        $limit: 6,
      },
      {
        $lookup: {
          from: "course",
          localField: "_id",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
      {
        $project: {
          _id: "$course._id",
          title: "$course.title",
          description: "$course.description",
          image: "$course.image",
          duration: "$course.duration",
          createdAt: "$course.createdAt",
          enrollments: 1,
        },
      },
    ];

    const result = await enrollmentCollection.aggregate(pipeline).toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch popular courses", details: err.message });
  }
});

// seats and enrollments count
app.get("/user-courses", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const db = client.db("courseManagement");
    const enrollmentsCol = db.collection("enrollments");

    const userCourses = await courseCollection
      .find({ createdByEmail: email })
      .toArray();

    const courseIds = userCourses.map((course) => course._id.toString());

    const enrollmentsCounts = await enrollmentsCol
      .aggregate([
        { $match: { courseId: { $in: courseIds } } },
        { $group: { _id: "$courseId", count: { $sum: 1 } } },
      ])
      .toArray();

    const enrollmentsMap = {};
    enrollmentsCounts.forEach((item) => {
      enrollmentsMap[item._id] = item.count;
    });

    const coursesWithEnrollments = userCourses.map((course) => ({
      ...course,
      enrollmentsCount: enrollmentsMap[course._id.toString()] || 0,
      seats: course.seats || 0,
    }));

    res.json(coursesWithEnrollments);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch user courses", details: err });
  }
});

// delete a course
app.delete("/courses/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await courseCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete course", details: err });
  }
});

// UPDATE course
app.put("/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  const updatedData = req.body;

  try {
    const result = await courseCollection.updateOne(
      { _id: new ObjectId(courseId) },
      { $set: updatedData }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "No course was updated" });
    }

    res.json({ message: "Course updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update course", details: err });
  }
});

// for editing
app.get("/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await courseCollection.findOne({
      _id: new ObjectId(courseId),
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course", details: err });
  }
});

// Get all enrollments
app.get("/my-enrollments", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const enrollments = await enrollmentCollection.find({ email }).toArray();

    const courseIds = enrollments.map(
      (enroll) => new ObjectId(enroll.courseId)
    );

    const courses = await courseCollection
      .find({ _id: { $in: courseIds } })
      .toArray();

    const enrichedCourses = courses.map((course) => {
      const match = enrollments.find(
        (e) => e.courseId === course._id.toString()
      );
      return {
        ...course,
        enrollmentId: match?._id,
        enrolledAt: match?.enrolledAt,
      };
    });

    res.json(enrichedCourses);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch enrollments", details: err });
  }
});

// Remove an enrollment
app.delete("/enrollments/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await enrollmentCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    res.json({ message: "Enrollment removed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to remove enrollment", details: err.message });
  }
});

// top instructors
app.get("/top-instructors", async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$createdByEmail",
          name: { $first: "$createdByName" },
          totalCourses: { $sum: 1 },
        },
      },
      {
        $sort: { totalCourses: -1 },
      },
      {
        $limit: 5,
      },
    ];

    const topInstructors = await courseCollection.aggregate(pipeline).toArray();
    res.json(topInstructors);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch top instructors", details: err });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
