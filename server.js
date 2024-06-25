import 'path'
import 'dotenv/config'
import { fastify } from 'fastify'
import { google } from 'googleapis';
import fastifyCors from 'fastify-cors';
import fastifyFormBody from 'fastify-formbody';


const app = fastify({ logger: true });

app.register(fastifyFormBody);
app.register(fastifyCors, {

  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Access-Control-Allow-Origin', '*',
    'Access-Control-Allow-Methods', '*',
    'Access-Control-Allow-Headers', '*'
  ],
});


const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY,
  process.env.SCOPES
);

const calendar = google.calendar({
  version: 'v3',
  project: process.env.GOOGLE_PROJECT_NUMBER,
  auth: jwtClient
});

app.get('/events', (req, res) => {

  calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    // timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (error, result) => {
    if (error) {
      res.send(JSON.stringify({ error: error }));
    } else {
      if (result.data.items.length) {
        res.send(JSON.stringify({ events: result.data.items }));
      } else {
        res.send(JSON.stringify({ message: 'No upcoming events found.' }));
      }
    }
  });
});

app.post("/createEvent", (req, res) => {
  const eventData = req.body;
  const event = {
    summary: eventData.summary,
    location: eventData.location || '',
    description: eventData.description || '',
    start: {
      dateTime: eventData.startDateTime,
      timeZone: 'America/Sao_Paulo',
    },
    end: {
      dateTime: eventData.endDateTime,
      timeZone: 'America/Sao_Paulo',
    },
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve('credential.js'),
    scopes: 'https://www.googleapis.com/auth/calendar',
  });
  auth.getClient().then(a => {
    calendar.events.insert({
      auth: a,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
    }, function (err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', event.data);
      res.send("Event successfully created!");
    });
  })
})

const start = async () => {
  try {
    await app.listen({
      port: 3333
    });
    console.log("stening at. http://localhost:3333");
  } catch (error) {
    console.error(error)
  }
};

start();
