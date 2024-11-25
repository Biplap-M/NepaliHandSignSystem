const request = require('supertest');
const app = require('../../server/server');  

describe('---------Video APi Tests----------', () => {

  
  it('should return a list of video files', async () => {
    const response = await request(app)
      .get('/api/videos')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);  
  });

const request = require('supertest');
const app = require('../../server/server');  

describe('\n ---------Authentication API Tests------------', () => {

  it('should login successfully with correct credentials', async () => {
    const loginPayload = { email: '2@2', password: '2' }; 

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginPayload)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.message).toBe('Login successful');
    expect(response.body).toHaveProperty('userId');
  });

  it('should return an error when login fails due to incorrect credentials', async () => {
    const loginPayload = { email: 'nonexistent@example.com', password: 'wrongpassword' };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginPayload)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body.error).toBe('Invalid email or password');
  });


 
  it('should return an error if required fields are missing', async () => {
    const incompletePayload = {
      name: 'Jane Doe',  
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(incompletePayload)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body.error).toBe('All fields are required');
  });

  it('should return an error if the email already exists', async () => {
    const existingEmailPayload = {
      name: 'Jane Doe',
      gender: 'Female',
      email: 'john.doe@example.com',  
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(existingEmailPayload)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body.error).toBe('Email already exists');
  });

});




describe('\n --------Profile API Tests -----', () => {

  let cookie;  // To hold the cookie for authentication



  // Test for PUT /profile route (when user is not authenticated)
  it('should return an error when user is not authenticated during update', async () => {
    const updatedProfile = { email: 'newemail@example.com', password: 'newpassword123' };

    const response = await request(app)
      .put('/api/profile')
      .send(updatedProfile)
      .expect(400)
      .expect('Content-Type', /json/);

    // Check if the error is returned for authentication failure
    expect(response.body.message).toBe('User not authenticated');
  });

});


const db = require('../../server/config/db'); // The file where you create the DB connection

describe('\n ----------Database Connection Test-------------', () => {

  // Test for successful database connection
  it('should connect to the MySQL database successfully', (done) => {
    db.connect((err) => {
     
      if (err) {
        console.error('Database connection failed:', err);
        done(err); 
      } else {
        console.log('Database connected successfully');
        done(); 
      }
    });
  });

  // test a simple query to make sure the database is functioning
  it('should execute a simple query', (done) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
      if (err) {
        done(err); 
      } else {
        expect(results[0].result).toBe(2); 
        done(); 
      }
    });
  });

});


});// finctionn end
