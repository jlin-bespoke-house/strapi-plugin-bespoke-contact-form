'use strict';

const contactEmailTemplate = {
    subject: "Bespoke Contact Notification System",
    text: `<h1>New Contact from <%= firstName %> <%= lastName %></h1>
    <p>First Name: <%= firstName %><p>
    <p>Last Name: <%= lastName %><p>
    <p>Email: <%= emailAddress %><p>
    <p>Phone: <%= cellPhone %><p>
    <p>City: <%= city %><p>
    <p>Group Name: <%= groupName %><p>
    <p>Dates Desired: <%= dateDesired %><p>
    <p>Number of Rooms: <%= numberOfRooms %><p>
    <p>Questions: <%= questions %><p>`,
    html: `<h1>New Contact from <%= firstName %> <%= lastName %></h1>
    <p>First Name: <%= firstName %><p>
    <p>Last Name: <%= lastName %><p>
    <p>Email: <%= emailAddress %><p>
    <p>Phone: <%= cellPhone %><p>
    <p>City: <%= city %><p>
    <p>Group Name: <%= groupName %><p>
    <p>Dates Desired: <%= dateDesired %><p>
    <p>Number of Rooms: <%= numberOfRooms %><p>
    <p>Questions: <%= questions %><p>
    `,
};

module.exports = {
    contactEmailTemplate
}