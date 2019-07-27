const supertest = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");
const Appointment = require("../models/Appointment");

let mongoServer;

/**
 * describe are test suite
 *
 * this suite will be first so we have something to delete and return
 */
describe("POST /api/new", () => {
  /**
   * run before all tests
   */
  beforeAll(async done => {
    /**
     * Will spin up a new mongo server
     */
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();

    /**
     * Connect to fake server
     */
    await mongoose.connect(mongoUri, { useNewUrlParser: true });

    /**
     * Inform Jest that before step is done
     */
    done();
  });

  /**
   * Run after all tests are done
   */
  afterAll(async done => {
    /**
     * Disconnect Mongoose from server
     */
    await mongoose.disconnect();
    /**
     * Stop the dev server
     */
    await mongoServer.stop();
    done();
  });

  test("saves a new appointment", async () => {
    const appointments = [
      {
        Neurologist: "My First Appointment",
        Remarks: "test one",
        Date: new Date(Date.now()),
        Hour: 5,
        Type: "First Visit"
      },
      {
        Neurologist: "My Second Appointment",
        Remarks: "test two",
        Date: new Date(Date.now()),
        Hour: 5,
        Type: "Follow Up"
      },
      {
        Neurologist: "My Third Appointment",
        Remarks: "test three",
        Date: new Date(Date.now()),
        Hour: 5,
        Type: "MRI"
      },
      {
        Neurologist: "My Forth Appointment",
        Remarks: "test four",
        Date: new Date(Date.now()),
        Hour: 5,
        Type: "EEG"
      }
    ];

    const results = await Promise.all(
      appointments.map(async appointment => {
        const response = await supertest(app)
          .post("/appointments/add")
          .send(appointment);

        // rather then get a response object we will check the db directly.
        const saved = await Appointment.findOne(appointment);

        // the status for a create event should be 201
        expect(response.status).toBe(201);

        // when we get the appointment back it should contain the same things.
        expect(saved).toEqual(expect.objectContaining(appointment));

        // return the saved items for next expect statement
        return saved;
      })
    );

    expect(results).toEqual(
      expect.arrayContaining(
        /**
         * using map here to state that the array will contain objects that
         * contain the appointment properties, but results will also have things
         * like id which we don't know.
         */
        appointments.map(appointment => expect.objectContaining(appointment))
      )
    );
  });

  test("will not save if missing properties", async () => {
    const appointment = {
      Neurologist: "My Second Appointment",
      Remarks: "test one"
    };

    const response = await supertest(app)
      .post("/appointments/add")
      .send(appointment);

    const saved = await Appointment.findOne(appointment);

    // should be a 500 status code.
    expect(response.status).toBe(500);
    // saved should not equal the appointment we tried to save
    expect(saved).not.toEqual(expect.objectContaining(appointment));
    // saved should be null if nothing is saved
    expect(saved).toEqual(null);
  });
});
